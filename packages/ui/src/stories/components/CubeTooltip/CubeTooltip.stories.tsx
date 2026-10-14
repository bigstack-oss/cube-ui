import type { ComponentType, ReactElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { MonochromeInformationCircle } from '@icons'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { formatUnionType } from '@internals/utils/formatType'
import { CubeTooltip } from '@components/CubeTooltip/CubeTooltip'
import {
  cubeTooltipPlacements,
  type CubeTooltipInformation,
  type CubeTooltipPlacement,
} from '@components/CubeTooltip/cubeTooltipTypes'
import { HoverAndClickGrid } from './HoverAndClickGrid'
import { LayoutGrid } from './LayoutGrid'
import { TooltipRow } from './TooltipRow'
import { NestedLayout } from './NestedLayout'
import { PlacementGrid } from './PlacementGrid'

const CubeTooltipDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// Mirror `CubeTooltipProps`' hierarchy: `hoverContent` / `clickContent` stay
// grouped as `CubeTooltipInformation` objects instead of being flattened into
// separate `title` / `subtext` / `message` args.
type CubeTooltipStoryArgs = {
  placement?: CubeTooltipPlacement
  hoverContent?: CubeTooltipInformation
  clickContent?: CubeTooltipInformation
  children?: ReactElement
}

const cubeTooltipInformationDetail =
  '{ title?: string; subtext?: string; message: string }'

const meta: Meta<CubeTooltipStoryArgs> = {
  title: 'Molecules/Tooltip',
  component: CubeTooltip as ComponentType<CubeTooltipStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Tooltips display brief, informative text when users hover over or click an anchor element.',
      },
      page: CubeTooltipDocs,
    },
  },
  argTypes: {
    placement: {
      description:
        'Where the tooltip is placed relative to the anchor. It flips vertically when there is not enough space.',
      table: { type: { summary: formatUnionType(cubeTooltipPlacements) } },
      defaultValue: { summary: 'top-center' },
      control: 'select',
      options: cubeTooltipPlacements,
    },
    hoverContent: {
      description: 'Content shown while the anchor is hovered.',
      table: {
        type: {
          summary: 'CubeTooltipInformation',
          detail: cubeTooltipInformationDetail,
        },
      },
      control: 'object',
    },
    clickContent: {
      description:
        'Content shown after the anchor is clicked, replacing the hover content until the pointer leaves.',
      table: {
        type: {
          summary: 'CubeTooltipInformation',
          detail: cubeTooltipInformationDetail,
        },
      },
      control: 'object',
    },
    children: {
      description: 'The anchor element that toggles the tooltip.',
      table: { type: { summary: 'ReactElement' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeTooltipStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="py-16">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    placement: 'top-center',
    hoverContent: {
      title: 'Title',
      subtext: 'Subtext',
      message: 'Lorem ipsum dolor sit amet',
    },
    clickContent: {
      message: 'You have clicked.',
    },
  },
  render: (args) => (
    <CubeTooltip {...args}>
      <MonochromeInformationCircle className="icon-md cursor-pointer" />
    </CubeTooltip>
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
  render: () => {
    return (
      <StoryLayout title="Tooltip">
        <StoryLayout.Section title="Placements">
          <PlacementGrid />
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-8">
            <LayoutGrid />
            <TooltipRow title="In a Scroll Container">
              <NestedLayout />
            </TooltipRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Hover & Click">
          <HoverAndClickGrid />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
