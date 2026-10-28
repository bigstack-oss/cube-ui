import { useState, type ComponentType, type ReactNode } from 'react'
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
  CubeSegmentedBar,
  type CubeSegmentedBarProps,
} from '@components/CubeSegmentedBar/CubeSegmentedBar'
import type { ChildrenDimensions } from '@components/CubeSegmentedBar/cubeSegmentedBarUtils'
import {
  healthHistorySegments,
  healthHistorySegmentsWithHoverContent,
  roleSummarySegments,
  vmSummarySegments,
} from './mockSegments'
import { SegmentedBarRow } from './SegmentedBarRow'

const CubeSegmentedBarDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// The props union (`children` with or without `childrenDimensions`) leaves
// Storybook's args untyped, so the story uses one flat args type.
type CubeSegmentedBarStoryArgs = Omit<
  CubeSegmentedBarProps,
  'children' | 'childrenDimensions'
> & {
  childrenDimensions?: ChildrenDimensions
  children?: (barWidth: number) => ReactNode
}

const meta: Meta<CubeSegmentedBarStoryArgs> = {
  title: 'Atoms/Segmented Bar',
  component: CubeSegmentedBar as ComponentType<CubeSegmentedBarStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "A horizontal bar split into colored segments, each as wide as its share of the total column count. It fills its parent's width unless `width` is set. Segments with no columns are skipped.",
      },
      page: CubeSegmentedBarDocs,
    },
  },
  argTypes: {
    segments: {
      description:
        'The segments, left to right: a fill color class, a column count and optional tooltip content.',
      table: { type: { summary: 'Segment[]' } },
      control: 'object',
    },
    rounded: {
      description: 'Rounds the outer ends of the bar.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    width: {
      description:
        "A fixed width in px, for when the parent's width is unknown (e.g. a table cell). Must be greater than 0.",
      table: { type: { summary: 'number' } },
      control: { type: 'number', min: 1 },
    },
    paddingX: {
      description:
        'Horizontal padding in px, so ticks rendered at either end are not cut off.',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '0' },
      control: 'number',
    },
    barMarginTop: {
      description: 'Space in px above the bar.',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '0' },
      control: 'number',
    },
    childrenDimensions: {
      description:
        'The height and top margin of `children`; required with `children`.',
      table: { type: { summary: 'ChildrenDimensions' } },
      control: { disable: true },
    },
    children: {
      description: 'Renders SVG content below the bar, given the bar width.',
      table: { type: { summary: '(barWidth: number) => ReactNode' } },
      control: { disable: true },
    },
    overlay: {
      description:
        'Renders SVG content over the bar, given the bar width and SVG height.',
      table: {
        type: { summary: '(barWidth: number, svgHeight: number) => ReactNode' },
      },
      control: { disable: true },
    },
    onMouseEnterSegment: {
      description: 'Called with the segment index when the mouse enters it.',
      table: { type: { summary: '(index: number, e: MouseEvent) => void' } },
      control: { disable: true },
    },
    onMouseLeaveSegment: {
      description: 'Called with the segment index when the mouse leaves it.',
      table: { type: { summary: '(index: number, e: MouseEvent) => void' } },
      control: { disable: true },
    },
    className: {
      description: 'Additional classes on the SVG element.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeSegmentedBarStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[480px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    segments: healthHistorySegmentsWithHoverContent,
    rounded: false,
  },
  render: (args) => {
    // The Playground never sets `children`, so the args fit the props.
    const { width, ...rest } = args as CubeSegmentedBarProps

    // "Set number" starts the control at 0, which the component rejects, so
    // the bar keeps its parent's width until the value is positive.
    return (
      <CubeSegmentedBar
        {...rest}
        width={width !== undefined && width > 0 ? width : undefined}
      />
    )
  },
}

const HoverEvents = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>()

  return (
    <div className="flex flex-col gap-y-2">
      <CubeSegmentedBar
        segments={healthHistorySegments}
        onMouseEnterSegment={(index) => setHoveredIndex(index)}
        onMouseLeaveSegment={() => setHoveredIndex(undefined)}
      />
      <span className="primary-body5 text-functional-text-light">
        Hovered segment: {hoveredIndex ?? 'none'}
      </span>
    </div>
  )
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
      <StoryLayout title="Segmented Bar">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <SegmentedBarRow title="Default">
              <CubeSegmentedBar segments={healthHistorySegments} />
            </SegmentedBarRow>
            <SegmentedBarRow title="Fixed width">
              <CubeSegmentedBar segments={healthHistorySegments} width={240} />
            </SegmentedBarRow>
            <SegmentedBarRow title="w/Children">
              <CubeSegmentedBar
                segments={healthHistorySegments}
                childrenDimensions={{ height: 16, marginTop: 4 }}
              >
                {(barWidth) => (
                  <foreignObject width={barWidth} height={16}>
                    <div className="primary-body6 flex items-center justify-between text-functional-text-light">
                      <span>07:00 AM</span>
                      <span>12:34 PM</span>
                      <span>NOW</span>
                    </div>
                  </foreignObject>
                )}
              </CubeSegmentedBar>
            </SegmentedBarRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Segments">
          <div className="flex flex-col gap-y-6">
            <SegmentedBarRow title="VM summary">
              <CubeSegmentedBar segments={vmSummarySegments} />
            </SegmentedBarRow>
            <SegmentedBarRow title="Role summary">
              <CubeSegmentedBar segments={roleSummarySegments} />
            </SegmentedBarRow>
            <SegmentedBarRow title="Health history">
              <CubeSegmentedBar segments={healthHistorySegments} />
            </SegmentedBarRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Rounded">
          <div className="flex flex-col gap-y-6">
            {[false, true].map((rounded) => (
              <SegmentedBarRow key={String(rounded)} title={String(rounded)}>
                <CubeSegmentedBar
                  segments={vmSummarySegments}
                  rounded={rounded}
                />
              </SegmentedBarRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Hover">
          <div className="flex flex-col gap-y-6">
            <SegmentedBarRow title="Tooltip">
              <CubeSegmentedBar
                segments={healthHistorySegmentsWithHoverContent}
              />
            </SegmentedBarRow>
            <SegmentedBarRow title="Events">
              <HoverEvents />
            </SegmentedBarRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <SegmentedBarRow title="Default">
            <CubeSegmentedBar.Skeleton />
          </SegmentedBarRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
