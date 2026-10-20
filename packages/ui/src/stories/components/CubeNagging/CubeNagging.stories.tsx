import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { fn } from 'storybook/test'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeNagging } from '@components/CubeNagging/CubeNagging'
import {
  cubeNaggingTypes,
  cubeNaggingVariants,
  type CubeNaggingLink,
  type CubeNaggingType,
  type CubeNaggingVariant,
} from '@components/CubeNagging/cubeNaggingTypes'
import { NaggingRow, NaggingVariantRow } from './NaggingTable'
import { naggingContent } from './mockData'

const CubeNaggingDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// One-to-one with CubeNaggingProps. The props are a union on `variant`, so
// `onClose` is listed here but only passed through for `variant: 'top'`.
type CubeNaggingStoryArgs = {
  type: CubeNaggingType
  variant: CubeNaggingVariant
  title: string
  titleClassName?: string
  description?: string | string[]
  link?: CubeNaggingLink
  onClose?: () => void
  className?: string
}

const meta: Meta<CubeNaggingStoryArgs> = {
  title: 'Molecules/Nagging',
  component: CubeNagging as ComponentType<CubeNaggingStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A persistent reminder for critical issues, shown in the sidebar or at the top of the page. Nagging is intrusive, so use it only for critical reminders, and keep the title within 2 lines.',
      },
      page: CubeNaggingDocs,
    },
  },
  argTypes: {
    type: {
      description: 'The severity. Sets the border color and the icon.',
      table: { type: { summary: formatUnionType(cubeNaggingTypes) } },
      control: 'select',
      options: cubeNaggingTypes,
    },
    variant: {
      description:
        'Where the nagging is placed. `sidebar` shows the link below the description; `top` shows it next to the title and can show a close button.',
      table: { type: { summary: formatUnionType(cubeNaggingVariants) } },
      control: 'select',
      options: cubeNaggingVariants,
    },
    title: {
      description: 'The nagging title.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    titleClassName: {
      description: 'Additional classes merged onto the title.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    description: {
      description:
        'Text below the title. An array with more than one item renders as a bulleted list.',
      table: { type: { summary: 'string | string[]' } },
      control: 'object',
    },
    link: {
      description: 'A call-to-action link.',
      table: {
        type: {
          summary: 'CubeNaggingLink',
          detail:
            '{ text: string; href?: string; onClick?: (e: MouseEvent<HTMLElement>) => void }',
        },
      },
      control: 'object',
    },
    onClose: {
      description:
        'Shows a close icon and is called when it is clicked. Only for `variant: "top"`.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    className: {
      description: 'Additional classes merged onto the nagging container.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeNaggingStoryArgs>

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
    type: 'error',
    variant: 'top',
    title: naggingContent.title,
    description: naggingContent.description,
    link: { text: 'Call to action', href: '/#nagging' },
    onClose: fn(),
  },
  render: ({ variant, onClose, ...args }) =>
    variant === 'top' ? (
      <CubeNagging {...args} variant="top" onClose={onClose} />
    ) : (
      <div className="w-[200px]">
        <CubeNagging {...args} variant="sidebar" />
      </div>
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
  render: function Render() {
    const { title, longTitle, longerTitle, description, multilineDescription } =
      naggingContent

    return (
      <StoryLayout title="Nagging">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-8">
            {cubeNaggingVariants.map((variant) => (
              <NaggingVariantRow key={variant} variant={variant}>
                {variant === 'sidebar' ? (
                  <CubeNagging type="error" variant="sidebar" title={title} />
                ) : (
                  <CubeNagging type="error" variant="top" title={title} />
                )}
              </NaggingVariantRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Types">
          <div className="flex flex-col gap-y-8">
            <NaggingRow.Header />
            {cubeNaggingTypes.map((type) => (
              <NaggingRow
                key={type}
                title={type}
                type={type}
                naggingTitle={title}
                description={description}
              />
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-8">
            <NaggingRow.Header />
            <NaggingRow
              title="w/Link"
              type="error"
              naggingTitle={title}
              description={description}
              hasLink
            />
            <NaggingRow
              title="Multi-line title"
              type="error"
              naggingTitle={{ sidebar: longTitle, top: longerTitle }}
              description={description}
            />
            <NaggingRow
              title="Multiple descriptions"
              type="error"
              naggingTitle={title}
              description={multilineDescription}
            />
            <NaggingRow
              title="w/Close Button"
              type="error"
              naggingTitle={title}
              description={description}
              isClosable
            />
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
