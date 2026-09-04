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
import { CubeStatus } from '@components/CubeStatus/CubeStatus'
import type { CubeStatusProps } from '@components/CubeStatus'
import { cubeStatusKnownValues } from '@components/CubeStatus/cubeStatusUtils'
import { StatusRow } from './StatusRow'

const CubeStatusDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubeStatusProps> = {
  title: 'Atoms/Status',
  component: CubeStatus as ComponentType<CubeStatusProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A compact badge that shows a resource or process status, with built-in text and coloring for a set of well-known status values.',
      },
      page: CubeStatusDocs,
    },
  },
  argTypes: {
    status: {
      description:
        'The status value. A set of well-known values get built-in translated text and coloring; any other string falls back to a generated "Others" style label.',
      table: { type: { summary: formatUnionType(cubeStatusKnownValues) } },
      control: 'select',
      options: cubeStatusKnownValues,
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

type Story = StoryObj<CubeStatusProps>

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
  render: (args) => <CubeStatus {...args} />,
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
      <StoryLayout title="Status">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            <StatusRow title="Neutral">
              <CubeStatus status="neutral" />
              <CubeStatus status="in-use" />
              <CubeStatus status="finished" />
            </StatusRow>
            <StatusRow title="Success">
              <CubeStatus status="success" />
              <CubeStatus status="active" />
              <CubeStatus status="available" />
            </StatusRow>
            <StatusRow title="Warning">
              <CubeStatus status="warning" />
              <CubeStatus status="error" />
              <CubeStatus status="failed" />
              <CubeStatus status="stopped" />
            </StatusRow>
            <StatusRow title="Others">
              <CubeStatus status="others" />
              <CubeStatus status="deleted" />
              <CubeStatus status="suspended" />
              <CubeStatus status="expired" />
              <CubeStatus status="pending" />
              <CubeStatus status="anything-else" />
            </StatusRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <StatusRow title="Default">
            <CubeStatus.Skeleton />
          </StatusRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
