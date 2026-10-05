import { type CSSProperties, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { splitPlacements } from '@internals/utils/floating/splitPlacements'
import type { Placement } from '@internals/utils/floating/types'
import { caret } from './cubeTooltipStyles'

export type CaretProps = {
  placement: Placement
  translateX: number
}

export const Caret = (props: CaretProps) => {
  const { placement, translateX: translateXProp } = props

  const [verticalPlacement, horizontalPlacement] = splitPlacements(placement)

  // Use inline styles instead of arbitrary Tailwind classes for multiple
  // transform properties, as they are easier to understand in this case.
  const style = useMemo<CSSProperties>(() => {
    // The caret points to the top side by default.
    // For top placement, the caret should point downward.
    const rotateAngle = verticalPlacement === 'top' ? 180 : 0

    let translateX = translateXProp

    if (
      verticalPlacement === 'bottom' &&
      horizontalPlacement === 'follow-cursor' &&
      translateXProp < 0
    ) {
      // Content is overflowing to the right of the boundary.
      translateX = translateXProp * -1
    }

    return {
      transform: `rotate(${rotateAngle}deg) translateX(${translateX}px)`,
    }
  }, [verticalPlacement, horizontalPlacement, translateXProp])

  return (
    <span
      className={twMerge(
        caret({
          horizontalPlacement,
        }),
      )}
      style={style}
    />
  )
}
