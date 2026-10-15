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
  CubeMessage,
  type CubeMessageProps,
} from '@components/CubeMessage/CubeMessage'
import { MessageRow } from './MessageRow'

const CubeMessageDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const title = '%Variable%'
const content = 'Message content'
const time = 'YYYY/MM/DD 00:00:00'

const meta: Meta<CubeMessageProps> = {
  title: 'Molecules/Message',
  component: CubeMessage,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A highlighted message line with a title and content, optionally with a tag and a header showing a label and a time.',
      },
      page: CubeMessageDocs,
    },
  },
  argTypes: {
    label: {
      description:
        'Header label shown above the message. The header renders when `label` or `time` is set.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    time: {
      description:
        'Time shown at the right of the header, prefixed with `Time: `.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    tag: {
      description:
        'Tag text shown before the title, as a primary `CubeIconText`.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    title: {
      description: 'The highlighted title, shown before the content.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'The message content.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeMessageProps>

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
    label: 'Label',
    time,
    tag: 'Tag',
    title,
    children: content,
  },
  render: (args) => <CubeMessage {...args} />,
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
      <StoryLayout title="Message">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <MessageRow title="Default">
              <CubeMessage title={title}>{content}</CubeMessage>
            </MessageRow>
            <MessageRow title="w/Tag">
              <CubeMessage title={title} tag="Tag">
                {content}
              </CubeMessage>
            </MessageRow>
            <MessageRow title="w/Label">
              <CubeMessage label="Label" title={title} tag="Tag">
                {content}
              </CubeMessage>
            </MessageRow>
            <MessageRow title="w/Time">
              <CubeMessage label="Label" time={time} title={title} tag="Tag">
                {content}
              </CubeMessage>
            </MessageRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
