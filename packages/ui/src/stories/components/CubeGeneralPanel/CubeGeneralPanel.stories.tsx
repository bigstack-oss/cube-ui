import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeGeneralPanel } from '@components/CubeGeneralPanel/CubeGeneralPanel'
import type { CubeGeneralPanelProps } from '@components/CubeGeneralPanel/cubeGeneralPanelTypes'
import { PanelButton, PanelDropdown, PanelIcon } from './PanelMocks'
import { PanelRow } from './PanelRow'

const CubeGeneralPanelDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// `children` is a ReactNode, shown as plain text in the Playground.
type CubeGeneralPanelStoryArgs = Omit<CubeGeneralPanelProps, 'children'> & {
  children?: string
}

const meta: Meta<CubeGeneralPanelStoryArgs> = {
  title: 'Organisms/Panel/General Panel',
  component: CubeGeneralPanel,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A white panel with an optional topic, slots for actions, subtext and content, and an optional title bar above it (title, link, time, dropdown). To share one title bar across several panels, wrap them in `CubeGeneralPanel.Container` with a `CubeGeneralPanel.TitleBar`.',
      },
      page: CubeGeneralPanelDocs,
    },
  },
  argTypes: {
    topic: {
      description: 'The panel heading.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    subtext: {
      description: 'Text below the heading.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    leftSlot: {
      description: 'Content next to the topic, e.g. a button.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    rightSlot: {
      description:
        'Content at the right of the header, e.g. icons or dropdowns.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
    titleBarProps: {
      description: 'Shows a title bar above the panel.',
      table: {
        type: {
          summary: 'CubeGeneralPanelTitleBarProps',
          detail:
            '{ title?: string; time?: string; isTimeLoading?: boolean; dropdown?: ReactNode; hyperLinkProps?: { href?, disabled?, target?, onClick?, children } }',
        },
      },
      control: 'object',
    },
    children: {
      description: 'The panel content.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
    className: {
      description: 'Additional classes merged onto the panel.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    containerClassName: {
      description:
        'Additional classes merged onto the container that holds the title bar and the panel.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeGeneralPanelStoryArgs>

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
    topic: 'Topic Name',
    subtext: 'Subtext',
    titleBarProps: { title: 'Panel Title', time: 'yyyy/mm/dd 00:00' },
    children: 'Content Text',
  },
  render: (args) => <CubeGeneralPanel {...args} />,
}

const Section = (props: { title: string; children: ReactNode }) => (
  <StoryLayout.Section title={props.title}>
    <div className="flex flex-col gap-y-10">{props.children}</div>
  </StoryLayout.Section>
)

const fullHeader = {
  topic: 'Topic Name',
  leftSlot: <PanelButton />,
  subtext: 'Subtext',
}

const iconAndDropdown = (
  <>
    <PanelIcon />
    <PanelDropdown />
  </>
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
      <StoryLayout title="General Panel" useSceneBgColor>
        <Section title="Layouts">
          <PanelRow title="Default">
            <CubeGeneralPanel>Content Text</CubeGeneralPanel>
          </PanelRow>
          <PanelRow title="w/Topic">
            <CubeGeneralPanel topic="Topic Name">Content Text</CubeGeneralPanel>
          </PanelRow>
          <PanelRow title="w/Slots and subtext">
            <CubeGeneralPanel {...fullHeader} rightSlot={iconAndDropdown}>
              Content Text
            </CubeGeneralPanel>
          </PanelRow>
          <PanelRow title="w/Title bar">
            <CubeGeneralPanel
              {...fullHeader}
              rightSlot={iconAndDropdown}
              titleBarProps={{ title: 'Panel Title' }}
            >
              Content Text
            </CubeGeneralPanel>
          </PanelRow>
          <PanelRow title="w/Title bar dropdown">
            <CubeGeneralPanel
              {...fullHeader}
              rightSlot={iconAndDropdown}
              titleBarProps={{
                title: 'Panel Title',
                dropdown: <PanelDropdown />,
              }}
            >
              Content Text
            </CubeGeneralPanel>
          </PanelRow>
          <PanelRow title="w/Title bar time, link and dropdown">
            <CubeGeneralPanel
              {...fullHeader}
              rightSlot={iconAndDropdown}
              titleBarProps={{
                title: 'Panel Title',
                time: 'yyyy/mm/dd 00:00',
                dropdown: <PanelDropdown />,
                hyperLinkProps: {
                  children: 'Call to action',
                  onClick: () => {},
                },
              }}
            >
              Content Text
            </CubeGeneralPanel>
          </PanelRow>
          <PanelRow title="Multiple dropdowns">
            <CubeGeneralPanel
              {...fullHeader}
              rightSlot={
                <>
                  <PanelIcon />
                  <PanelDropdown />
                  <PanelDropdown />
                </>
              }
              titleBarProps={{
                title: 'Panel Title',
                time: 'yyyy/mm/dd 00:00',
                dropdown: <PanelDropdown />,
              }}
            >
              Content Text
            </CubeGeneralPanel>
          </PanelRow>
        </Section>
        <Section title="Multi Panel">
          <PanelRow title="Side by side">
            <div className="flex items-stretch gap-x-3 [&>*]:flex-1">
              <CubeGeneralPanel
                {...fullHeader}
                rightSlot={<PanelIcon />}
                titleBarProps={{
                  title: 'Panel Title',
                  dropdown: <PanelDropdown />,
                }}
              >
                Content Text
              </CubeGeneralPanel>
              <CubeGeneralPanel
                topic="Topic Name"
                rightSlot={<PanelIcon />}
                titleBarProps={{
                  title: 'Panel Title',
                  dropdown: <PanelDropdown />,
                }}
              >
                Content Text
              </CubeGeneralPanel>
            </div>
          </PanelRow>
          <PanelRow title="Shared title bar (Container + TitleBar)">
            <CubeGeneralPanel.Container>
              <CubeGeneralPanel.TitleBar
                title="Panel Title"
                dropdown={<PanelDropdown />}
              />
              <div className="flex items-stretch gap-x-3 [&>*]:flex-1">
                <CubeGeneralPanel {...fullHeader} rightSlot={<PanelIcon />}>
                  Content Text
                </CubeGeneralPanel>
                <CubeGeneralPanel topic="Topic Name" rightSlot={<PanelIcon />}>
                  Content Text
                </CubeGeneralPanel>
              </div>
            </CubeGeneralPanel.Container>
          </PanelRow>
          <PanelRow title="Without title bar">
            <div className="flex gap-x-3 [&>*]:flex-1">
              <CubeGeneralPanel topic="Topic Name">
                Content Text
              </CubeGeneralPanel>
              <CubeGeneralPanel topic="Topic Name">
                Content Text
              </CubeGeneralPanel>
              <CubeGeneralPanel topic="Topic Name">
                Content Text
              </CubeGeneralPanel>
            </div>
          </PanelRow>
        </Section>
        <Section title="Skeleton">
          <PanelRow title="Time loading">
            <CubeGeneralPanel
              {...fullHeader}
              rightSlot={iconAndDropdown}
              titleBarProps={{
                title: 'Panel Title',
                isTimeLoading: true,
                dropdown: <PanelDropdown />,
              }}
            >
              Content Text
            </CubeGeneralPanel>
          </PanelRow>
        </Section>
      </StoryLayout>
    )
  },
}
