import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeIconText } from '@components/CubeIconText/CubeIconText'
import {
  cubeIconTextTypes,
  type CubeIconTextType,
} from '@components/CubeIconText/cubeIconTextTypes'
import { IconTextRow } from './IconTextRow'

const CubeIconTextDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

type CubeIconTextStoryArgs = {
  type: CubeIconTextType
  children: string
  className?: string
}

const meta: Meta<CubeIconTextStoryArgs> = {
  title: 'Atoms/Icon Text',
  component: CubeIconText as ComponentType<CubeIconTextStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A small text badge with a colored background, used to label an item inline (for example, a tag in a message).',
      },
      page: CubeIconTextDocs,
    },
  },
  argTypes: {
    type: {
      description: 'The color style of the badge.',
      table: { type: { summary: formatUnionType(cubeIconTextTypes) } },
      control: 'select',
      options: cubeIconTextTypes,
    },
    children: {
      description: 'The badge text.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    className: {
      description: 'Additional classes merged onto the badge.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeIconTextStoryArgs>

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
    type: 'primary',
    children: 'Tag',
  },
  render: (args) => <CubeIconText {...args} />,
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
      <StoryLayout title="Icon Text">
        <StoryLayout.Section title="Types">
          <div className="flex flex-col gap-y-6">
            {cubeIconTextTypes.map((type) => (
              <IconTextRow key={type} title={type}>
                <CubeIconText type={type}>Tag</CubeIconText>
              </IconTextRow>
            ))}
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
