import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'
import { CubeDropdownTrigger } from './CubeDropdownTrigger'
import {
  CubeDropdownMenu,
  type CubeDropdownMenuProps,
} from './CubeDropdownMenu'
import {
  CubeDropdownItem,
  type CubeDropdownItemProps,
} from './CubeDropdownItem'

type NodePayload = {
  triggerNode: ReactNode
  menuNode: ReactNode
  enabledItemCount: number
}

export const parseNodes = (node: ReactNode): NodePayload => {
  const payload: NodePayload = {
    triggerNode: undefined,
    menuNode: undefined,
    enabledItemCount: 0,
  }

  Children.toArray(node).forEach((child) => {
    if (!isValidElement(child)) {
      return
    }

    if (child.type === CubeDropdownTrigger) {
      assignTriggerNode(payload, child)
    } else if (child.type === CubeDropdownMenu) {
      assignMenuNode(payload, child as ReactElement<CubeDropdownMenuProps>)
    }
  })

  return payload
}

const assignTriggerNode = (payload: NodePayload, value: ReactElement): void => {
  if (payload.triggerNode) {
    console.warn(
      'Found multiple trigger nodes. Only one trigger node is allowed in a CubeDropdown.',
    )
  } else {
    payload.triggerNode = value
  }
}

const assignMenuNode = (
  payload: NodePayload,
  value: ReactElement<CubeDropdownMenuProps>,
): void => {
  if (payload.menuNode) {
    console.warn(
      'Found multiple menu nodes. Only one menu node is allowed in a CubeDropdown.',
    )
  } else {
    payload.menuNode = value
    payload.enabledItemCount = computeEnabledItemCount(
      Children.toArray(value.props.children),
    )
  }
}

const computeEnabledItemCount = (menuChildren: ReactNode[]): number => {
  const enabledItems = menuChildren.filter((child) => {
    if (!isValidElement(child) || child.type !== CubeDropdownItem) {
      console.warn(
        'The children of CubeDropdown.Menu can only be CubeDropdown.Item, but found: ',
        child,
      )
      return false
    }
    const itemProps = child.props as CubeDropdownItemProps<unknown>
    return !itemProps.disabled
  })

  return enabledItems.length
}
