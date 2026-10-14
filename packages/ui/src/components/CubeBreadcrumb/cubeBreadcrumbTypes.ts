import type {
  ComponentType,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
} from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeBreadcrumbItem } from './CubeBreadcrumbItem'

export type CubeBreadcrumbProps = PropsWithClassName & {
  isLoading?: boolean
  children:
    | ReactElement<typeof CubeBreadcrumbItem>[]
    | ReactElement<typeof CubeBreadcrumbItem>
}

export type CubeBreadcrumbItemProps<
  ContainerProps extends PropsWithChildren = PropsWithChildren,
> = {
  label: string
  href?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  /**
   * Wraps the item's link in a custom component, e.g. a router link.
   */
  itemContainer?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
}
