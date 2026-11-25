import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { noop } from 'lodash'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeSearchBarGlobal } from '@components/CubeSearchBar/CubeSearchBarGlobal'
import type {
  CubeSearchBarGlobalProps,
  CubeSearchBarGlobalVariant,
} from '@components/CubeSearchBar/cubeSearchBarTypes'
import { SearchBarRow } from './SearchBarRow'
import {
  matches,
  mockCategories,
  mockRecentSuggestions,
  mockSuggestions,
} from './searchBarMockData'

type GlobalExampleProps = {
  variant: CubeSearchBarGlobalVariant
  isLoading?: boolean
  placeholder?: string
  /**
   * Without suggestions or categories.
   */
  isNoData?: boolean
}

// Keeps the value and category in state and lists the matching suggestions.
const GlobalExample = (props: GlobalExampleProps) => {
  const { variant, isLoading, placeholder, isNoData = false } = props

  const [value, setValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>()

  const items = isNoData
    ? []
    : [
        ...mockSuggestions
          .filter((suggestion) => matches(suggestion, value))
          .map((suggestion) => (
            <CubeSearchBarGlobal.Item
              key={suggestion}
              type="suggestion"
              onClick={noop}
            >
              {suggestion}
            </CubeSearchBarGlobal.Item>
          )),
        ...mockRecentSuggestions
          .filter((suggestion) => matches(suggestion, value))
          .map((suggestion) => (
            <CubeSearchBarGlobal.Item
              key={suggestion}
              type="recentSuggestion"
              onClick={noop}
              onSuggestionClear={noop}
            >
              {suggestion}
            </CubeSearchBarGlobal.Item>
          )),
      ]

  const inputProps = {
    isLoading,
    placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setValue(e.target.value),
    onInputClear: () => setValue(''),
  }

  if (variant === 'regular') {
    return (
      <CubeSearchBarGlobal {...inputProps} variant="regular">
        {items}
      </CubeSearchBarGlobal>
    )
  }

  return (
    <CubeSearchBarGlobal
      {...inputProps}
      variant="category"
      categories={isNoData ? [] : mockCategories}
      selectedCategory={selectedCategory}
      onCategoryClick={setSelectedCategory}
    >
      {items}
    </CubeSearchBarGlobal>
  )
}

// The props are a union by `variant`; the category props apply only to
// `category`.
type CubeSearchBarGlobalStoryArgs = Pick<
  CubeSearchBarGlobalProps,
  'variant' | 'isLoading' | 'placeholder' | 'value' | 'onChange'
> & {
  onInputClear?: unknown
  children?: unknown
  categories?: unknown
  selectedCategory?: unknown
  onCategoryClick?: unknown
}

// Playground and Controls only; the Gallery stays off the docs page.
const CubeSearchBarGlobalDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

const meta: Meta<CubeSearchBarGlobalStoryArgs> = {
  title: 'Molecules/Search Bar/Global Search',
  component: CubeSearchBarGlobal as ComponentType<CubeSearchBarGlobalStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A rounded search input for searching across the product. While it has a value, the `CubeSearchBarGlobal.Item` suggestions show in a menu below it. The `category` variant adds a category picker on the right. Type in the Playground to see the suggestions. Other `<input>` props pass through.',
      },
      page: CubeSearchBarGlobalDocs,
    },
  },
  argTypes: {
    variant: {
      description: '`category` adds a category picker after the input.',
      table: { type: { summary: "'regular' | 'category'" } },
      options: ['regular', 'category'],
      control: 'inline-radio',
    },
    isLoading: {
      description: 'Shows a skeleton instead of the search bar.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    placeholder: {
      description: 'Placeholder text.',
      table: { type: { summary: 'string' } },
      defaultValue: { summary: '"Search" (translated)' },
      control: 'text',
    },
    value: {
      description:
        'The input value (controlled). A value of only spaces counts as empty.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    onChange: {
      description: 'Called when the input value changes.',
      table: { type: { summary: 'ChangeEventHandler<HTMLInputElement>' } },
      control: { disable: true },
    },
    onInputClear: {
      description:
        'Called when the clear (×) icon is clicked; it shows while the input has a value.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    children: {
      description:
        "Suggestions: `CubeSearchBarGlobal.Item` elements (`type: 'suggestion' | 'recentSuggestion'`, `children: string`, `onClick`, and `onSuggestionClear` for recent ones, which show a clock and a clear icon). The menu stays closed without them.",
      table: { type: { summary: 'ReactElement | ReactElement[]' } },
      control: { disable: true },
    },
    categories: {
      description:
        '`category` only. The categories to pick from; without any, the menu shows "No Category".',
      table: { type: { summary: 'string[]' } },
      control: { disable: true },
    },
    selectedCategory: {
      description:
        '`category` only. Shown in the picker; "Category" (translated) when undefined.',
      table: { type: { summary: 'string | undefined' } },
      control: { disable: true },
    },
    onCategoryClick: {
      description: '`category` only. Called with the picked category.',
      table: { type: { summary: '(category: string) => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeSearchBarGlobalStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[480px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    variant: 'category',
    isLoading: false,
  },
  render: ({ variant = 'regular', isLoading, placeholder }) => (
    <GlobalExample
      variant={variant}
      isLoading={isLoading}
      placeholder={placeholder}
    />
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
  render: () => (
    <StoryLayout title="Search Bar - Global Search">
      <StoryLayout.Section title="Variants">
        <div className="flex flex-col gap-y-8">
          <SearchBarRow title="Regular">
            <GlobalExample variant="regular" />
          </SearchBarRow>
          <SearchBarRow title="w/Category">
            <GlobalExample variant="category" />
          </SearchBarRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Layouts">
        <SearchBarRow title="Without suggestions or categories">
          <GlobalExample variant="category" isNoData />
        </SearchBarRow>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <SearchBarRow title="Loading">
          <GlobalExample variant="regular" isLoading />
        </SearchBarRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
