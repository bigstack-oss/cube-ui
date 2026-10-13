import type { ComponentType, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import {
  Controls,
  Description,
  Primary,
  Subheading,
  Title,
} from '@storybook/addon-docs/blocks'
import {
  MonochromeHome01,
  MonochromePower,
  MonochromeWarningAltFilled,
} from '@icons'
import { SubHeading } from '@internals/components/SubHeading'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { formatUnionType } from '@internals/utils/formatType'
import { CubeOverflowMenu } from '@components/CubeOverflowMenu/CubeOverflowMenu'
import {
  cubeOverflowMenuItemTypes,
  type CubeOverflowMenuItemProps,
  type CubeOverflowMenuItemType,
  type CubeOverflowMenuProps,
} from '@components/CubeOverflowMenu/cubeOverflowMenuTypes'
import type { SvgComponent } from '@components/CubeIcon/cubeIconTypes'
import { ActionOverflowMenu } from './ActionOverflowMenu'
import { CheckMarkOverflowMenu } from './CheckMarkOverflowMenu'
import { MultipleOverflowMenu } from './MultipleOverflowMenu'
import { NotificationOverflowMenu } from './NotificationOverflowMenu'
import { OverflowMenuFrame } from './OverflowMenuFrame'
import { OverflowMenuItemRow } from './OverflowMenuItemRow'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'
import { SingleOverflowMenu } from './SingleOverflowMenu'

const rootArgs = ['triggerElement', 'children']
const itemArgs = [
  'type',
  'title',
  'boldTitle',
  'subText',
  'disabled',
  'onClick',
  'MenuIcon',
  'isChecked',
  'checked',
  'onCheckedChange',
  'TrailingIcon',
  'element',
]

const CubeOverflowMenuDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeOverflowMenu</Subheading>
      <Controls include={rootArgs} />
      <Subheading>CubeOverflowMenu.Item</Subheading>
      <Controls include={itemArgs} />
    </>
  )
}

// Args follow the compound hierarchy: `CubeOverflowMenu`'s props, then
// `CubeOverflowMenu.Item`'s. `CubeOverflowMenu.Title`'s only prop is
// `children`, a name the root already owns, and `CubeOverflowMenu.Divider`
// has no props, so neither has a group. Item props that only apply to some
// item types are listed with the type they belong to in their description.
type CubeOverflowMenuStoryArgs = {
  // CubeOverflowMenu
  triggerElement: CubeOverflowMenuProps['triggerElement']
  children: ReactNode
  // CubeOverflowMenu.Item
  type: CubeOverflowMenuItemType
  title: string
  boldTitle?: boolean
  subText?: string
  disabled?: boolean
  onClick?: () => void
  MenuIcon?: SvgComponent
  isChecked?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  TrailingIcon?: SvgComponent
  element?: ReactNode
}

const meta: Meta<CubeOverflowMenuStoryArgs> = {
  title: 'Organisms/Overflow Menu',
  component: CubeOverflowMenu as ComponentType<CubeOverflowMenuStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Overflow menus open a floating list of actions or options from a trigger element, grouped with titles and dividers.',
      },
      page: CubeOverflowMenuDocs,
    },
  },
  argTypes: {
    triggerElement: {
      description:
        'The element that toggles the menu. It receives a `ref` and an `onClick`; its own `ref` and `onClick` still run.',
      table: { type: { summary: 'ReactElement' } },
      control: { disable: true },
    },
    children: {
      description:
        'The menu content: `CubeOverflowMenu.Item`, `CubeOverflowMenu.Title` and `CubeOverflowMenu.Divider` elements.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    type: {
      description:
        'What the item shows besides its title. Decides which of the type-specific props below apply.',
      table: { type: { summary: formatUnionType(cubeOverflowMenuItemTypes) } },
      control: 'select',
      options: cubeOverflowMenuItemTypes,
    },
    title: {
      description: 'The item text.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    boldTitle: {
      description: 'Renders the title in semibold.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    subText: {
      description: 'Secondary text below the title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    disabled: {
      description: 'Greys the item out and ignores clicks.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    onClick: {
      description:
        'Called when the item is clicked. The menu then closes, except for `check-mark` and `toggle` items.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    MenuIcon: {
      description:
        '`menu-icon` only: the icon shown in a tile before the title.',
      table: { type: { summary: 'SvgComponent' } },
      control: { disable: true },
    },
    isChecked: {
      description: '`check-mark` only: whether the check mark is shown.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    checked: {
      description: '`toggle` only: whether the trailing toggle is on.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    onCheckedChange: {
      description: '`toggle` only: called with the next value when toggled.',
      table: { type: { summary: '(checked: boolean) => void' } },
      control: { disable: true },
    },
    TrailingIcon: {
      description: '`trailing-icon` only: the icon shown after the title.',
      table: { type: { summary: 'SvgComponent' } },
      control: { disable: true },
    },
    element: {
      description:
        '`custom-leading-element` only: any element shown before the title.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeOverflowMenuStoryArgs>

const buildItemProps = (
  args: CubeOverflowMenuStoryArgs,
  onToggle: (checked: boolean) => void,
  onCheck: () => void,
): CubeOverflowMenuItemProps => {
  const { title, boldTitle, subText, disabled, onClick } = args
  const common = { title, boldTitle, subText, disabled, onClick }

  switch (args.type) {
    case 'menu-icon':
      return {
        ...common,
        type: 'menu-icon',
        MenuIcon: args.MenuIcon ?? MonochromeHome01,
      }
    case 'check-mark':
      return {
        ...common,
        type: 'check-mark',
        isChecked: !!args.isChecked,
        onClick: onCheck,
      }
    case 'toggle':
      return {
        ...common,
        type: 'toggle',
        checked: !!args.checked,
        onCheckedChange: onToggle,
      }
    case 'trailing-icon':
      return {
        ...common,
        type: 'trailing-icon',
        TrailingIcon: args.TrailingIcon ?? MonochromePower,
      }
    case 'custom-leading-element':
      return {
        ...common,
        type: 'custom-leading-element',
        element: args.element,
      }
    case 'plain':
    default:
      return { ...common, type: 'plain' }
  }
}

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <Story />
      </PlaygroundLayout>
    ),
  ],
  args: {
    triggerElement: <OverflowMenuTrigger />,
    type: 'menu-icon',
    title: 'Option Title 1',
    boldTitle: true,
    subText: 'Subtext',
    disabled: false,
    onClick: () => {},
    MenuIcon: MonochromeHome01,
    isChecked: true,
    checked: true,
    TrailingIcon: MonochromePower,
    element: (
      <MonochromeWarningAltFilled className="icon-md text-status-warning" />
    ),
  },
  // `CubeOverflowMenu.Item` args apply to the first item; the rest is static
  // context. Toggle / check-mark changes write back to the Controls.
  render: function Render(args) {
    const [, updateArgs] = useArgs()

    const itemProps = buildItemProps(
      args,
      (checked) => updateArgs({ checked }),
      () => updateArgs({ isChecked: !args.isChecked }),
    )

    return (
      <CubeOverflowMenu triggerElement={args.triggerElement}>
        <CubeOverflowMenu.Title>Catalog Title</CubeOverflowMenu.Title>
        <CubeOverflowMenu.Item {...itemProps} />
        <CubeOverflowMenu.Item
          type="plain"
          title="Option Title 2"
          subText="Subtext"
          onClick={() => {}}
        />
        <CubeOverflowMenu.Divider />
        <CubeOverflowMenu.Item
          type="plain"
          title="Option Title 3"
          onClick={() => {}}
        />
      </CubeOverflowMenu>
    )
  },
}

// Complete menus ported from the old Gallery; each opens from its trigger.
const composedMenus = [
  { title: 'Single', Menu: SingleOverflowMenu },
  { title: 'Multiple', Menu: MultipleOverflowMenu },
  { title: 'Check Mark', Menu: CheckMarkOverflowMenu },
  { title: 'Action', Menu: ActionOverflowMenu },
  { title: 'Notification', Menu: NotificationOverflowMenu },
]

export const Gallery: Story = {
  tags: ['!autodocs'],
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
    options: {
      rightPanelWidth: 0,
      bottomPanelHeight: 0,
    },
  },
  render: () => {
    return (
      <StoryLayout title="Overflow Menu">
        <StoryLayout.Section title="Item Variants">
          <div className="flex flex-col gap-y-6">
            <OverflowMenuItemRow.Header />
            {cubeOverflowMenuItemTypes.map((type) => (
              <OverflowMenuItemRow key={type} type={type} />
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Title & Divider">
          <OverflowMenuFrame>
            <CubeOverflowMenu.Title>Catalog Title 1</CubeOverflowMenu.Title>
            <CubeOverflowMenu.Item
              type="plain"
              title="Option Title 1"
              subText="Subtext"
            />
            <CubeOverflowMenu.Item
              type="plain"
              title="Option Title 2"
              subText="Subtext"
            />
            <CubeOverflowMenu.Divider />
            <CubeOverflowMenu.Title>Catalog Title 2</CubeOverflowMenu.Title>
            <CubeOverflowMenu.Item
              type="plain"
              title="Option Title 3"
              subText="Subtext"
            />
          </OverflowMenuFrame>
        </StoryLayout.Section>
        <StoryLayout.Section title="Composed Menus">
          <div className="flex flex-col gap-y-6">
            {composedMenus.map(({ title, Menu }) => (
              <div
                key={title}
                className="grid grid-cols-5 items-center gap-x-12"
              >
                <SubHeading className="col-span-1">{title}</SubHeading>
                <div>
                  <Menu />
                </div>
              </div>
            ))}
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
