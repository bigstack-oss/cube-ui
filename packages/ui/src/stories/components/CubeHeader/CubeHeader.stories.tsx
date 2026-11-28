import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { useArgs } from 'storybook/preview-api'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeHeader } from '@components/CubeHeader/CubeHeader'
import type {
  CubeHeaderFunctionBarItem,
  CubeHeaderProps,
} from '@components/CubeHeader/cubeHeaderTypes'
import { HeaderRow } from './HeaderRow'
import {
  makeLanguageOptions,
  mockFunctionBarItems,
  mockNotificationLinkItems,
  mockQuickAccesses,
} from './headerMockData'

const CubeHeaderDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

const meta: Meta<CubeHeaderProps> = {
  title: 'Organisms/Header',
  component: CubeHeader as ComponentType<CubeHeaderProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'The top bar of the app, aligned right: quick access links to integrated services (opened in a new tab), a language dropdown, and function buttons such as notifications and logout. Every icon button shows its `hoverMessage` as a tooltip and uses it as its accessible name.\n\n**Test IDs:** `data-testid` goes on the header; its parts get `<test-id>-quick-access` (the link, with `data-key`), `-action` (a function button, with `data-key`) and `-language` (the language dropdown, so also `-language-trigger`, `-language-menu` and `-language-option`, keyed by the option `value`). A `data-key` is the `hoverMessage` unless the item passes one, which is worth doing since it is translated. See Overview / Test IDs.',
      },
      page: CubeHeaderDocs,
    },
  },
  argTypes: {
    isLoading: {
      description: 'Shows skeletons for the quick accesses.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    quickAccesses: {
      description: 'Links to integrated services, opened in a new tab.',
      table: {
        type: {
          summary: 'CubeHeaderQuickAccess[]',
          detail:
            '{ Icon: SvgComponent; href: string; hoverMessage: string }[]',
        },
      },
      control: { disable: true },
    },
    currentLanguage: {
      description: 'The `value` of the selected language option.',
      table: { type: { summary: 'string' } },
      options: ['en-US', 'zh-TW'],
      control: 'inline-radio',
    },
    languageOptions: {
      description: 'The languages in the dropdown.',
      table: {
        type: {
          summary: 'CubeHeaderLanguageOption[]',
          detail:
            '{ label: string; value: string; onClick: (value: string) => void }[]',
        },
      },
      control: { disable: true },
    },
    functionBarItems: {
      description:
        'Icon buttons on the right. `container` wraps a button (for example in a router link) and `additionalElements` go inside it (for example an unread dot).',
      table: {
        type: {
          summary: 'CubeHeaderFunctionBarItem[]',
          detail:
            '{ Icon: SvgComponent; hoverMessage?: string; onClick?: () => void; container?: { Component; props }; additionalElements?: ReactNode[] }[]',
        },
      },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeHeaderProps>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-full">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    isLoading: false,
    currentLanguage: 'en-US',
    quickAccesses: mockQuickAccesses,
    functionBarItems: mockFunctionBarItems,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs<CubeHeaderProps>()

    return (
      <CubeHeader
        {...args}
        languageOptions={makeLanguageOptions((value) =>
          updateArgs({ currentLanguage: value }),
        )}
      />
    )
  },
}

type HeaderExampleProps = Pick<CubeHeaderProps, 'isLoading'> & {
  functionBarItems?: CubeHeaderFunctionBarItem[]
}

const HeaderExample = (props: HeaderExampleProps) => {
  const { isLoading, functionBarItems = mockFunctionBarItems } = props

  const [currentLanguage, setCurrentLanguage] = useState('en-US')

  return (
    <CubeHeader
      isLoading={isLoading}
      quickAccesses={mockQuickAccesses}
      functionBarItems={functionBarItems}
      currentLanguage={currentLanguage}
      languageOptions={makeLanguageOptions(setCurrentLanguage)}
    />
  )
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
    <StoryLayout title="Header">
      <StoryLayout.Section title="States">
        <div className="flex flex-col gap-y-10">
          <HeaderRow title="Default">
            <HeaderExample />
          </HeaderRow>
          <HeaderRow title="Loading">
            <HeaderExample isLoading />
          </HeaderRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layouts">
        <HeaderRow title="w/Notification link">
          <HeaderExample functionBarItems={mockNotificationLinkItems} />
        </HeaderRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
