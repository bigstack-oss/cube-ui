import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeResourceUsageBar } from '@components/CubeProgressBar/CubeResourceUsageBar'
import type { CubeResourceUsageBarProps } from '@components/CubeProgressBar/cubeProgressBarTypes'
import { ProgressBarLayouts, ProgressBarRow } from './ProgressBarRow'

const CubeResourceUsageBarDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubeResourceUsageBarProps> = {
  title: 'Atoms/Progress Bar/Resource Usage Bar',
  component: CubeResourceUsageBar,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A progress bar for resource usage that picks its color from the value: chart blue up to 50%, warning up to 80%, negative above. Above 100% the bar stays full and an over-limit segment shows the part over 100% (it is full at 200%).',
      },
      page: CubeResourceUsageBarDocs,
    },
  },
  argTypes: {
    progress: {
      description:
        'The usage in percent. Above 100 the over-limit segment shows the excess.',
      table: { type: { summary: 'number' } },
      control: { type: 'range', min: 0, max: 300, step: 1 },
    },
    className: {
      description:
        'Additional classes merged onto the container, e.g. a width.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeResourceUsageBarProps>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[360px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    progress: 65,
  },
  render: (args) => <CubeResourceUsageBar {...args} />,
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
      <StoryLayout title="Resource Usage Bar">
        <StoryLayout.Section title="Progress">
          <div className="flex flex-col gap-y-6">
            {[0, 1, 50, 51, 70, 80, 81, 99, 100].map((progress) => (
              <ProgressBarRow key={progress} title={String(progress)}>
                <CubeResourceUsageBar progress={progress} />
              </ProgressBarRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Over Limit">
          <div className="flex flex-col gap-y-6">
            {[101, 150, 199, 200, 250, 300].map((progress) => (
              <ProgressBarRow key={progress} title={String(progress)}>
                <CubeResourceUsageBar progress={progress} />
              </ProgressBarRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <ProgressBarLayouts
            renderBar={(className) => (
              <CubeResourceUsageBar progress={50} className={className} />
            )}
          />
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <ProgressBarLayouts
            renderBar={(className) => (
              <CubeResourceUsageBar.Skeleton className={className} />
            )}
          />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
