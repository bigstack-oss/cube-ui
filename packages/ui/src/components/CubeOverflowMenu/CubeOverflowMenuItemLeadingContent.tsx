import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeCheckmarkBold } from '@icons'
import type {
  CubeOverflowMenuItemProps,
  CubeOverflowMenuItemType,
  ItemWithCheckMark,
  ItemWithCustomLeadingElement,
  ItemWithMenuIcon,
} from './cubeOverflowMenuTypes'
import { renderNothing } from './cubeOverflowMenuUtils'

export const CubeOverflowMenuItemLeadingContent = (
  props: CubeOverflowMenuItemProps,
) => {
  const { type } = props

  const renderMenuIcon = () => {
    const { MenuIcon } = props as ItemWithMenuIcon
    return (
      <div className="mx-[3px] flex size-8 shrink-0 items-center justify-center rounded-[5px] bg-primary-100 p-1 group-[.group]:bg-primary-50">
        <MenuIcon className="icon-xl text-functional-text group-[.group]:text-functional-disable-text" />
      </div>
    )
  }

  const renderCheckmark = () => {
    const { isChecked } = props as ItemWithCheckMark
    return (
      <div className="shrink-0 px-2.5">
        <MonochromeCheckmarkBold
          className={twMerge(
            'icon-md text-functional-text group-[.group]:text-functional-disable-text',
            !isChecked && 'invisible',
          )}
        />
      </div>
    )
  }

  const renderCustomLeadingElement = () => {
    const { element } = props as ItemWithCustomLeadingElement
    return <div className="shrink-0 px-2.5">{element}</div>
  }

  const renderFnMap: Record<CubeOverflowMenuItemType, () => ReactNode> = {
    plain: renderNothing,
    'menu-icon': renderMenuIcon,
    'check-mark': renderCheckmark,
    toggle: renderNothing,
    'trailing-icon': renderNothing,
    'custom-leading-element': renderCustomLeadingElement,
  }

  return !!type && renderFnMap[type]()
}
