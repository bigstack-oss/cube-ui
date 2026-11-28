import type { PropsWithChildren, ReactElement } from 'react'
import type {
  CubeTestIdProps,
  CubeTestKeyProps,
} from '@shared-types/test-id-types'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'
import type { CubeNaggingProps } from '../CubeNagging/cubeNaggingTypes'

export type CubeSideBarComboboxOptionProps = {
  label: string
  Icon: SvgComponent
  /**
   * @default false
   */
  isSelected?: boolean
  /**
   * Shown as a badge when not 0; above 99 it shows "N".
   * @default 0
   */
  notificationCount?: number
  onClick: () => void
} & CubeTestKeyProps

export type CubeSideBarBottomLinkProps = {
  text: string
  /**
   * Opened in a new tab.
   */
  href: string
} & CubeTestKeyProps

export type CubeSideBarDataCenter = {
  name: string
  version: string
}

export type CubeSideBarProps = CubeTestIdProps & {
  /**
   * An element (for example a router link) the logo is placed in.
   */
  LogoContainer?: ReactElement<PropsWithChildren>
  /**
   * Shows skeletons for the user info and the data center time.
   * @default false
   */
  isLoading?: boolean
  dataCenter: CubeSideBarDataCenter | undefined
  username: string | undefined
  /**
   * Shows a `CubeNagging` (sidebar variant) below the user info.
   */
  naggingProps?: Omit<
    Extract<CubeNaggingProps, { variant: 'sidebar' }>,
    'variant'
  >
  options: CubeSideBarComboboxOptionProps[]
  /**
   * The data center's UTC offset, for example `"+08:00"`.
   */
  utcTimeZone: string | undefined
  links?: CubeSideBarBottomLinkProps[]
}
