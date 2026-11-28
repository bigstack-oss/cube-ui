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
  CubeLogConsole,
  type CubeLogConsoleProps,
} from '@components/CubeLogConsole/CubeLogConsole'
import { LogConsoleRow } from './LogConsoleRow'

const CubeLogConsoleDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubeLogConsoleProps> = {
  title: 'Molecules/Log Console',
  component: CubeLogConsole,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A dark box that shows text such as a log or script output exactly as written, with a header for an optional title (plain or a link) and a Copy button that copies the text.\n\n**Test IDs:** `data-testid` goes on the console; its parts get `<test-id>-title`, `-copy` and `-log` (the text). See Overview / Test IDs.',
      },
      page: CubeLogConsoleDocs,
    },
  },
  argTypes: {
    title: {
      description:
        'The header title. With `href`, it is a link that opens in a new tab.',
      table: {
        type: { summary: '{ label: string; href?: string }' },
      },
      control: 'object',
    },
    copyTooltip: {
      description: 'The hover tooltip of the Copy button.',
      table: { type: { summary: 'string' } },
      defaultValue: { summary: '"Click to copy details"' },
      control: 'text',
    },
    children: {
      description:
        'The text to show and copy; whitespace and line breaks are kept.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    className: {
      description: 'Additional classes merged onto the container.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    logWrapperClassName: {
      description: 'Additional classes merged onto the dark text box.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeLogConsoleProps>

const logContent = `> Initializing bath sequence...
> Checking water pressure... OK
> Heating water to 40°C... DONE
> Playing ambient music... ✓
> All systems go.

Status: SUCCESS  
Exit Code: 0`

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
    title: { label: 'Title', href: '#' },
    children: logContent,
  },
  render: (args) => <CubeLogConsole {...args} />,
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
      <StoryLayout title="Log Console">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-8">
            <LogConsoleRow title="Default">
              <CubeLogConsole>{logContent}</CubeLogConsole>
            </LogConsoleRow>
            <LogConsoleRow title="w/Title">
              <CubeLogConsole title={{ label: 'Title' }}>
                {logContent}
              </CubeLogConsole>
            </LogConsoleRow>
            <LogConsoleRow title="w/Title link">
              <CubeLogConsole title={{ label: 'Title', href: '#' }}>
                {logContent}
              </CubeLogConsole>
            </LogConsoleRow>
            <LogConsoleRow title="w/Custom copy tooltip">
              <CubeLogConsole
                title={{ label: 'Title', href: '#' }}
                copyTooltip="This is a custom tooltip :)"
              >
                {logContent}
              </CubeLogConsole>
            </LogConsoleRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
