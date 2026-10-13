import {
  MonochromeHome01,
  MonochromePower,
  MonochromeWarningAltFilled,
} from '@icons'
import { CubeOverflowMenu } from '@components/CubeOverflowMenu/CubeOverflowMenu'
import type {
  CubeOverflowMenuItemProps,
  CubeOverflowMenuItemType,
} from '@components/CubeOverflowMenu/cubeOverflowMenuTypes'
import { SubHeading } from '@internals/components/SubHeading'
import { OverflowMenuFrame } from './OverflowMenuFrame'

const typeTitles: Record<CubeOverflowMenuItemType, string> = {
  plain: 'Plain',
  'menu-icon': 'Menu Icon',
  'check-mark': 'Check Mark',
  toggle: 'Toggle',
  'trailing-icon': 'Trailing Icon',
  'custom-leading-element': 'Custom Leading Element',
}

type ItemState = Pick<
  CubeOverflowMenuItemProps,
  'title' | 'subText' | 'boldTitle' | 'disabled'
>

const states: { title: string; props: ItemState }[] = [
  { title: 'Default', props: { title: 'Option Title' } },
  { title: 'w/Subtext', props: { title: 'Option Title', subText: 'Subtext' } },
  {
    title: 'Bold Title',
    props: { title: 'Option Title', subText: 'Subtext', boldTitle: true },
  },
  {
    title: 'Disabled',
    props: { title: 'Option Title', subText: 'Subtext', disabled: true },
  },
]

const noop = () => {}

const buildItemProps = (
  type: CubeOverflowMenuItemType,
  state: ItemState,
): CubeOverflowMenuItemProps => {
  const common = { ...state, onClick: noop }

  switch (type) {
    case 'menu-icon':
      return { ...common, type, MenuIcon: MonochromeHome01 }
    case 'check-mark':
      return { ...common, type, isChecked: true }
    case 'toggle':
      return { ...common, type, checked: true, onCheckedChange: noop }
    case 'trailing-icon':
      return { ...common, type, TrailingIcon: MonochromePower }
    case 'custom-leading-element':
      return {
        ...common,
        type,
        element: (
          <MonochromeWarningAltFilled className="icon-md text-status-warning" />
        ),
      }
    case 'plain':
    default:
      return { ...common, type: 'plain' }
  }
}

const rowClassName = 'grid grid-cols-5 items-center gap-x-12'

export type OverflowMenuItemRowProps = {
  type: CubeOverflowMenuItemType
}

/**
 * One Item Variants row: an item type in each state, each shown in a static
 * menu panel.
 */
export const OverflowMenuItemRow = (props: OverflowMenuItemRowProps) => {
  const { type } = props

  return (
    <div className={rowClassName}>
      <SubHeading className="col-span-1">{typeTitles[type]}</SubHeading>
      {states.map((state) => (
        <OverflowMenuFrame key={state.title}>
          <CubeOverflowMenu.Item {...buildItemProps(type, state.props)} />
        </OverflowMenuFrame>
      ))}
    </div>
  )
}

const OverflowMenuItemRowHeader = () => {
  return (
    <div className={rowClassName}>
      <span />
      {states.map((state) => (
        <SubHeading key={state.title}>{state.title}</SubHeading>
      ))}
    </div>
  )
}

OverflowMenuItemRow.Header = OverflowMenuItemRowHeader
