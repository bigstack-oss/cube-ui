import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeSideBar } from '@components/CubeSideBar/CubeSideBar'
import type { CubeSideBarProps } from '@components/CubeSideBar/cubeSideBarTypes'
import { SideBarRow } from './SideBarRow'
import {
  mockLinks,
  mockNaggingProps,
  mockRequiredProps,
} from './sideBarMockData'

const CubeSideBarDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

const meta: Meta<CubeSideBarProps> = {
  title: 'Organisms/SideBar',
  component: CubeSideBar as ComponentType<CubeSideBarProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'The app navigation on the left, full height: the CubeCOS logo, the data center and user, an optional nagging, the page options with notification counts, the data center time and time zone, and links.',
      },
      page: CubeSideBarDocs,
    },
  },
  argTypes: {
    isLoading: {
      description:
        'Shows skeletons for the data center, user, version and data center time.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    dataCenter: {
      description: 'The data center; "-" is shown for missing values.',
      table: {
        type: {
          summary: 'CubeSideBarDataCenter | undefined',
          detail: '{ name: string; version: string }',
        },
      },
      control: 'object',
    },
    username: {
      description: 'Shown in a tag next to the data center.',
      table: { type: { summary: 'string | undefined' } },
      control: 'text',
    },
    utcTimeZone: {
      description:
        'The data center UTC offset (for example `"+08:00"`); sets the time and the tag (only hours are shown).',
      table: { type: { summary: 'string | undefined' } },
      control: 'text',
    },
    naggingProps: {
      description:
        'Shows a `CubeNagging` (sidebar variant) below the user info.',
      table: {
        type: {
          summary: "Omit<CubeNaggingProps, 'variant'>",
          detail:
            "{ type: 'error' | 'warning'; title: string; description?: string | string[]; link?: { text; href?; onClick? } }",
        },
      },
      control: 'object',
    },
    options: {
      description:
        'The page options. A count above 99 shows "N"; 0 shows nothing.',
      table: {
        type: {
          summary: 'CubeSideBarComboboxOptionProps[]',
          detail:
            '{ label: string; Icon: SvgComponent; isSelected?: boolean; notificationCount?: number; onClick: () => void }[]',
        },
      },
      control: { disable: true },
    },
    links: {
      description: 'Links at the bottom, opened in a new tab.',
      table: {
        type: {
          summary: 'CubeSideBarBottomLinkProps[]',
          detail: '{ text: string; href: string }[]',
        },
      },
      control: 'object',
    },
    LogoContainer: {
      description:
        'An element (for example a router link) the logo is placed in.',
      table: { type: { summary: 'ReactElement<PropsWithChildren>' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeSideBarProps>

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
    ...mockRequiredProps,
    isLoading: false,
    naggingProps: mockNaggingProps,
    links: mockLinks,
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
  render: () => (
    <StoryLayout title="SideBar" useSceneBgColor>
      <StoryLayout.Section title="States">
        <div className="flex items-start gap-x-10">
          <SideBarRow title="Default">
            <CubeSideBar {...mockRequiredProps} />
          </SideBarRow>
          <SideBarRow title="Loading">
            <CubeSideBar {...mockRequiredProps} isLoading />
          </SideBarRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layouts">
        <div className="flex items-start gap-x-10">
          <SideBarRow title="w/Nagging and links">
            <CubeSideBar
              {...mockRequiredProps}
              naggingProps={mockNaggingProps}
              links={mockLinks}
            />
          </SideBarRow>
          <SideBarRow title="w/Logo link">
            <CubeSideBar
              {...mockRequiredProps}
              LogoContainer={<a href="#" />}
            />
          </SideBarRow>
          <SideBarRow title="Without data">
            <CubeSideBar
              {...mockRequiredProps}
              dataCenter={undefined}
              username={undefined}
              utcTimeZone={undefined}
            />
          </SideBarRow>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
