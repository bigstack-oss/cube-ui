import {
  cloneElement,
  Fragment,
  type MouseEvent,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { assignRefValue } from '../CubeTextarea/cubeTextareaUtils'
import { InfoBox } from './InfoBox'
import type {
  CubeTooltipInformation,
  CubeTooltipProps,
  CubeTooltipVisibilityState,
} from './cubeTooltipTypes'

export const CubeTooltip = (props: CubeTooltipProps) => {
  const {
    placement = 'top-center',
    hoverContent,
    clickContent,
    children: anchorElement,
  } = props

  const [visibilityState, setVisibilityState] =
    useState<CubeTooltipVisibilityState>(undefined)

  const [mouseX, setMouseX] = useState(0)

  const anchorRef = useRef<HTMLElement | null>(null)

  const infoMap: Record<
    NonNullable<CubeTooltipVisibilityState>,
    CubeTooltipInformation | undefined
  > = {
    hover: hoverContent,
    click: clickContent,
  }

  const onMouseEnter = (e: MouseEvent<HTMLElement>) => {
    if (hoverContent) {
      setVisibilityState('hover')
    }
    anchorElement.props.onMouseEnter?.(e)
  }

  const onMouseMove = (e: MouseEvent<HTMLElement>): void => {
    setMouseX(e.clientX)
    anchorElement.props.onMouseMove?.(e)
  }

  const onMouseLeave = (e: MouseEvent<HTMLElement>) => {
    setVisibilityState(undefined)
    anchorElement.props.onMouseLeave?.(e)
  }

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (clickContent) {
      setVisibilityState('click')
    }
    anchorElement.props.onClick?.(e)
  }

  if (anchorElement.type === Fragment) {
    throw new Error('Fragment children is not supported in CubeTooltip')
  }

  const clonedAnchor = cloneElement(anchorElement, {
    ref: (element: HTMLElement) => {
      const { ref: anchorRefProp } = anchorElement.props
      // Assign the element to the existing `ref` prop on `anchorElement`.
      assignRefValue(anchorRefProp, element)
      // Assign the element to the internal `ref` used in `CubeTooltip`.
      assignRefValue(anchorRef, element)
    },
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onClick,
  })

  return (
    <>
      {clonedAnchor}
      {visibilityState !== undefined &&
        infoMap[visibilityState] &&
        createPortal(
          <InfoBox
            // Assign a key to remount the InfoBox to prevent layout shifts
            // when switching from hover content to click content.
            key={visibilityState}
            information={infoMap[visibilityState]}
            placement={placement}
            mouseX={mouseX}
            anchorRef={anchorRef}
          />,
          document.body,
        )}
    </>
  )
}
