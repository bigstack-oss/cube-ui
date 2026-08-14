import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeTag } from '@components/CubeTag/CubeTag'
import {
  cubeTagColors,
  cubeTagVariants,
  type CubeTagColor,
  type CubeTagVariant,
} from '@components/CubeTag/cubeTagTypes'
import { MonochromeTag } from '@icons'
import { SubHeadingRow, TagSkeletonCells, TagVariantRow } from './TagVariantRow'
import { TagRow } from './TagRow'

const CubeTagDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const iconOptions = ['none', 'tag icon'] as const

// The real `Icon` prop takes an `SvgComponent`, which a Storybook control
// can't represent directly. This select stands in for its presence/absence;
// the Playground `render` below maps it back to the real `Icon` prop.
type IconOption = (typeof iconOptions)[number]

// Flattened args for Storybook, one-to-one with CubeTagProps except `Icon`
// (see IconOption above). Only props relevant to demoing the component are
// exposed as controls; native/callback props follow the same omission
// CubeButton.stories.tsx makes for `onClick`.
type CubeTagStoryArgs = {
  children?: string
  color?: CubeTagColor
  variant: CubeTagVariant
  disabled?: boolean
  isLoading?: boolean
  showCloseButton?: boolean
  onClose?: () => void
  Icon?: IconOption
}

const meta: Meta<CubeTagStoryArgs> = {
  title: 'Atoms/Tag',
  component: CubeTag as ComponentType<CubeTagStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Tags label or categorize content with a short piece of text, optionally paired with an icon or a close action.',
      },
      page: CubeTagDocs,
    },
  },
  argTypes: {
    children: {
      description: 'The text content of the tag.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    color: {
      description: 'The color of the tag.',
      table: { type: { summary: formatUnionType(cubeTagColors) } },
      defaultValue: { summary: 'default' },
      control: 'select',
      options: cubeTagColors,
    },
    variant: {
      description: 'The visual style of the tag.',
      table: { type: { summary: formatUnionType(cubeTagVariants) } },
      control: 'select',
      options: cubeTagVariants,
    },
    disabled: {
      description: 'Whether the tag is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isLoading: {
      description: 'Whether the tag renders its loading skeleton.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    showCloseButton: {
      description:
        'Shows a close button inside the tag. Mutually exclusive with `Icon` — if both are set, `Icon` takes precedence.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    onClose: {
      description:
        'Called when the close button is clicked. Only used when `showCloseButton` is true; does not fire while `disabled` is true.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    Icon: {
      description:
        'Adds a leading icon to the tag. Mutually exclusive with `showCloseButton` — if set, this takes precedence.',
      table: { type: { summary: 'SvgComponent' } },
      defaultValue: { summary: 'none' },
      control: 'select',
      options: iconOptions,
    },
  },
}

export default meta

type Story = StoryObj<CubeTagStoryArgs>

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
    children: 'Tag label',
    color: 'default',
    variant: 'filled',
    disabled: false,
    isLoading: false,
    showCloseButton: false,
    Icon: 'none',
  },
  render: ({ showCloseButton, onClose, Icon, ...args }) => {
    if (Icon === 'tag icon') {
      return <CubeTag {...args} Icon={MonochromeTag} />
    }

    if (showCloseButton) {
      return <CubeTag {...args} showCloseButton onClose={onClose} />
    }

    return <CubeTag {...args} />
  },
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
  render: function Render() {
    return (
      <StoryLayout title="Tag">
        <StoryLayout.Section title="Variants">
          <div className="w-[1000px] overflow-auto">
            <TagVariantRow color="default" />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Colors">
          <div className="flex w-[1000px] flex-col gap-y-12 overflow-auto">
            <TagVariantRow color="default" />
            <TagVariantRow color="primary-blue" />
            <TagVariantRow color="blue" />
            <TagVariantRow color="cyan" />
            <TagVariantRow color="dark" />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex w-[1000px] flex-col gap-y-6 overflow-auto">
            <TagRow title="">
              <SubHeadingRow />
            </TagRow>
            <TagRow title="Default">
              <TagSkeletonCells />
            </TagRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
