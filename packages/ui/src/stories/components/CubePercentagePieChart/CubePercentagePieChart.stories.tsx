import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubePercentagePieChart } from '@components/CubePercentagePieChart/CubePercentagePieChart'
import type { CubePercentagePieChartProps } from '@components/CubePercentagePieChart/cubePercentagePieChartTypes'
import type { StrokeColorClass } from '@theme/tokens/cubeTheme'
import { PercentagePieChartRow } from './PercentagePieChartRow'
import {
  formatCpuPercentage,
  memoryAndStorageUsages,
  vCpuUsages,
} from './percentagePieChartMockData'

const CubePercentagePieChartDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

const colorOptions: StrokeColorClass[] = [
  'stroke-chart-1',
  'stroke-chart-2',
  'stroke-chart-3',
  'stroke-status-warning',
  'stroke-status-negative',
]

const meta: Meta<CubePercentagePieChartProps> = {
  title: 'Organisms/Chart/Percentage Pie Chart',
  component:
    CubePercentagePieChart as ComponentType<CubePercentagePieChartProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A ring showing a usage percentage, with the total, the used amount and the unit. The ring fills up to `thresholdPercentage` (100% by default); usage above it is drawn as a second, over-limit ring with "Over Limit". Without `color`, the ring turns from blue to amber (above 50%) to red (above 80%).',
      },
      page: CubePercentagePieChartDocs,
    },
  },
  argTypes: {
    title: {
      description: 'Title above the ring.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    unit: {
      description: 'Unit after the total and the used amount.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    used: {
      description: 'The used amount.',
      table: { type: { summary: 'number' } },
      control: 'number',
    },
    total: {
      description: 'The total amount.',
      table: { type: { summary: 'number' } },
      control: 'number',
    },
    percentage: {
      description:
        'Overrides the percentage calculated from `used` and `total`. Shown rounded down, and at least 1% when above 0.',
      table: { type: { summary: 'number' } },
      control: 'number',
    },
    thresholdPercentage: {
      description:
        'The percentage that fills the ring; usage above it is drawn as an over-limit ring.',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '100' },
      control: 'number',
    },
    color: {
      description:
        'The ring color (a Tailwind stroke class). Without it, the color follows the percentage.',
      table: { type: { summary: 'StrokeColorClass' } },
      options: colorOptions,
      control: 'select',
    },
    percentageFormatter: {
      description: 'Formats the percentage in the middle.',
      table: { type: { summary: '(value: number) => string' } },
      defaultValue: { summary: '(value) => `${value}%`' },
      control: { disable: true },
    },
    overThresholdText: {
      description: 'Shown below the total when over the threshold.',
      table: { type: { summary: 'string' } },
      defaultValue: { summary: '"Over Limit" (translated)' },
      control: 'text',
    },
    isLoading: {
      description: 'Shows skeletons instead of the ring and the usage.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<CubePercentagePieChartProps>

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
    title: 'Memory',
    unit: 'GB',
    used: 380,
    total: 755.1,
    thresholdPercentage: 100,
    isLoading: false,
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
  render: () => (
    <StoryLayout title="Percentage Pie Chart">
      <StoryLayout.Section title="Layouts">
        <div className="flex flex-col gap-y-10">
          <PercentagePieChartRow title="Default">
            {memoryAndStorageUsages.map(([title, used, total], index) => (
              <CubePercentagePieChart
                key={index}
                title={title}
                unit="GB"
                used={used}
                total={total}
              />
            ))}
          </PercentagePieChartRow>
          <PercentagePieChartRow title="w/Threshold, color and formatter">
            {vCpuUsages.map(([used, total], index) => (
              <CubePercentagePieChart
                key={index}
                title="vCPU"
                unit="vCPU"
                color="stroke-chart-2"
                percentageFormatter={formatCpuPercentage}
                thresholdPercentage={400}
                used={used}
                total={total}
              />
            ))}
          </PercentagePieChartRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <PercentagePieChartRow title="Default">
          {['Memory', 'Storage', 'CPU'].map((title) => (
            <CubePercentagePieChart
              key={title}
              isLoading
              title={title}
              unit="GB"
              used={0}
              total={0}
            />
          ))}
        </PercentagePieChartRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
