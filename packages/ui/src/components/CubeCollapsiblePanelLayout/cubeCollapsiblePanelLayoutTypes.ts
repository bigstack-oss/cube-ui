import type { MouseEventHandler, ReactElement } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeGeneralPanelProps } from '../CubeGeneralPanel/cubeGeneralPanelTypes'

export type CubeCollapsiblePanelLayoutLeftPanelProps = Pick<
  CubeGeneralPanelProps,
  'children' | 'topic' | 'leftSlot' | 'rightSlot'
> & {
  customToggleButton?: ReactElement<{ onClick?: MouseEventHandler }>
}

export type CubeCollapsiblePanelLayoutRightPanelProps = PropsWithClassName &
  Pick<CubeGeneralPanelProps, 'children' | 'topic' | 'leftSlot' | 'rightSlot'>

export type CubeCollapsiblePanelLayoutProps = {
  /**
   * Whether the right panel is open by default
   * @default true
   */
  defaultPanelOpen?: boolean
  /**
   * If provided, this prop controls whether the right panel is open.
   * The component becomes controlled and will always reflect the value of `isRightPanelOpen`.
   *
   * Use `onRightPanelOpenChange` to respond to user interactions
   * and update the state in the parent.
   *
   * If omitted, the component manages its own open/close state internally
   * starting from `defaultRightPanelOpen`.
   */
  isControlledPanelOpen?: boolean
  /**
   * Useful only when `isRightPanelOpen` is controlled.
   */
  onControlledPanelOpenChange?: (open: boolean) => void
  /**
   * Width of the right panel as a percentage of the container (0-100)
   * @default 50
   */
  rightPanelWidthPercentage?: number
  children: [
    ReactElement<CubeCollapsiblePanelLayoutLeftPanelProps>,
    ReactElement<CubeCollapsiblePanelLayoutRightPanelProps>,
  ]
}
