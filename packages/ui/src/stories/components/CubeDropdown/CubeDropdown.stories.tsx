import { type ComponentType, type ReactNode, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Subheading,
  Title,
} from '@storybook/addon-docs/blocks'
import { CaptionText } from '@internals/components/CaptionText'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { formatUnionType } from '@internals/utils/formatType'
import { CubeDropdown } from '@components/CubeDropdown/CubeDropdown'
import {
  cubeDropdownSizes,
  cubeDropdownTypes,
  cubeDropdownVariants,
  type CubeDropdownSize,
  type CubeDropdownType,
  type CubeDropdownVariant,
  type OnAllCheckChange,
  type OnClearSelection,
} from '@components/CubeDropdown/cubeDropdownTypes'
import type { CubeDropdownTriggerProps } from '@components/CubeDropdown/CubeDropdownTrigger'
import type { CubeDropdownItemProps } from '@components/CubeDropdown/CubeDropdownItem'
import { DropdownRow } from './DropdownRow'
import { DropdownSizeRow } from './DropdownSizeRow'
import { DropdownSkeletonRow } from './DropdownSkeletonRow'
import { mockData, placeholder, type MockDataItem } from './mockData'

const rootArgs = [
  'size',
  'type',
  'variant',
  'selectedItems',
  'isLoading',
  'disabled',
  'label',
  'skeletonClassName',
  'children',
  'onAllCheckChange',
  'onClearSelection',
]
const triggerArgs = ['placeholder', 'className']
const itemArgs = ['item', 'onClick']

const CubeDropdownDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeDropdown</Subheading>
      <Controls include={rootArgs} />
      <Subheading>CubeDropdown.Trigger</Subheading>
      <Controls include={triggerArgs} />
      <Subheading>CubeDropdown.Item</Subheading>
      <Controls include={itemArgs} />
    </>
  )
}

// Args follow the compound hierarchy: `CubeDropdown`'s props, then
// `CubeDropdown.Trigger`'s, then `CubeDropdown.Item`'s. Member props whose
// name is already taken by the root (`children`, Item's `disabled`) are left
// out, and `CubeDropdown.Menu` has none left, so it has no group. State-owned
// props, the content and callbacks are listed with their controls disabled.
type CubeDropdownStoryArgs = {
  // CubeDropdown
  size?: CubeDropdownSize
  type: CubeDropdownType
  variant?: CubeDropdownVariant
  selectedItems: MockDataItem[]
  isLoading?: boolean
  disabled?: boolean
  label?: string
  skeletonClassName?: string
  children: ReactNode
  onAllCheckChange?: OnAllCheckChange
  onClearSelection?: OnClearSelection
  // CubeDropdown.Trigger
  placeholder?: CubeDropdownTriggerProps['placeholder']
  className?: CubeDropdownTriggerProps['className']
  // CubeDropdown.Item
  item?: CubeDropdownItemProps<MockDataItem>['item']
  onClick?: CubeDropdownItemProps<MockDataItem>['onClick']
}

const meta: Meta<CubeDropdownStoryArgs> = {
  title: 'Molecules/Dropdown',
  component: CubeDropdown as ComponentType<CubeDropdownStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Dropdowns let users pick one (radio) or several (checkbox) items from a floating menu, optionally narrowed down with a search filter.',
      },
      page: CubeDropdownDocs,
    },
  },
  argTypes: {
    size: {
      description: 'The size of the trigger and menu.',
      table: { type: { summary: formatUnionType(cubeDropdownSizes) } },
      defaultValue: { summary: 'md' },
      control: 'select',
      options: cubeDropdownSizes,
    },
    type: {
      description:
        'Single selection (`radio`) or multiple selection (`checkbox`).',
      table: { type: { summary: formatUnionType(cubeDropdownTypes) } },
      control: 'select',
      options: cubeDropdownTypes,
    },
    variant: {
      description: 'Whether the menu shows a search filter (`withFilter`).',
      table: { type: { summary: formatUnionType(cubeDropdownVariants) } },
      defaultValue: { summary: 'regular' },
      control: 'select',
      options: cubeDropdownVariants,
    },
    selectedItems: {
      description:
        'The currently selected items. Owned by the caller; compared by reference against each `CubeDropdown.Item`’s `item`.',
      table: { type: { summary: 'Item[]' } },
      control: { disable: true },
    },
    isLoading: {
      description: 'Renders a skeleton instead of the dropdown.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the trigger is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    label: {
      description: 'The label displayed above the trigger.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    skeletonClassName: {
      description: 'Additional classes merged onto the loading skeleton.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    children: {
      description:
        'A `CubeDropdown.Trigger` and a `CubeDropdown.Menu` containing `CubeDropdown.Item`s.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    onAllCheckChange: {
      description:
        'Called by the "All" checkbox. Required when `type` is `checkbox`.',
      table: { type: { summary: '(checked: boolean) => void' } },
      control: { disable: true },
    },
    onClearSelection: {
      description:
        'Called by the trigger’s clear button. Required for a `checkbox` dropdown `withFilter`.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    placeholder: {
      description:
        'Text shown in the trigger while nothing is selected. Defaults to the translated "Choose".',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    className: {
      description: 'Additional classes merged onto the trigger button.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    item: {
      description:
        'The value this item represents. Selected when it is in `selectedItems` (by reference).',
      table: { type: { summary: 'Item' } },
      control: { disable: true },
    },
    onClick: {
      description:
        'Called when the item is clicked. Not called while the item is disabled.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeDropdownStoryArgs>

type PlaygroundDropdownProps = Pick<
  CubeDropdownStoryArgs,
  | 'size'
  | 'type'
  | 'variant'
  | 'isLoading'
  | 'disabled'
  | 'label'
  | 'placeholder'
  | 'className'
>

const PlaygroundDropdown = (props: PlaygroundDropdownProps) => {
  const { type, variant, placeholder, className, ...rest } = props

  const [selectedItems, setSelectedItems] = useState<MockDataItem[]>([])

  const onItemClick = (item: MockDataItem) => {
    if (type === 'radio') {
      setSelectedItems([item])
      return
    }
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    )
  }

  const onAllCheckChange = (checked: boolean) => {
    setSelectedItems(checked ? mockData.filter((item) => !item.disabled) : [])
  }

  const children = [
    <CubeDropdown.Trigger
      key="trigger"
      placeholder={placeholder}
      className={className}
    >
      {selectedItems.map((item) => item.label).join(', ') || undefined}
    </CubeDropdown.Trigger>,
    <CubeDropdown.Menu key="menu">
      {mockData.map((item) => (
        <CubeDropdown.Item
          key={item.value}
          item={item}
          disabled={item.disabled}
          onClick={() => onItemClick(item)}
        >
          {item.label}
        </CubeDropdown.Item>
      ))}
    </CubeDropdown.Menu>,
  ]

  if (type === 'radio') {
    return (
      <CubeDropdown
        {...rest}
        type="radio"
        variant={variant}
        selectedItems={selectedItems}
      >
        {children}
      </CubeDropdown>
    )
  }

  if (variant === 'withFilter') {
    return (
      <CubeDropdown
        {...rest}
        type="checkbox"
        variant="withFilter"
        selectedItems={selectedItems}
        onAllCheckChange={onAllCheckChange}
        onClearSelection={() => setSelectedItems([])}
      >
        {children}
      </CubeDropdown>
    )
  }

  return (
    <CubeDropdown
      {...rest}
      type="checkbox"
      variant="regular"
      selectedItems={selectedItems}
      onAllCheckChange={onAllCheckChange}
    >
      {children}
    </CubeDropdown>
  )
}

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[320px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    size: 'md',
    type: 'checkbox',
    variant: 'withFilter',
    isLoading: false,
    disabled: false,
    label: 'Label',
    placeholder,
  },
  // `type` / `variant` change which callbacks are valid, so remount to reset
  // the selection when either control changes.
  // `placeholder` / `className` belong to `CubeDropdown.Trigger`, so they're
  // applied there rather than to the root.
  render: ({
    size,
    type,
    variant,
    isLoading,
    disabled,
    label,
    placeholder,
    className,
  }) => (
    <PlaygroundDropdown
      key={`${type}-${variant}`}
      size={size}
      type={type}
      variant={variant}
      isLoading={isLoading}
      disabled={disabled}
      label={label}
      placeholder={placeholder}
      className={className}
    />
  ),
}

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
      <StoryLayout title="Dropdown">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-8">
            <DropdownRow.Header />
            <DropdownRow title="Default" />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Sizes">
          <div className="flex flex-col gap-y-8">
            <DropdownSizeRow size="md" />
            <DropdownSizeRow size="sm" />
            <CaptionText>
              `md` is the default; `sm` is for compact contexts. `sm` makes the
              trigger shorter (34px vs 38px) with tighter padding, narrows the
              allowed width (80–240px vs 116–360px), shrinks the label gap (6px
              vs 8px), and uses smaller menu items (12px text vs 13px, checkbox
              labels included) with a lower menu max height (390px vs 442px).
              The trigger text stays 13px in both sizes.
            </CaptionText>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Status">
          <div className="flex flex-col gap-y-8">
            <DropdownRow.Header />
            <DropdownRow title="Unselected" />
            <DropdownRow title="Unselected + Disabled" disabled />
            <DropdownRow title="Selected" selected />
            <DropdownRow title="Selected + Disabled" selected disabled />
            <DropdownRow title="No Data" isNoData />
            <DropdownRow title="w/Label" label="Label" />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-8">
            <DropdownSkeletonRow.Header />
            <DropdownSkeletonRow size="md" />
            <DropdownSkeletonRow size="sm" />
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
