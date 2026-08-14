import type { AnchorHTMLAttributes, ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { formatUnionType } from '@internals/utils/formatType'
import { CubeHyperlink } from '@components/CubeHyperlink/CubeHyperlink'
import {
  cubeHyperlinkColors,
  cubeHyperlinkSizes,
  cubeHyperlinkVariants,
  type CubeHyperlinkColor,
  type CubeHyperlinkSize,
  type CubeHyperlinkVariant,
} from '@components/CubeHyperlink/cubeHyperlinkTypes'
import type { SvgComponent } from '@components/CubeIcon/cubeIconTypes'
import { MonochromeHome01 } from '@icons'
import { SubHeading } from '@internals/components/SubHeading'
import {
  ColorHeading,
  HyperlinkSizeRow,
  hyperlinkText,
  hyperlinkHref,
} from './HyperlinkSizeRow'

const CubeHyperlinkDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// Flattened args for Storybook: Icon stays available for every variant so
// the playground can switch between text and icon variants.
type CubeHyperlinkStoryArgs = {
  children?: string
  color?: CubeHyperlinkColor
  size?: CubeHyperlinkSize
  variant?: CubeHyperlinkVariant
  disabled?: boolean
  href?: string
  Icon?: SvgComponent
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
}

const anchorTargetOptions = ['_self', '_blank', '_parent', '_top'] as const

const meta: Meta<CubeHyperlinkStoryArgs> = {
  title: 'Atoms/Hyperlink',
  component: CubeHyperlink as ComponentType<CubeHyperlinkStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Hyperlinks let users navigate to another page or resource. They can be text-only or paired with a leading or trailing icon.',
      },
      page: CubeHyperlinkDocs,
    },
  },
  argTypes: {
    children: {
      description: 'The text content of the hyperlink.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    color: {
      description: 'The color of the hyperlink.',
      table: { type: { summary: formatUnionType(cubeHyperlinkColors) } },
      defaultValue: { summary: 'primary' },
      control: 'select',
      options: cubeHyperlinkColors,
    },
    size: {
      description: 'The size of the hyperlink.',
      table: { type: { summary: formatUnionType(cubeHyperlinkSizes) } },
      defaultValue: { summary: 'md' },
      control: 'select',
      options: cubeHyperlinkSizes,
    },
    variant: {
      description: 'The variant of the hyperlink.',
      table: { type: { summary: formatUnionType(cubeHyperlinkVariants) } },
      defaultValue: { summary: 'text-only' },
      control: 'select',
      options: cubeHyperlinkVariants,
    },
    disabled: {
      description: 'Whether the hyperlink is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    href: {
      description:
        'The destination URL. Either href or onClick must be provided to make the hyperlink interactive.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    Icon: {
      description: "Required when variant is 'icon-left' or 'icon-right'.",
      table: { type: { summary: 'SvgComponent' } },
      control: { disable: true },
    },
    target: {
      description: 'The target attribute of the hyperlink.',
      table: { type: { summary: formatUnionType(anchorTargetOptions) } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeHyperlinkStoryArgs>

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
    children: 'Call to action',
    color: 'primary',
    size: 'md',
    variant: 'text-only',
    disabled: false,
    href: hyperlinkHref,
    Icon: MonochromeHome01,
  },
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
      <StoryLayout title="Hyperlink">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            <div className="flex items-center gap-x-10">
              <SubHeading className="w-10 shrink-0">MD</SubHeading>
              <CubeHyperlink
                color="primary"
                size="md"
                variant="text-only"
                href={hyperlinkHref}
              >
                {hyperlinkText}
              </CubeHyperlink>
            </div>
            <div className="flex items-center gap-x-10">
              <SubHeading className="w-10 shrink-0">SM</SubHeading>
              <CubeHyperlink
                color="primary"
                size="sm"
                variant="text-only"
                href={hyperlinkHref}
              >
                {hyperlinkText}
              </CubeHyperlink>
            </div>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="grid w-fit grid-cols-[auto_auto_auto] items-start gap-12">
            <span />
            <ColorHeading>Primary</ColorHeading>
            <ColorHeading>Secondary</ColorHeading>
            <HyperlinkSizeRow
              sizeText="MD"
              size="md"
              showVariantHeader={true}
            />
            <HyperlinkSizeRow
              sizeText="SM"
              size="sm"
              showVariantHeader={false}
            />
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
