import type {
  ComponentType,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
} from 'react'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import type { CubeHyperlinkProps } from '../CubeHyperlink/cubeHyperlinkTypes'

export type CubeBackButtonBackLinkProps<
  ContainerProps extends PropsWithChildren,
> = {
  /**
   * Where the back button goes. Renders an `<a>` around the button.
   */
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  /**
   * Renders the back button inside a custom component (e.g. a router link)
   * instead of the default `<a>`.
   */
  backButtonContainer?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
}

export type CubeBackButtonProps<
  ContainerProps extends PropsWithChildren = PropsWithChildren,
> = {
  /**
   * Title.
   */
  children: string
  /**
   * Shows skeletons for the back button, title and members.
   * @default false
   */
  isLoading?: boolean
  /**
   * Content on the right of the title, such as `.Details`, `.Divider` and `.Link`.
   */
  titleRightContent?: ReactNode
  /**
   * Content below the title, such as `.BarChart` and `.Divider`.
   */
  titleBottomContent?: ReactNode
} & CubeBackButtonBackLinkProps<ContainerProps> &
  CubeTestIdProps

export type CubeBackButtonBarChartProps = {
  label: string
  /**
   * Usage in percent (0-100).
   */
  progress: number
}

export type CubeBackButtonDetailsProps = {
  children: string
}

export type CubeBackButtonLinkProps = Pick<
  CubeHyperlinkProps,
  'children' | 'href' | 'target' | 'onClick'
>

export type CubeBackButtonTitleProps = {
  children: string
}
