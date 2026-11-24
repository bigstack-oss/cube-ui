import { useState, type ComponentType, type ReactElement } from 'react'
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
import { CubeButton } from '@components/CubeButton'
import { CubeCollapsiblePanelLayout } from '@components/CubeCollapsiblePanelLayout/CubeCollapsiblePanelLayout'
import type { CubeCollapsiblePanelLayoutProps } from '@components/CubeCollapsiblePanelLayout/cubeCollapsiblePanelLayoutTypes'
import { PanelLayoutRow } from './PanelLayoutRow'

const CubeCollapsiblePanelLayoutDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeCollapsiblePanelLayout</Subheading>
      <Controls
        include={[
          'defaultPanelOpen',
          'isControlledPanelOpen',
          'onControlledPanelOpenChange',
          'rightPanelWidthPercentage',
          'children',
        ]}
      />
      <Subheading>CubeCollapsiblePanelLayout.LeftPanel</Subheading>
      <Controls
        include={['topic', 'leftSlot', 'rightSlot', 'customToggleButton']}
      />
      <Subheading>CubeCollapsiblePanelLayout.RightPanel</Subheading>
      <Controls include={['className']} />
    </>
  )
}

// Layout and panel props share one Playground, but each name is a real prop:
// the first group on CubeCollapsiblePanelLayout, then LeftPanel. RightPanel's
// `topic`, `leftSlot`, `rightSlot` and `children` share names with LeftPanel's
// (or the layout's), so only its `className` is listed.
type CubeCollapsiblePanelLayoutStoryArgs = {
  defaultPanelOpen?: boolean
  isControlledPanelOpen?: unknown
  onControlledPanelOpenChange?: unknown
  rightPanelWidthPercentage?: number
  children?: unknown
  topic?: string
  leftSlot?: unknown
  rightSlot?: unknown
  customToggleButton?: unknown
  className?: unknown
}

const meta: Meta<CubeCollapsiblePanelLayoutStoryArgs> = {
  title: 'Organisms/Collapsible Panel Layout',
  component:
    CubeCollapsiblePanelLayout as ComponentType<CubeCollapsiblePanelLayoutStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A main panel with a side panel that opens and closes. The left panel has a toggle button (an info icon by default) and the right panel a close button. The open state can be uncontrolled (`defaultPanelOpen`) or controlled (`isControlledPanelOpen` with `onControlledPanelOpenChange`).',
      },
      page: CubeCollapsiblePanelLayoutDocs,
    },
  },
  argTypes: {
    defaultPanelOpen: {
      description: 'Whether the right panel starts open (uncontrolled).',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'true' },
      control: 'boolean',
    },
    isControlledPanelOpen: {
      description:
        'Controls whether the right panel is open. Use with `onControlledPanelOpenChange`.',
      table: { type: { summary: 'boolean' } },
      control: { disable: true },
    },
    onControlledPanelOpenChange: {
      description:
        'Called with the next open state when the panel is toggled or closed, if controlled.',
      table: { type: { summary: '(open: boolean) => void' } },
      control: { disable: true },
    },
    rightPanelWidthPercentage: {
      description: 'Width of the right panel as a percentage (0-100).',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '50' },
      control: { type: 'range', min: 0, max: 100, step: 5 },
    },
    children: {
      description:
        'Exactly a `CubeCollapsiblePanelLayout.LeftPanel` followed by a `CubeCollapsiblePanelLayout.RightPanel`.',
      table: { type: { summary: '[LeftPanel, RightPanel]' } },
      control: { disable: true },
    },
    topic: {
      description: 'The panel heading.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    leftSlot: {
      description: 'Content next to the topic.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    rightSlot: {
      description: 'Content before the toggle (or close) button.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    customToggleButton: {
      description:
        'Replaces the default info-icon toggle; its own `onClick` still runs.',
      table: {
        type: { summary: 'ReactElement<{ onClick?: MouseEventHandler }>' },
      },
      control: { disable: true },
    },
    className: {
      description: 'Additional classes merged onto the right panel container.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeCollapsiblePanelLayoutStoryArgs>

type ExampleProps = Omit<CubeCollapsiblePanelLayoutProps, 'children'> & {
  leftTopic?: string
  customToggleButton?: ReactElement<{ onClick?: () => void }>
}

const PanelLayoutExample = (props: ExampleProps) => {
  const { leftTopic = 'Left Panel', customToggleButton, ...layoutProps } = props

  return (
    <CubeCollapsiblePanelLayout {...layoutProps}>
      <CubeCollapsiblePanelLayout.LeftPanel
        topic={leftTopic}
        customToggleButton={customToggleButton}
      >
        Content
      </CubeCollapsiblePanelLayout.LeftPanel>
      <CubeCollapsiblePanelLayout.RightPanel topic="Right Panel">
        Content
      </CubeCollapsiblePanelLayout.RightPanel>
    </CubeCollapsiblePanelLayout>
  )
}

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-full bg-scene-background p-6">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    defaultPanelOpen: true,
    rightPanelWidthPercentage: 50,
    topic: 'Left Panel',
  },
  render: ({ defaultPanelOpen, rightPanelWidthPercentage, topic }) => (
    <PanelLayoutExample
      // `defaultPanelOpen` only applies on mount, so remount when it changes.
      key={String(defaultPanelOpen)}
      defaultPanelOpen={defaultPanelOpen}
      rightPanelWidthPercentage={rightPanelWidthPercentage}
      leftTopic={topic}
    />
  ),
}

const ControlledExample = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PanelLayoutExample
      isControlledPanelOpen={isOpen}
      onControlledPanelOpenChange={setIsOpen}
    />
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
      <StoryLayout title="Collapsible Panel Layout" useSceneBgColor>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-10">
            <PanelLayoutRow title="Default" description="Uncontrolled, open">
              <PanelLayoutExample />
            </PanelLayoutRow>
            <PanelLayoutRow
              title="Closed"
              description="Uncontrolled, defaultPanelOpen false"
            >
              <PanelLayoutExample defaultPanelOpen={false} />
            </PanelLayoutRow>
            <PanelLayoutRow
              title="Controlled"
              description="isControlledPanelOpen starts false"
            >
              <ControlledExample />
            </PanelLayoutRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-10">
            <PanelLayoutRow title="w/Custom toggle button">
              <PanelLayoutExample
                customToggleButton={<CubeButton>Toggle Me!</CubeButton>}
              />
            </PanelLayoutRow>
            <PanelLayoutRow title="Right panel at 30% width">
              <PanelLayoutExample rightPanelWidthPercentage={30} />
            </PanelLayoutRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
