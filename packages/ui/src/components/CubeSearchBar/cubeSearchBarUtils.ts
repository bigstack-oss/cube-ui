import {
  Children,
  isValidElement,
  type ComponentProps,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react'
import type {
  CubeSearchBarGlobalCategoryProps,
  CubeSearchBarGlobalProps,
} from './cubeSearchBarTypes'

/**
 * Whether `children` holds at least one element, and only elements of
 * `expectedType`.
 */
export const checkIsDropdownChildValid = <P>(
  children: ReactNode,
  expectedType: ComponentType<P>,
): children is ReactElement<P> | ReactElement<P>[] => {
  if (!children) return false

  const childArray = Children.toArray(children)

  if (childArray.length === 0) return false

  return childArray.every(
    (child) => isValidElement(child) && child.type === expectedType,
  )
}

/**
 * Leaves only the props that go to the `<input>`.
 */
export const omitNonInputProps = (
  props: CubeSearchBarGlobalProps,
): ComponentProps<'input'> => {
  const { variant, isLoading, children, onInputClear, ...restProps } = props

  if (variant === 'category') {
    const { categories, selectedCategory, onCategoryClick, ...inputProps } =
      restProps as Omit<CubeSearchBarGlobalProps, 'variant'> &
        CubeSearchBarGlobalCategoryProps
    return inputProps
  }

  return restProps
}
