import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs, useState as useStoryState } from 'storybook/preview-api'
import {
  Controls,
  Description,
  Subheading,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { formatUnionType } from '@internals/utils/formatType'
import { CubeContentSwitcher } from '@components/CubeContentSwitcher/CubeContentSwitcher'
import {
  cubeContentSwitcherSizes,
  cubeContentSwitcherVariants,
  type CubeContentSwitcherProps,
  type CubeContentSwitcherSize,
  type CubeContentSwitcherVariant,
} from '@components/CubeContentSwitcher/cubeContentSwitcherTypes'
import { ContentSwitcherRow } from './ContentSwitcherRow'

const CubeContentSwitcherDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeContentSwitcher</Subheading>
      <Controls include={['variant', 'size', 'className', 'children']} />
      <Subheading>CubeContentSwitcher.Item</Subheading>
      <Controls include={['isActive', 'disabled', 'onClick']} />
    </>
  )
}

// Root and Item props share one Playground so a full switcher stays visible,
// but each name is a real prop: `variant` / `size` / `className` / `children`
// on CubeContentSwitcher, the rest on CubeContentSwitcher.Item (applied to
// the first item). The Item's own `children` is left out because the root
// already owns that name.
type CubeContentSwitcherStoryArgs = {
  variant: CubeContentSwitcherVariant
  size?: CubeContentSwitcherSize
  className?: string
  children?: unknown
  isActive: boolean
  disabled?: boolean
  onClick?: unknown
}

type SwitcherConfig = { className?: string } & (
  | { variant: 'default'; size?: CubeContentSwitcherSize }
  | { variant: 'radius' }
)

const toConfig = (
  variant: CubeContentSwitcherVariant,
  size?: CubeContentSwitcherSize,
): SwitcherConfig =>
  variant === 'default' ? { variant, size } : { variant: 'radius' }

const meta: Meta<CubeContentSwitcherStoryArgs> = {
  title: 'Molecules/Content Switcher',
  component: CubeContentSwitcher as ComponentType<CubeContentSwitcherStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Content Switchers let users compare and toggle between alternate views of similar or related content. The grouped content belongs to the same bigger context but does not overlap. Each `CubeContentSwitcher.Item` is one view; render `CubeContentSwitcher.Skeleton` in its place while loading.',
      },
      page: CubeContentSwitcherDocs,
    },
  },
  argTypes: {
    variant: {
      description:
        'The look: `default` is a squared button group, `radius` a pill.',
      table: {
        type: { summary: formatUnionType(cubeContentSwitcherVariants) },
      },
      defaultValue: { summary: "'default'" },
      control: 'select',
      options: cubeContentSwitcherVariants,
    },
    size: {
      description: 'The item size. Only the `default` variant has sizes.',
      table: { type: { summary: formatUnionType(cubeContentSwitcherSizes) } },
      defaultValue: { summary: "'md'" },
      control: 'select',
      options: cubeContentSwitcherSizes,
      if: { arg: 'variant', eq: 'default' },
    },
    className: {
      description: 'Additional classes merged onto the container.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    children: {
      description: 'The `CubeContentSwitcher.Item` (or `.Skeleton`) elements.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    isActive: {
      description: 'Whether this item is the selected view.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    disabled: {
      description: 'Disables this item.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    onClick: {
      description: 'Called when the item is clicked.',
      table: {
        type: { summary: '(e: MouseEvent<HTMLButtonElement>) => void' },
      },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeContentSwitcherStoryArgs>

const itemLabels = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

type SwitcherExampleProps = {
  config: SwitcherConfig
  itemCount?: number
  disabled?: boolean
  isLoading?: boolean
}

// Keeps its own selection so every example is clickable.
const SwitcherExample = (props: SwitcherExampleProps) => {
  const { config, itemCount = 5, disabled, isLoading } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const labels = itemLabels.slice(0, itemCount)

  return (
    <CubeContentSwitcher {...(config as CubeContentSwitcherProps)}>
      {labels.map((label, index) =>
        isLoading ? (
          <CubeContentSwitcher.Skeleton key={label} />
        ) : (
          <CubeContentSwitcher.Item
            key={label}
            isActive={activeIndex === index}
            disabled={disabled}
            onClick={() => setActiveIndex(index)}
          >
            {label}
          </CubeContentSwitcher.Item>
        ),
      )}
    </CubeContentSwitcher>
  )
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
    variant: 'default',
    size: 'md',
    isActive: true,
    disabled: false,
  },
  render: function Render({ variant, size, isActive, disabled }) {
    const [, updateArgs] = useArgs<CubeContentSwitcherStoryArgs>()
    // The item selected while the first one is not; starts on Item 2.
    // Storybook's own state hook: React hooks can't share a render with useArgs.
    const [otherIndex, setOtherIndex] = useStoryState(1)

    // The first item follows the `isActive` control; the others are only
    // active while it is off, so exactly one item is ever selected.
    const onItemClick = (index: number) => {
      if (index === 0) {
        updateArgs({ isActive: true })
        return
      }
      setOtherIndex(index)
      updateArgs({ isActive: false })
    }

    return (
      <CubeContentSwitcher
        {...(toConfig(variant, size) as CubeContentSwitcherProps)}
      >
        {itemLabels.map((label, index) => (
          <CubeContentSwitcher.Item
            key={label}
            // Only the first item reflects the Item controls above.
            isActive={
              index === 0 ? isActive : !isActive && otherIndex === index
            }
            disabled={index === 0 ? disabled : false}
            onClick={() => onItemClick(index)}
          >
            {label}
          </CubeContentSwitcher.Item>
        ))}
      </CubeContentSwitcher>
    )
  },
}

// The three configurations each state is shown in.
const configurations: { label: string; config: SwitcherConfig }[] = [
  { label: 'default · md', config: { variant: 'default', size: 'md' } },
  { label: 'default · sm', config: { variant: 'default', size: 'sm' } },
  { label: 'radius', config: { variant: 'radius' } },
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
  render: function Render() {
    return (
      <StoryLayout title="Content Switcher">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            {cubeContentSwitcherVariants.map((variant) => (
              <ContentSwitcherRow key={variant} title={variant}>
                <div className="col-span-3">
                  <SwitcherExample config={toConfig(variant)} />
                </div>
              </ContentSwitcherRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Sizes">
          <div className="flex flex-col gap-y-6">
            {cubeContentSwitcherSizes.map((size) => (
              <ContentSwitcherRow key={size} title={size}>
                <div className="col-span-3">
                  <SwitcherExample config={toConfig('default', size)} />
                </div>
              </ContentSwitcherRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <ContentSwitcherRow.Header
              columns={configurations.map(({ label }) => label)}
            />
            {[false, true].map((disabled) => (
              <ContentSwitcherRow
                key={String(disabled)}
                title={disabled ? 'Disabled' : 'Default'}
              >
                {configurations.map(({ label, config }) => (
                  <SwitcherExample
                    key={label}
                    config={config}
                    itemCount={3}
                    disabled={disabled}
                  />
                ))}
              </ContentSwitcherRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-6">
            <ContentSwitcherRow.Header
              columns={configurations.map(({ label }) => label)}
            />
            <ContentSwitcherRow title="Default">
              {configurations.map(({ label, config }) => (
                <SwitcherExample
                  key={label}
                  config={config}
                  itemCount={3}
                  isLoading
                />
              ))}
            </ContentSwitcherRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
