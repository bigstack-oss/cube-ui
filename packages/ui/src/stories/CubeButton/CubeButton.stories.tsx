import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArgTypes, Description, Title } from '@storybook/addon-docs/blocks'
import { formatUnionType } from '../../internals/utils/formatType'
import { CubeButton } from '../../components/CubeButton/CubeButton'
import {
  allCubeButtonSizes,
  allCubeButtonTypes,
  allCubeButtonUsages,
} from '../../components/CubeButton/cubeButtonTypes'
import { StoryLayout } from '../../internals/components/StoryLayout/StoryLayout'
import { ButtonVariantTable } from './ButtonVariantTable'
import ButtonSkeletonTable from './ButtonSkeletonTable'

const documentedProps = [
  'htmlType',
  'type',
  'size',
  'usage',
  'disabled',
  'loading',
  'children',
  'Icon',
] as const

const CubeButtonDocsPage = () => (
  <>
    <Title />
    <Description />
    <ArgTypes include={[...documentedProps]} sort="alpha" />
  </>
)

const meta: Meta<typeof CubeButton> = {
  title: 'Atoms/Button',
  component: CubeButton,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      page: CubeButtonDocsPage,
      description: {
        component:
          'Buttons allow users to take actions, and make choices, with a single tap.',
      },
    },
  },
  argTypes: {
    htmlType: {
      description: 'The HTML type of the button.',
      table: {
        type: { summary: formatUnionType(['button', 'submit', 'reset']) },
      },
      defaultValue: { summary: 'button' },
    },
    type: {
      description: 'The type of the button.',
      table: { type: { summary: formatUnionType(allCubeButtonTypes) } },
      defaultValue: { summary: 'primary' },
    },
    size: {
      description: 'The size of the button.',
      table: { type: { summary: formatUnionType(allCubeButtonSizes) } },
      defaultValue: { summary: 'md' },
    },
    usage: {
      description: 'The usage of the button.',
      table: { type: { summary: formatUnionType(allCubeButtonUsages) } },
      defaultValue: { summary: 'text-only' },
    },
    disabled: {
      description: 'Whether the button is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
    },
    loading: {
      description: 'Whether the button is loading.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
    },
    children: {
      description:
        'Required when usage is text-only, icon-left, or icon-right.',
      table: { type: { summary: 'string' } },
    },
    Icon: {
      description:
        'Required when usage is icon-only, icon-left, or icon-right.',
      table: { type: { summary: 'SvgComponent' } },
    },
  },
}

export default meta

type ButtonStoryArgs = ComponentProps<typeof CubeButton> & {
  buttonText: string
}

type Story = StoryObj<ButtonStoryArgs>

export const Gallery: Story = {
  args: {
    buttonText: 'Call to action',
  },
  render: (props: ButtonStoryArgs) => {
    const { buttonText } = props

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
