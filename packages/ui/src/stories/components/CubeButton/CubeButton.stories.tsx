import type { ButtonHTMLAttributes, ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { formatUnionType } from '@internals/utils/formatType'
import { CubeButton } from '@components/CubeButton/CubeButton'
import {
  cubeButtonSizes,
  cubeButtonTypes,
  cubeButtonUsages,
  type CubeButtonSize,
  type CubeButtonType,
  type CubeButtonUsage,
} from '@components/CubeButton/cubeButtonTypes'
import type { SvgComponent } from '@components/CubeIcon/cubeIconTypes'
import { ButtonVariantTable } from './ButtonVariantTable'
import { ButtonSkeletonTable } from './ButtonSkeletonTable'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { MonochromeHome01 } from '@icons'

const CubeButtonDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// Flattened args for Storybook: Icon stays available for every usage so the
// playground can switch between text-only and icon usages.
type CubeButtonStoryArgs = {
  children?: string
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  type?: CubeButtonType
  size?: CubeButtonSize
  usage?: CubeButtonUsage
  disabled?: boolean
  loading?: boolean
  Icon?: SvgComponent
}

const meta: Meta<CubeButtonStoryArgs> = {
  title: 'Atoms/Button',
  component: CubeButton as ComponentType<CubeButtonStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      page: CubeButtonDocs,
    },
  },
  argTypes: {
    htmlType: {
      description: 'The HTML type of the button.',
      table: {
        type: { summary: formatUnionType(['button', 'submit', 'reset']) },
      },
      defaultValue: { summary: 'button' },
      control: { disable: true },
    },
    type: {
      description: 'The type of the button.',
      table: { type: { summary: formatUnionType(cubeButtonTypes) } },
      defaultValue: { summary: 'primary' },
      control: 'select',
      options: cubeButtonTypes,
    },
    size: {
      description: 'The size of the button.',
      table: { type: { summary: formatUnionType(cubeButtonSizes) } },
      defaultValue: { summary: 'md' },
      control: 'select',
      options: cubeButtonSizes,
    },
    usage: {
      description: 'The usage of the button.',
      table: { type: { summary: formatUnionType(cubeButtonUsages) } },
      defaultValue: { summary: 'text-only' },
      control: 'select',
      options: cubeButtonUsages,
    },
    disabled: {
      description: 'Whether the button is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    loading: {
      description: 'Whether the button is loading.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    children: {
      description:
        'Required when usage is text-only, icon-left, or icon-right.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    Icon: {
      description:
        'Required when usage is icon-only, icon-left, or icon-right.',
      table: { type: { summary: 'SvgComponent' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeButtonStoryArgs>

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
    children: 'Call to action',
    type: 'primary',
    size: 'md',
    usage: 'text-only',
    disabled: false,
    loading: false,
    Icon: MonochromeHome01,
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
  render: () => {
    const buttonText = 'Call to action'

    return (
      <StoryLayout
        title="Button"
        desc="Buttons allow users to take actions, and make choices, with a single tap."
      >
        <StoryLayout.Section title="Variants">
          <ButtonVariantTable buttonText={buttonText} />
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <ButtonSkeletonTable />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
