import { isValidElement, type ReactElement, type ReactNode } from 'react'
import type { CubeDropdownProps } from './cubeDropdownTypes'
import {
  CubeDropdownItem,
  type CubeDropdownItemProps,
} from './CubeDropdownItem'

export const getOptionalProps = <Item>(props: CubeDropdownProps<Item>) => {
  return {
    onAllCheckChange:
      props.type === 'checkbox' ? props.onAllCheckChange : undefined,
    onClearSelection:
      props.type === 'checkbox' && props.variant === 'withFilter'
        ? props.onClearSelection
        : undefined,
  }
}

export const checkIsCubeDropdownItemElement = (
  child: ReactNode,
): child is ReactElement<CubeDropdownItemProps<unknown>> =>
  isValidElement(child) && child.type === CubeDropdownItem
