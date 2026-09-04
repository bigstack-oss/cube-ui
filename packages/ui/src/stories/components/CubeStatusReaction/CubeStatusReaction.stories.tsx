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
import { CubeStatusReaction } from '@components/CubeStatusReaction/CubeStatusReaction'
import type { CubeStatusReactionProps } from '@components/CubeStatusReaction'
import { cubeStatusReactionStatuses } from '@components/CubeStatusReaction/cubeStatusReactionUtils'
import { StatusReactionRow } from './StatusReactionRow'

const CubeStatusReactionDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubeStatusReactionProps> = {
  title: 'Atoms/Status Reaction',
  component: CubeStatusReaction as ComponentType<CubeStatusReactionProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'An icon-and-text reaction to the outcome of an action, such as a form submission or a task completion.',
      },
      page: CubeStatusReactionDocs,
    },
  },
  argTypes: {
    status: {
      description: 'The outcome the reaction represents.',
      table: { type: { summary: formatUnionType(cubeStatusReactionStatuses) } },
      control: 'select',
      options: cubeStatusReactionStatuses,
    },
    message: {
      description:
        'Custom display text. When omitted, text is derived from `status`.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeStatusReactionProps>

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
    status: 'success',
  },
  render: (args) => <CubeStatusReaction {...args} />,
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
      <StoryLayout title="Status Reaction">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            <StatusReactionRow title="Neutral">
              <CubeStatusReaction status="neutral" />
            </StatusReactionRow>
            <StatusReactionRow title="Success">
              <CubeStatusReaction status="success" />
              <CubeStatusReaction status="available" />
              <CubeStatusReaction status="done" />
            </StatusReactionRow>
            <StatusReactionRow title="Warning">
              <CubeStatusReaction status="error" />
              <CubeStatusReaction status="duplicate" />
              <CubeStatusReaction status="failed" />
            </StatusReactionRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <StatusReactionRow title="Default">
            <CubeStatusReaction.Skeleton />
          </StatusReactionRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
