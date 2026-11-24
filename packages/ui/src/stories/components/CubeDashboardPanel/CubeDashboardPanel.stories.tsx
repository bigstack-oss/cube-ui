import type { ComponentType, ReactNode } from 'react'
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
import { CubeDashboardPanel } from '@components/CubeDashboardPanel/CubeDashboardPanel'
import type { CubeDashboardPanelProps } from '@components/CubeDashboardPanel/cubeDashboardPanelTypes'
import { PanelRow } from '../CubeGeneralPanel/PanelRow'
import { EventTable, mockEvents } from './mockEvents'

const CubeDashboardPanelDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeDashboardPanel</Subheading>
      <Controls
        include={[
          'title',
          'errorCount',
          'time',
          'isTimeLoading',
          'hyperLinkProps',
          'HyperLinkContainer',
          'useContentWrapper',
          'className',
          'children',
        ]}
      />
      <Subheading>CubeDashboardPanel.Item</Subheading>
      <Controls include={['topic', 'subtext', 'isSubtextLoading', 'button']} />
    </>
  )
}

// Panel and Item props share one Playground so a full panel stays visible,
// but each name is a real prop: the first group on CubeDashboardPanel, then
// CubeDashboardPanel.Item (applied to its one item). The Item's own
// `children` and `className` are left out because the panel owns those names.
type CubeDashboardPanelStoryArgs = {
  title: string
  errorCount?: number
  time?: string
  isTimeLoading?: boolean
  hyperLinkProps?: { href?: string; disabled?: boolean; target?: string }
  HyperLinkContainer?: unknown
  useContentWrapper?: boolean
  className?: unknown
  children?: unknown
  topic?: string
  subtext?: string
  isSubtextLoading?: boolean
  button?: unknown
}

const meta: Meta<CubeDashboardPanelStoryArgs> = {
  title: 'Organisms/Panel/Dashboard Panel',
  component: CubeDashboardPanel as ComponentType<CubeDashboardPanelStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A dashboard panel with a header (title, error count, time and a View All link) and content items in a bordered box. Arrange `CubeDashboardPanel.Item`s with `CubeDashboardPanel.Row` and `CubeDashboardPanel.Col`, or set `useContentWrapper={false}` for content such as a table.',
      },
      page: CubeDashboardPanelDocs,
    },
  },
  argTypes: {
    title: {
      description: 'The panel title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    errorCount: {
      description: 'Shows the number of errors next to the title when above 0.',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '0' },
      control: { type: 'number', min: 0 },
    },
    time: {
      description: 'A time shown at the right of the header.',
      table: { type: { summary: 'string | null' } },
      control: 'text',
    },
    isTimeLoading: {
      description: 'Shows a skeleton instead of the time.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    hyperLinkProps: {
      description: 'Shows a "View All" link in the header.',
      table: {
        type: {
          summary:
            "Pick<CubeHyperlinkProps, 'href' | 'disabled' | 'target' | 'onClick'>",
        },
      },
      control: 'object',
    },
    HyperLinkContainer: {
      description:
        'An element the link is rendered inside, e.g. a router link wrapper. Needs `hyperLinkProps`.',
      table: { type: { summary: 'ReactElement<PropsWithChildren>' } },
      control: { disable: true },
    },
    useContentWrapper: {
      description:
        'Wraps the content in the bordered content box. Turn off for content with its own frame, such as a table.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'true' },
      control: 'boolean',
    },
    className: {
      description: 'Additional classes merged onto the panel.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    children: {
      description: 'The `CubeDashboardPanel.Item`, `.Row` and `.Col` elements.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    topic: {
      description: 'The item heading.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    subtext: {
      description: 'Text next to the item heading.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    isSubtextLoading: {
      description: 'Shows a skeleton instead of the subtext.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    button: {
      description:
        'A button at the bottom right of the item; the panel makes it a medium primary button.',
      table: { type: { summary: 'ReactElement<CubeButtonProps>' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeDashboardPanelStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[720px] bg-scene-background p-6">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    title: 'Panel Title',
    errorCount: 0,
    time: 'yyyy/mm/dd 00:00',
    isTimeLoading: false,
    hyperLinkProps: { href: '#' },
    useContentWrapper: true,
    topic: 'Topic Name',
    subtext: 'Subtext',
    isSubtextLoading: false,
  },
  render: ({ topic, subtext, isSubtextLoading, ...panelArgs }) => (
    <CubeDashboardPanel {...(panelArgs as CubeDashboardPanelProps)}>
      <CubeDashboardPanel.Item
        topic={topic}
        subtext={subtext}
        isSubtextLoading={isSubtextLoading}
        button={<CubeButton>Call to Action</CubeButton>}
      >
        Content Text
      </CubeDashboardPanel.Item>
    </CubeDashboardPanel>
  ),
}

const Section = (props: { title: string; children: ReactNode }) => (
  <StoryLayout.Section title={props.title}>
    <div className="flex flex-col gap-y-10">{props.children}</div>
  </StoryLayout.Section>
)

// The header most panels in the Gallery share.
const header = {
  title: 'Panel Title',
  time: 'yyyy/mm/dd 00:00',
  hyperLinkProps: { onClick: () => {} },
} as const

const Item = (props: { button?: boolean; className?: string }) => (
  <CubeDashboardPanel.Item
    className={props.className}
    topic="Topic Name"
    subtext="Subtext"
    button={props.button ? <CubeButton>Call to Action</CubeButton> : undefined}
  >
    Content Text
  </CubeDashboardPanel.Item>
)

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
      <StoryLayout title="Dashboard Panel" useSceneBgColor>
        <Section title="States">
          <PanelRow title="Default">
            <CubeDashboardPanel title="Panel Title">
              <Item />
            </CubeDashboardPanel>
          </PanelRow>
          {[1, 2].map((errorCount) => (
            <PanelRow
              key={errorCount}
              title={`w/${errorCount} error${errorCount > 1 ? 's' : ''}`}
            >
              <CubeDashboardPanel {...header} errorCount={errorCount}>
                <Item button />
              </CubeDashboardPanel>
            </PanelRow>
          ))}
        </Section>
        <Section title="Layouts">
          <PanelRow title="w/Time, link and button">
            <CubeDashboardPanel {...header}>
              <Item button />
            </CubeDashboardPanel>
          </PanelRow>
          <PanelRow title="Items stacked">
            <CubeDashboardPanel {...header}>
              <Item />
              <Item />
            </CubeDashboardPanel>
          </PanelRow>
          <PanelRow title="Items side by side (Row)">
            <CubeDashboardPanel {...header}>
              <CubeDashboardPanel.Row className="[&>*]:flex-1">
                <Item />
                <Item />
              </CubeDashboardPanel.Row>
            </CubeDashboardPanel>
          </PanelRow>
          <PanelRow title="Row with a column (Row + Col)">
            <CubeDashboardPanel {...header}>
              <CubeDashboardPanel.Row>
                <CubeDashboardPanel.Col>
                  <Item />
                  <Item />
                </CubeDashboardPanel.Col>
                <Item button className="w-[460px]" />
              </CubeDashboardPanel.Row>
            </CubeDashboardPanel>
          </PanelRow>
          <PanelRow title="Row, then an item">
            <CubeDashboardPanel {...header}>
              <CubeDashboardPanel.Row className="[&>*]:flex-1">
                <Item />
                <Item />
              </CubeDashboardPanel.Row>
              <Item button />
            </CubeDashboardPanel>
          </PanelRow>
          <PanelRow title="Without content box (table)">
            <CubeDashboardPanel
              {...header}
              title="Events"
              useContentWrapper={false}
            >
              <EventTable rows={mockEvents}>
                <EventTable.Column property="type" label="Type" />
                <EventTable.Column
                  property="eventId"
                  label="Event ID"
                  emphasize
                />
                <EventTable.Column property="description" label="Description" />
                <EventTable.Column property="host" label="Host" />
                <EventTable.Column property="category" label="Category" />
                <EventTable.Column property="service" label="Service" />
                <EventTable.Column property="metadata" label="Metadata" />
                <EventTable.Column property="time" label="Time" />
              </EventTable>
            </CubeDashboardPanel>
          </PanelRow>
        </Section>
        <Section title="Multi Panel">
          <PanelRow title="Side by side">
            <div className="flex gap-x-3">
              <CubeDashboardPanel {...header}>
                <Item button />
              </CubeDashboardPanel>
              <CubeDashboardPanel {...header}>
                <Item button />
              </CubeDashboardPanel>
            </div>
          </PanelRow>
          <PanelRow title="Stacked">
            <div className="flex flex-col gap-y-3">
              <CubeDashboardPanel {...header}>
                <Item button />
              </CubeDashboardPanel>
              <CubeDashboardPanel {...header}>
                <Item button />
              </CubeDashboardPanel>
            </div>
          </PanelRow>
        </Section>
        <Section title="Skeleton">
          <PanelRow title="Time and subtext loading">
            <CubeDashboardPanel {...header} time="" isTimeLoading>
              <CubeDashboardPanel.Item
                topic="Topic Name"
                subtext=""
                isSubtextLoading
                button={<CubeButton>Call to Action</CubeButton>}
              >
                Content Text
              </CubeDashboardPanel.Item>
            </CubeDashboardPanel>
          </PanelRow>
        </Section>
      </StoryLayout>
    )
  },
}
