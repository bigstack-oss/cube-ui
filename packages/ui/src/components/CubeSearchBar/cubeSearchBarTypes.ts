import type { ComponentProps, ReactElement, ReactNode } from 'react'

export type CubeSearchBarFilterItemProps = {
  children: ReactNode
  onClick?: () => void
}

export type CubeSearchBarFilterProps = ComponentProps<'input'> & {
  /**
   * @default false
   */
  isLoading?: boolean
  onInputClear?: () => void
  /**
   * Menu items shown below the input while it has a value; use
   * `CubeSearchBarFilter.Item`.
   */
  children?:
    | ReactElement<CubeSearchBarFilterItemProps>
    | ReactElement<CubeSearchBarFilterItemProps>[]
}
