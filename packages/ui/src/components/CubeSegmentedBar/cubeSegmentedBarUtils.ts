import type { FillColorClass } from '@theme/tokens/cubeTheme'
import type { CubeTooltipInformation } from '../CubeTooltip/cubeTooltipTypes'

export type RectDimensions = {
  width: number
  left: number
}

export type Segment = {
  color: FillColorClass
  colCount: number
  hoverContent?: CubeTooltipInformation
}

export type RoundedSide = 'none' | 'left' | 'right' | 'both'

export const rectHeight = 9

export type ChildrenDimensions = {
  height: number
  /**
   * @default 0
   */
  marginTop?: number
}

export const computeSvgHeight = (
  baseHeight: number,
  paddingTop: number,
  childrenDimensions: ChildrenDimensions | undefined,
): number => {
  if (!childrenDimensions) {
    return baseHeight + paddingTop
  }
  const { height: childrenHeight, marginTop: childrenMarginTop = 0 } =
    childrenDimensions
  return baseHeight + paddingTop + childrenHeight + childrenMarginTop
}

export const computeChildrenTransform = (
  parentHeight: number,
  childrenMarginTop?: number,
): string => {
  const y = parentHeight + (childrenMarginTop ?? 0)
  return `translate(0, ${y})`
}
