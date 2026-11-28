import type { ComponentProps, ReactElement, ReactNode } from 'react'
import type {
  CubeTestIdProps,
  CubeTestKeyProps,
} from '@shared-types/test-id-types'

export type CubeSearchBarFilterItemProps = {
  children: ReactNode
  onClick?: () => void
} & CubeTestKeyProps

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
} & CubeTestIdProps

export type CubeSearchBarGlobalItemType = 'suggestion' | 'recentSuggestion'

export type CubeSearchBarGlobalItemProps = {
  children: string
  onClick: () => void
} & (
  | {
      type: Extract<CubeSearchBarGlobalItemType, 'suggestion'>
    }
  | {
      type: Extract<CubeSearchBarGlobalItemType, 'recentSuggestion'>
      /**
       * Called when the item's clear (×) icon is clicked.
       */
      onSuggestionClear: () => void
    }
) &
  CubeTestKeyProps

export type CubeSearchBarGlobalVariant = 'regular' | 'category'

type BaseSearchBarGlobalProps = ComponentProps<'input'> & {
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * Suggestions shown below the input while it has a value; use
   * `CubeSearchBarGlobal.Item`.
   */
  children?:
    | ReactElement<CubeSearchBarGlobalItemProps>
    | ReactElement<CubeSearchBarGlobalItemProps>[]
  onInputClear: () => void
} & CubeTestIdProps

export type CubeSearchBarGlobalCategoryProps = {
  categories: string[]
  selectedCategory: string | undefined
  onCategoryClick: (category: string) => void
}

export type CubeSearchBarGlobalProps = BaseSearchBarGlobalProps &
  (
    | { variant: Extract<CubeSearchBarGlobalVariant, 'regular'> }
    | ({
        variant: Extract<CubeSearchBarGlobalVariant, 'category'>
      } & CubeSearchBarGlobalCategoryProps)
  )
