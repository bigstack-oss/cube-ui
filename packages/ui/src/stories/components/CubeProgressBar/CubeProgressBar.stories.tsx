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
import { CubeProgressBar } from '@components/CubeProgressBar/CubeProgressBar'
import type { CubeProgressBarProps } from '@components/CubeProgressBar/cubeProgressBarTypes'
import { ProgressBarLayouts, ProgressBarRow } from './ProgressBarRow'

const CubeProgressBarDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// `color` takes any background color class; these are the ones shown here.
const colorOptions = [
  'bg-chart-1',
  'bg-chart-2',
  'bg-chart-3',
  'bg-chart-4',
  'bg-chart-5',
  'bg-chart-6',
  'bg-chart-7',
  'bg-status-positive',
  'bg-status-warning',
  'bg-status-negative',
] as const satisfies readonly CubeProgressBarProps['color'][]

const meta: Meta<CubeProgressBarProps> = {
  title: 'Atoms/Progress Bar/Progress Bar',
  component: CubeProgressBar,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A thin bar showing a percentage, with the rounded percentage next to it. It fills its container; very short fills (or very short gaps near 100%) are widened just enough to keep their rounded ends visible. For resource usage with automatic colors, use the resource usage bar.',
      },
      page: CubeProgressBarDocs,
    },
  },
  argTypes: {
    progress: {
      description:
        'The progress in percent, usually 0–100. The label shows it rounded (at least 1% when above 0). A negative value logs a warning.',
      table: { type: { summary: 'number' } },
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
    color: {
      description: 'The fill color, as a background color class.',
      table: {
        type: {
          summary: 'BackgroundColorClass',
          detail: formatUnionType(colorOptions),
        },
      },
      control: 'select',
      options: colorOptions,
    },
    className: {
      description:
        'Additional classes merged onto the container, e.g. a width.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    children: {
      description:
        'Extra elements drawn inside the bar, e.g. an over-limit segment.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    ref: {
      description: 'Exposes `{ barWidth }`, the measured bar width in px.',
      table: { type: { summary: 'Ref<CubeProgressBarRef>' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeProgressBarProps>

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
    progress: 50,
    color: 'bg-chart-1',
  },
  render: (args) => <CubeProgressBar {...args} />,
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
      <StoryLayout title="Progress Bar">
        <StoryLayout.Section title="Progress">
          <div className="flex flex-col gap-y-6">
            {[0, 1, 50, 99, 100].map((progress) => (
              <ProgressBarRow key={progress} title={String(progress)}>
                <CubeProgressBar progress={progress} color="bg-chart-1" />
              </ProgressBarRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Colors">
          <div className="flex flex-col gap-y-6">
            {colorOptions.map((color) => (
              <ProgressBarRow key={color} title={color}>
                <CubeProgressBar progress={50} color={color} />
              </ProgressBarRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <ProgressBarLayouts
            renderBar={(className) => (
              <CubeProgressBar
                progress={50}
                color="bg-chart-1"
                className={className}
              />
            )}
          />
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <ProgressBarLayouts
            renderBar={(className) => (
              <CubeProgressBar.Skeleton className={className} />
            )}
          />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
