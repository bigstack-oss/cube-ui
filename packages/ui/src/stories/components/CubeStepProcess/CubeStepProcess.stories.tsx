import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Subheading,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeStepProcess } from '@components/CubeStepProcess/CubeStepProcess'
import { DEFAULT_STEPS, StepProcessRow } from './StepProcessRow'

const CubeStepProcessDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeStepProcess</Subheading>
      <Controls include={['isLoading']} />
      <Subheading>CubeStepProcess.Item</Subheading>
      <Controls include={['stepNumber', 'label', 'isActive']} />
    </>
  )
}

// Root and Item props share one Playground so the sequence stays visible,
// but each name is a real prop: `isLoading` on CubeStepProcess, the rest on
// CubeStepProcess.Item (applied to the first item, like CubeTabs → CubeTab).
type CubeStepProcessStoryArgs = {
  isLoading?: boolean
  stepNumber: number
  label: string
  isActive: boolean
}

const meta: Meta<CubeStepProcessStoryArgs> = {
  title: 'Molecules/Step Process',
  component: CubeStepProcess as ComponentType<CubeStepProcessStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A horizontal sequence of steps that shows progress through a multi-step process, highlighting the currently active step.',
      },
      page: CubeStepProcessDocs,
    },
  },
  argTypes: {
    isLoading: {
      description: 'Whether the step process renders its loading skeleton.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    stepNumber: {
      description:
        'The step serial number (1-based) that represents this step in the process.',
      table: { type: { summary: 'number' } },
      control: 'number',
    },
    label: {
      description: 'The label text displayed next to the step number.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    isActive: {
      description: 'Whether this step is the currently active one.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<CubeStepProcessStoryArgs>

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
    isLoading: false,
    stepNumber: 1,
    label: 'Step Title 1',
    isActive: true,
  },
  // Only the first item reflects the Item controls above; the rest are
  // static context so a full sequence stays visible.
  render: ({ isLoading, stepNumber, label, isActive }) => (
    <CubeStepProcess isLoading={isLoading}>
      {DEFAULT_STEPS.map((step, index) =>
        index === 0 ? (
          <CubeStepProcess.Item
            key={step.label}
            stepNumber={stepNumber}
            label={label}
            isActive={isActive}
          />
        ) : (
          <CubeStepProcess.Item
            key={step.label}
            stepNumber={step.stepNumber}
            label={step.label}
            isActive={false}
          />
        ),
      )}
    </CubeStepProcess>
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
  render: function Render() {
    return (
      <StoryLayout title="Step Process">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            <StepProcessRow title="Default" activeIndexes={[1]} />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <StepProcessRow title="First" activeIndexes={[0]} />
            <StepProcessRow title="Middle" activeIndexes={[2]} />
            <StepProcessRow title="Last" activeIndexes={[4]} />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <StepProcessRow title="Default" isLoading activeIndexes={[]} />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
