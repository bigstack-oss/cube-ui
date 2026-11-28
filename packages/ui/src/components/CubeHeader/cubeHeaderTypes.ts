import type { ComponentType, PropsWithChildren, ReactNode } from 'react'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'

export type CubeHeaderQuickAccess = {
  Icon: SvgComponent
  /**
   * Opened in a new tab.
   */
  href: string
  /**
   * Tooltip text, also the link's accessible name.
   */
  hoverMessage: string
}

export type CubeHeaderFunctionBarItem<
  ContainerProps extends PropsWithChildren = PropsWithChildren,
> = {
  Icon: SvgComponent
  /**
   * Tooltip text, also the button's accessible name. Required, since the
   * button is an icon with no text.
   */
  hoverMessage: string
  onClick?: () => void
  /**
   * Wraps the button in a custom component, for example a router link.
   */
  container?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
  /**
   * Rendered inside `container` after the button, for example a badge.
   */
  additionalElements?: ReactNode[]
}

export type CubeHeaderLanguageOption = {
  label: string
  value: string
  onClick: (value: string) => void
}

export type CubeHeaderProps = {
  /**
   * Shows skeletons for the quick accesses.
   * @default false
   */
  isLoading?: boolean
  quickAccesses: CubeHeaderQuickAccess[]
  functionBarItems: CubeHeaderFunctionBarItem[]
  /**
   * The `value` of the selected language option.
   */
  currentLanguage: string
  languageOptions: CubeHeaderLanguageOption[]
}
