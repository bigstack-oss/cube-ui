import type { MouseEvent, ReactElement, ReactNode, Ref } from 'react'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'
import type { CubeToggleProps } from '../CubeToggle/CubeToggle'

export const cubeOverflowMenuItemTypes = [
  'plain',
  'menu-icon',
  'check-mark',
  'toggle',
  'trailing-icon',
  'custom-leading-element',
] as const

export type CubeOverflowMenuItemType =
  (typeof cubeOverflowMenuItemTypes)[number]

export type CubeOverflowMenuTriggerProps = {
  ref?: Ref<HTMLElement>
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export type CubeOverflowMenuProps = {
  /**
   * The element that toggles the menu. It receives a `ref` and an `onClick`;
   * its own `ref` and `onClick` are still called.
   */
  triggerElement: ReactElement<CubeOverflowMenuTriggerProps>
  children: ReactNode
}

type ClickableItemProps = {
  /**
   * @default false
   */
  disabled?: boolean
  onClick?: () => void
}

export type PlainItem = {
  type: 'plain'
} & ClickableItemProps

export type ItemWithMenuIcon = {
  type: 'menu-icon'
  MenuIcon: SvgComponent
} & ClickableItemProps

export type ItemWithCheckMark = {
  type: 'check-mark'
  isChecked: boolean
} & ClickableItemProps

export type ItemWithToggle = {
  type: 'toggle'
} & Pick<CubeToggleProps, 'checked'> &
  Partial<Pick<CubeToggleProps, 'onCheckedChange'>> &
  ClickableItemProps

export type ItemWithTrailingIcon = {
  type: 'trailing-icon'
  TrailingIcon: SvgComponent
} & ClickableItemProps

export type ItemWithCustomLeadingElement = {
  type: 'custom-leading-element'
  element: ReactNode
} & ClickableItemProps

export type CubeOverflowMenuItemProps = {
  title: string
  /**
   * @default false
   */
  boldTitle?: boolean
  subText?: string
} & (
  | PlainItem
  | ItemWithMenuIcon
  | ItemWithCheckMark
  | ItemWithToggle
  | ItemWithTrailingIcon
  | ItemWithCustomLeadingElement
)

export type CubeOverflowMenuTitleProps = {
  children: string
}
