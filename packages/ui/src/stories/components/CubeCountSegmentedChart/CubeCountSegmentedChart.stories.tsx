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
import { CubeCountSegmentedChart } from '@components/CubeCountSegmentedChart/CubeCountSegmentedChart'
import type { CubeCountSegmentedChartProps } from '@components/CubeCountSegmentedChart/cubeCountSegmentedChartTypes'
import { CountSegmentedChartRow } from './CountSegmentedChartRow'
import {
  roleSummary,
  vmSummary,
  vmTotalCount,
} from './countSegmentedChartMockData'

const CubeCountSegmentedChartDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

const vmSubtext = `${vmTotalCount} Instances`

const meta: Meta<CubeCountSegmentedChartProps> = {
  title: 'Organisms/Chart/Count Segmented Chart',
  component:
    CubeCountSegmentedChart as ComponentType<CubeCountSegmentedChartProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A rounded segmented bar split by counts, with each count (and its color dot) listed below. An optional title, subtext and overview (a total shown first) sit around it.',
      },
      page: CubeCountSegmentedChartDocs,
    },
  },
  argTypes: {
    title: {
      description: 'Title above the bar.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    subtext: {
      description: 'Text next to the title; a skeleton while loading.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    overview: {
      description: 'A total shown first in the counts, without a color dot.',
      table: {
        type: {
          summary: 'CubeCountSegmentedChartOverview',
          detail: '{ name: string; count: number }',
        },
      },
      control: 'object',
    },
    countInfos: {
      description:
        'One bar segment and one count per item. Zero counts get no segment.',
      table: {
        type: {
          summary: 'CubeCountSegmentedChartCountInfo[]',
          detail: '{ name: string; count: number; color: FillColorClass }[]',
        },
      },
      control: 'object',
    },
    isLoading: {
      description: 'Shows skeletons for the subtext, bar and counts.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    skeletonCount: {
      description: 'Number of count placeholders while loading.',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '5' },
      control: { type: 'number', min: 1, max: 10 },
    },
  },
}

export default meta

type Story = StoryObj<CubeCountSegmentedChartProps>

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
    title: 'VM Status',
    subtext: vmSubtext,
    overview: { name: 'Total VM', count: vmTotalCount },
    countInfos: vmSummary,
    isLoading: false,
    skeletonCount: 5,
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
    <StoryLayout title="Count Segmented Chart">
      <StoryLayout.Section title="Layouts">
        <div className="flex flex-col gap-y-10">
          <CountSegmentedChartRow title="Default">
            <CubeCountSegmentedChart countInfos={vmSummary} />
            <CubeCountSegmentedChart countInfos={roleSummary} />
          </CountSegmentedChartRow>
          <CountSegmentedChartRow title="w/Title, subtext and overview">
            <CubeCountSegmentedChart
              title="VM Status"
              subtext={vmSubtext}
              overview={{ name: 'Total VM', count: vmTotalCount }}
              countInfos={vmSummary}
            />
            <CubeCountSegmentedChart
              title="Role Distribution"
              subtext="2 Roles"
              overview={{ name: 'Control-convergerd', count: 2 }}
              countInfos={roleSummary}
            />
          </CountSegmentedChartRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-10">
          <CountSegmentedChartRow title="Default">
            <CubeCountSegmentedChart isLoading countInfos={[]} />
            <CubeCountSegmentedChart
              isLoading
              skeletonCount={3}
              countInfos={[]}
            />
          </CountSegmentedChartRow>
          <CountSegmentedChartRow title="w/Title">
            <CubeCountSegmentedChart
              title="VM Status"
              isLoading
              countInfos={[]}
            />
            <CubeCountSegmentedChart
              title="Role Distribution"
              isLoading
              skeletonCount={3}
              countInfos={[]}
            />
          </CountSegmentedChartRow>
          <CountSegmentedChartRow title="w/Title and subtext">
            <CubeCountSegmentedChart
              title="VM Status"
              subtext={vmSubtext}
              isLoading
              countInfos={[]}
            />
            <CubeCountSegmentedChart
              title="Role Distribution"
              subtext="2 Roles"
              isLoading
              skeletonCount={3}
              countInfos={[]}
            />
          </CountSegmentedChartRow>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
