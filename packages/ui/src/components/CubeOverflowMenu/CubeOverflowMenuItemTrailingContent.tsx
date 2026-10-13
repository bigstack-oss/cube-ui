import type { ReactNode } from 'react'
import { CubeToggle } from '../CubeToggle/CubeToggle'
import type {
  CubeOverflowMenuItemProps,
  CubeOverflowMenuItemType,
  ItemWithToggle,
  ItemWithTrailingIcon,
} from './cubeOverflowMenuTypes'
import { renderNothing } from './cubeOverflowMenuUtils'

export const CubeOverflowMenuItemTrailingContent = (
  props: CubeOverflowMenuItemProps,
) => {
  const { type, title } = props

  const renderToggle = () => {
    const { disabled, checked, onCheckedChange } = props as ItemWithToggle
    return (
      <CubeToggle
        className="ml-8 shrink-0"
        checked={checked}
        disabled={disabled}
        // `CubeToggle` needs an accessible name; the item title is its label.
        aria-label={title}
        onCheckedChange={(next) => onCheckedChange?.(next)}
      />
    )
  }

  const renderTrailingIcon = () => {
    const { TrailingIcon } = props as ItemWithTrailingIcon
    return (
      <div className="shrink-0 px-2.5">
        <TrailingIcon className="icon-md text-functional-text group-[.group]:text-functional-disable-text" />
      </div>
    )
  }

  const renderFnMap: Record<CubeOverflowMenuItemType, () => ReactNode> = {
    plain: renderNothing,
    'menu-icon': renderNothing,
    'check-mark': renderNothing,
    toggle: renderToggle,
    'trailing-icon': renderTrailingIcon,
    'custom-leading-element': renderNothing,
  }

  return !!type && renderFnMap[type]()
}
