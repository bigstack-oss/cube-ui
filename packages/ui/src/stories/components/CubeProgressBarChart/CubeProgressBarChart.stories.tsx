import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import {
  CubeProgressBarChart,
  type CubeProgressBarChartProps,
} from '@components/CubeProgressBarChart/CubeProgressBarChart'
import { ProgressBarChartRow } from './ProgressBarChartRow'

const CubeProgressBarChartDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubeProgressBarChartProps> = {
  title: 'Molecules/Chart/Progress Bar Chart',
  component: CubeProgressBarChart,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A titled resource usage bar for dashboards. It grows to fill a flex row (`flex-1`); the bar takes its color from the usage like the resource usage bar.',
      },
      page: CubeProgressBarChartDocs,
    },
  },
  argTypes: {
    title: {
      description: 'The chart title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    subtext: {
      description: 'Text shown next to the title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    progress: {
      description:
        'The usage in percent. Above 100 the bar shows an over-limit segment.',
      table: { type: { summary: 'number' } },
      control: { type: 'range', min: 0, max: 300, step: 1 },
    },
    isLoading: {
      description: 'Renders a skeleton in place of the bar; the title stays.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    className: {
      description:
        'Additional classes merged onto the bar (not the chart), e.g. a bar width.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    skeletonClassName: {
      description: 'Additional classes merged onto the skeleton.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeProgressBarChartProps>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="flex w-[360px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    title: 'Chart Title',
    subtext: 'Subtext',
    progress: 50,
    isLoading: false,
  },
  render: (args) => <CubeProgressBarChart {...args} />,
}

const flexProgress = [0, 1, 50, 99, 100]

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
      <StoryLayout title="Progress Bar Chart">
        <StoryLayout.Section title="Progress">
          <div className="flex flex-col gap-y-6">
            {[0, 1, 50, 79, 85, 100].map((progress) => (
              <ProgressBarChartRow key={progress} title={String(progress)}>
                <CubeProgressBarChart title="Chart Title" progress={progress} />
              </ProgressBarChartRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <ProgressBarChartRow title="Default">
              <CubeProgressBarChart title="Chart Title" progress={50} />
            </ProgressBarChartRow>
            <ProgressBarChartRow title="w/Subtext">
              <CubeProgressBarChart
                title="Chart Title"
                subtext="Subtext"
                progress={50}
              />
            </ProgressBarChartRow>
            <ProgressBarChartRow title="Custom width">
              <CubeProgressBarChart
                title="Chart Title"
                progress={34}
                className="w-[180px]"
              />
            </ProgressBarChartRow>
            <ProgressBarChartRow title="Flex" width={960}>
              <div className="flex flex-1 items-center gap-x-4">
                {flexProgress.map((progress) => (
                  <CubeProgressBarChart
                    key={progress}
                    title="Chart Title"
                    subtext="Subtext"
                    progress={progress}
                  />
                ))}
              </div>
            </ProgressBarChartRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-6">
            <ProgressBarChartRow title="Default">
              <CubeProgressBarChart
                title="Chart Title"
                progress={0}
                isLoading
              />
            </ProgressBarChartRow>
            <ProgressBarChartRow title="Custom width">
              <CubeProgressBarChart
                title="Chart Title"
                progress={0}
                isLoading
                skeletonClassName="w-[180px]"
              />
            </ProgressBarChartRow>
            <ProgressBarChartRow title="Flex" width={960}>
              <div className="flex flex-1 items-center gap-x-4">
                {flexProgress.map((progress) => (
                  <CubeProgressBarChart
                    key={progress}
                    title="Chart Title"
                    progress={progress}
                    isLoading
                  />
                ))}
              </div>
            </ProgressBarChartRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
