import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeStackCard } from '@components/CubeStackCard/CubeStackCard'
import type { CubeStackCardProps } from '@components/CubeStackCard/cubeStackCardTypes'
import { CubeTag } from '@components/CubeTag'
import { StackCardRow } from './StackCardRow'

const CubeStackCardDocs = () => {
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
type CubeStackCardStoryArgs = Omit<CubeStackCardProps, 'children'> & {
  children?: string
}

const meta: Meta<CubeStackCardStoryArgs> = {
  title: 'Molecules/Stack Card',
  component: CubeStackCard,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A card with a title, optional subtext and content, marked by a left border in the secondary brand color. Use it on a white background only, not on a grey one.',
      },
      page: CubeStackCardDocs,
    },
  },
  argTypes: {
    title: {
      description: 'The card title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    subtext: {
      description: 'Text shown next to the title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    children: {
      description: 'The card content, e.g. text or tags.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeStackCardStoryArgs>

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
    title: 'Topic Name',
    subtext: 'Subtext',
    children: 'Content Text',
  },
  render: (args) => <CubeStackCard {...args} />,
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
      <StoryLayout title="Stack Card">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-8">
            <StackCardRow title="Default">
              <CubeStackCard title="Topic Name">Content Text</CubeStackCard>
            </StackCardRow>
            <StackCardRow title="w/Subtext">
              <CubeStackCard title="Topic Name" subtext="Subtext">
                Content Text
              </CubeStackCard>
            </StackCardRow>
            <StackCardRow title="w/Tags">
              <CubeStackCard title="Topic Name" subtext="Subtext">
                <div className="flex gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <CubeTag
                      key={index}
                      color="blue"
                      variant="stroke"
                      showCloseButton
                      onClose={() => {}}
                    >
                      Component
                    </CubeTag>
                  ))}
                </div>
              </CubeStackCard>
            </StackCardRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
