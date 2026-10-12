import type { RefObject } from 'react'
import { splitPlacements } from '@internals/utils/floating/splitPlacements'
import type { Placement } from '@internals/utils/floating/types'
import { useFloating } from '@internals/utils/floating/useFloating'
import { Caret } from './Caret'
import { infoBoxContainer } from './cubeTooltipStyles'
import type { CubeTooltipInformation } from './cubeTooltipTypes'

export type InfoBoxProps = {
  id: string
  information: CubeTooltipInformation
  placement: Placement
  mouseX: number
  anchorRef: RefObject<HTMLElement | null>
}

export const InfoBox = (props: InfoBoxProps) => {
  const {
    id,
    information: { title, subtext, message },
    placement,
    mouseX,
    anchorRef,
  } = props

  const { elementRef, resolvedStyles } = useFloating({
    isOpen: true,
    anchorRef,
    placement,
    offsets: {
      x: 14,
      y: 2,
    },
    mouseX,
  })

  const {
    idealPlacement = placement,
    floatingStyle,
    translateX = 0,
  } = resolvedStyles ?? {}

  const [verticalPlacement] = splitPlacements(idealPlacement)

  const renderContent = () => {
    return (
      <div className="flex flex-col gap-y-0.5 rounded-[5px] bg-dark-700 px-3 pb-2.5 pt-2">
        <div className="flex items-center justify-between gap-x-6 text-primary-200">
          <div className="primary-body2 shrink-0 font-semibold">{title}</div>
          <div className="primary-body4 shrink-0">{subtext}</div>
        </div>
        <p className="primary-body3 text-grey-0">{message}</p>
      </div>
    )
  }

  return (
    <>
      {/* Attach `elementRef` to the invisible "shadow" element so we can
      measure its rect accurately without wrapping, which can happen near
      the right edge of the window. */}
      <div
        ref={elementRef}
        aria-hidden
        className={infoBoxContainer({
          verticalPlacement,
          isMeasuring: true,
        })}
      >
        {renderContent()}
      </div>
      {/* Element that's visible to users. It stays hidden like the shadow
      element until its position has been resolved. */}
      <div
        id={id}
        role="tooltip"
        className={infoBoxContainer({
          verticalPlacement,
          isMeasuring: !floatingStyle,
        })}
        style={floatingStyle}
      >
        {renderContent()}
        <Caret placement={idealPlacement} translateX={translateX} />
      </div>
    </>
  )
}
