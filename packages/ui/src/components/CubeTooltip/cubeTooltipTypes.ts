import type { FocusEvent, MouseEvent, ReactElement, Ref } from 'react'
import type { Placement } from '@internals/utils/floating/types'

export const cubeTooltipPlacements = [
  'top-left',
  'top-center',
  'top-right',
  'top-follow-cursor',
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'bottom-follow-cursor',
] as const satisfies readonly Placement[]

export type CubeTooltipPlacement = (typeof cubeTooltipPlacements)[number]

export type CubeTooltipInteractiveElementProps = {
  ref?: Ref<HTMLElement>
  onMouseEnter?: (e: MouseEvent<HTMLElement>) => void
  onMouseMove?: (e: MouseEvent<HTMLElement>) => void
  onMouseLeave?: (e: MouseEvent<HTMLElement>) => void
  onClick?: (e: MouseEvent<HTMLElement>) => void
  onFocus?: (e: FocusEvent<HTMLElement>) => void
  onBlur?: (e: FocusEvent<HTMLElement>) => void
  'aria-describedby'?: string
}

export type CubeTooltipInformation = {
  title?: string
  subtext?: string
  message: string
}

export type CubeTooltipVisibilityState = 'hover' | 'click' | undefined

export type CubeTooltipProps = {
  /**
   * @default 'top-center'
   */
  placement?: CubeTooltipPlacement
  hoverContent?: CubeTooltipInformation
  clickContent?: CubeTooltipInformation
  /**
   * The toggle (anchor) element. Hover content is also shown while it has
   * keyboard focus, so pass a focusable element (e.g. a `<button>`) to make
   * the tooltip reachable by keyboard.
   */
  children: ReactElement<CubeTooltipInteractiveElementProps>
}
