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
import { CubeColumnChart } from '@components/CubeColumnChart/CubeColumnChart'
import type {
  CubeColumnChartBaseData,
  CubeColumnChartProps,
} from '@components/CubeColumnChart/cubeColumnChartTypes'
import { ColumnChartRow } from './ColumnChartRow'
import { mockData, mockTooltipCallbackFn } from './columnChartMockData'

const CubeColumnChartDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

type CubeColumnChartStoryArgs = CubeColumnChartProps<CubeColumnChartBaseData>

const meta: Meta<CubeColumnChartStoryArgs> = {
  title: 'Organisms/Chart/Column Chart',
  component: CubeColumnChart as ComponentType<CubeColumnChartStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A bar chart (Chart.js) with the value above each bar. Hovering a bar dims the others; bars can be clicked. Its colors come from the active theme (`--cube-color-*`), so it follows `CubeThemeProvider` or any `data-cube-theme` ancestor.',
      },
      page: CubeColumnChartDocs,
    },
  },
  argTypes: {
    isLoading: {
      description: 'Shows a skeleton instead of the chart.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    data: {
      description: 'One bar per item. An empty array shows "No Data".',
      table: {
        type: {
          summary: 'T[] (T extends CubeColumnChartBaseData)',
          detail: '{ id: string; label: string; value: number }[]',
        },
      },
      control: 'object',
    },
    yAxisTitle: {
      description: 'Title of the y axis.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    tooltipCallbackFn: {
      description:
        'Returns Chart.js tooltip callbacks, for example a custom title or label.',
      table: { type: { summary: "() => TooltipCallbacks<'bar'>" } },
      control: { disable: true },
    },
    onBarClick: {
      description: 'Called with the clicked item.',
      table: { type: { summary: '(bar: T) => void' } },
      control: { disable: true },
    },
    onBarHover: {
      description:
        'Called with the hovered item, on every pointer move over a bar.',
      table: { type: { summary: '(data: T) => void' } },
      control: { disable: true },
    },
    onEmptyHover: {
      description: 'Called on every pointer move outside the bars.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeColumnChartStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[720px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    isLoading: false,
    data: mockData,
    yAxisTitle: 'Number of occurrences',
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
    <StoryLayout title="Column Chart">
      <StoryLayout.Section title="States">
        <div className="flex flex-col gap-y-10">
          <ColumnChartRow title="Default">
            <CubeColumnChart
              data={mockData}
              yAxisTitle="Number of occurrences"
            />
          </ColumnChartRow>
          <ColumnChartRow title="Without data">
            <CubeColumnChart data={[]} yAxisTitle="Number of occurrences" />
          </ColumnChartRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layouts">
        <ColumnChartRow title="w/Custom tooltip">
          <CubeColumnChart
            data={mockData}
            yAxisTitle="Number of occurrences"
            tooltipCallbackFn={mockTooltipCallbackFn}
          />
        </ColumnChartRow>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <ColumnChartRow title="Default">
          <CubeColumnChart
            isLoading
            data={mockData}
            yAxisTitle="Number of occurrences"
          />
        </ColumnChartRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
