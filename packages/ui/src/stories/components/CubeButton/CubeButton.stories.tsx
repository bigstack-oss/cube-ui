import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internals/components/StoryLayout/StoryLayout'
import { formatUnionType } from '../../../internals/utils/formatType'
import { CubeButton } from '../../../components/CubeButton/CubeButton'
import {
  cubeButtonSizes,
  cubeButtonTypes,
  cubeButtonUsages,
} from '../../../components/CubeButton/cubeButtonTypes'
import { ButtonVariantTable } from './ButtonVariantTable'
import { ButtonSkeletonTable } from './ButtonSkeletonTable'

const meta: Meta<typeof CubeButton> = {
  title: 'Atoms/Button',
  component: CubeButton,
  parameters: {
    controls: { expanded: true },
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
      control: { disable: true },
    },
    size: {
      description: 'The size of the button.',
      table: { type: { summary: formatUnionType(cubeButtonSizes) } },
      defaultValue: { summary: 'md' },
      control: { disable: true },
    },
    usage: {
      description: 'The usage of the button.',
      table: { type: { summary: formatUnionType(cubeButtonUsages) } },
      defaultValue: { summary: 'text-only' },
      control: { disable: true },
    },
    disabled: {
      description: 'Whether the button is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: { disable: true },
    },
    loading: {
      description: 'Whether the button is loading.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: { disable: true },
    },
    children: {
      description:
        'Required when usage is text-only, icon-left, or icon-right.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
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

type Story = StoryObj<typeof CubeButton>

export const Gallery: Story = {
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
