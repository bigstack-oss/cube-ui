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
  CubeInformation,
  type CubeInformationProps,
} from '@components/CubeInformation/CubeInformation'
import { InformationRow } from './InformationRow'

const CubeInformationDocs = () => {
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
type CubeInformationStoryArgs = Omit<CubeInformationProps, 'children'> & {
  children?: string
}

const message =
  'Information that remind user to keep in mind but not a temporarily notification.'

const meta: Meta<CubeInformationStoryArgs> = {
  title: 'Molecules/Information',
  component: CubeInformation,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A light blue note for information users should keep in mind. Unlike a notification, it is not temporary and stays on the page.',
      },
      page: CubeInformationDocs,
    },
  },
  argTypes: {
    showIcon: {
      description: 'Shows the information icon before the content.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    children: {
      description: 'The note content.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeInformationStoryArgs>

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
    showIcon: true,
    children: message,
  },
  render: (args) => <CubeInformation {...args} />,
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
      <StoryLayout title="Information">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-8">
            <InformationRow title="Default">
              <CubeInformation>{message}</CubeInformation>
            </InformationRow>
            <InformationRow title="w/Icon">
              <CubeInformation showIcon>{message}</CubeInformation>
            </InformationRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
