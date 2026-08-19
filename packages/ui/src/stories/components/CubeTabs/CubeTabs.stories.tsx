import type { ComponentType, MouseEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArgTypes,
  Controls,
  Description,
  Primary,
  Subheading,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeTabs } from '@components/CubeTabs/CubeTabs'
import { CubeTab } from '@components/CubeTabs/CubeTab'
import { TabsRow } from './TabsRow'
import { ControlledTabs } from './ControlledTabs'

const CubeTabsDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      {/*
        Playground controls are CubeTab props. CubeTabs only takes
        `children`, so it is listed separately below.
      */}
      <Subheading>CubeTabs.Tab props</Subheading>
      <Controls />
      <Subheading>CubeTabs props</Subheading>
      <ArgTypes of={CubeTabs} />
    </>
  )
}

type CubeTabsStoryArgs = {
  children: string
  isActive: boolean
  disabled?: boolean
  href?: string
  number?: number
  dot?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

const meta: Meta<CubeTabsStoryArgs> = {
  title: 'Molecules/Tabs',
  component: CubeTab as ComponentType<CubeTabsStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Tabs let users switch between related views or sections of content.',
      },
      page: CubeTabsDocs,
    },
  },
  argTypes: {
    children: {
      description: 'The label text displayed on the tab.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    isActive: {
      description: 'Whether this tab is the currently active one.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the tab is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    href: {
      description:
        'An optional link target. Renders the tab as an anchor instead of a span.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    number: {
      description:
        'An optional count badge. Takes precedence over `dot` if both are set. Values over 99 display as N.',
      table: { type: { summary: 'number' } },
      control: 'number',
    },
    dot: {
      description: 'An optional plain dot. Ignored when `number` is set.',
      table: { type: { summary: 'true' } },
      control: 'boolean',
    },
    onClick: {
      description:
        'Called when the tab is clicked. Does not fire while `disabled` is true.',
      table: { type: { summary: '(e: MouseEvent<HTMLElement>) => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeTabsStoryArgs>

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
    children: 'Label 1',
    isActive: true,
    disabled: false,
    href: undefined,
    number: undefined,
    dot: false,
  },
  // Only the first tab reflects the controls above; the other two are
  // static context so a single active/inactive pair stays visible.
  render: ({ children, isActive, disabled, href, number, dot }) => {
    const decorationProps =
      number !== undefined ? { number } : dot ? { dot: true as const } : {}

    return (
      <CubeTabs>
        <CubeTab
          isActive={isActive}
          disabled={disabled}
          href={href}
          {...decorationProps}
        >
          {children}
        </CubeTab>
        <CubeTab isActive={false}>Label 2</CubeTab>
        <CubeTab isActive={false}>Label 3</CubeTab>
      </CubeTabs>
    )
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
  render: function Render() {
    return (
      <StoryLayout title="Tabs">
        <StoryLayout.Section title="Layout">
          <div className="flex flex-col gap-y-6">
            <TabsRow title="Default">
              <ControlledTabs />
            </TabsRow>
            <TabsRow title="Default (disabled)">
              <ControlledTabs disabled />
            </TabsRow>
            <TabsRow title="w/Number">
              <ControlledTabs number />
            </TabsRow>
            <TabsRow title="w/Number (disabled)">
              <ControlledTabs number disabled />
            </TabsRow>
            <TabsRow title="w/Dot">
              <ControlledTabs dot />
            </TabsRow>
            <TabsRow title="w/Dot (disabled)">
              <ControlledTabs dot disabled />
            </TabsRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <TabsRow title="Default">
            <CubeTabs>
              <CubeTabs.Skeleton />
              <CubeTabs.Skeleton />
              <CubeTabs.Skeleton />
              <CubeTabs.Skeleton />
              <CubeTabs.Skeleton />
            </CubeTabs>
          </TabsRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
