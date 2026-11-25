import {
  Children,
  isValidElement,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from 'react'

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
