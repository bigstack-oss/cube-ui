import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeSearchBarFilter } from '@components/CubeSearchBar/CubeSearchBarFilter'
import type { CubeSearchBarFilterProps } from '@components/CubeSearchBar/cubeSearchBarTypes'
import { SearchBarRow } from './SearchBarRow'
import { matches, mockOptions } from './searchBarMockData'

type FilterExampleProps = Pick<
  CubeSearchBarFilterProps,
  'isLoading' | 'placeholder'
> & {
  withItems?: boolean
}

// Keeps the value in state and lists the mock options that match it.
const FilterExample = (props: FilterExampleProps) => {
  const { withItems = true, ...filterProps } = props

  const [value, setValue] = useState('')

  return (
    <CubeSearchBarFilter
      {...filterProps}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onInputClear={() => setValue('')}
    >
      {withItems
        ? mockOptions
            .filter((item) => matches(item.label, value))
            .map(({ label, option, description }) => (
              <CubeSearchBarFilter.Item key={label}>
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-2">{label}</div>
                  <div className="col-span-1">{option}</div>
                  <div className="col-span-1 font-medium text-primary">
                    {description}
                  </div>
                </div>
              </CubeSearchBarFilter.Item>
            ))
        : []}
    </CubeSearchBarFilter>
  )
}

// Playground and Controls only; the Gallery stays off the docs page.
const CubeSearchBarFilterDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

const meta: Meta<CubeSearchBarFilterProps> = {
  title: 'Molecules/Search Bar/Filter',
  component: CubeSearchBarFilter as ComponentType<CubeSearchBarFilterProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A search input for filtering a list or table. While it has a value, the `CubeSearchBarFilter.Item` children show in a menu below it; clicking outside closes the menu. Type in the Playground to see the menu. Other `<input>` props pass through.\n\n**Test IDs:** `data-testid` goes on the `<input>`; the parts get `<test-id>-clear`, `-menu` and `-option` (each with `data-key`). See Overview / Test IDs.',
      },
      page: CubeSearchBarFilterDocs,
    },
  },
  argTypes: {
    isLoading: {
      description: 'Shows a skeleton instead of the input.',
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
      description: 'The input value (controlled).',
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
        'Menu items: `CubeSearchBarFilter.Item` elements (`children: ReactNode`, `onClick?: () => void`). The menu stays closed without them.',
      table: { type: { summary: 'ReactElement | ReactElement[]' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeSearchBarFilterProps>

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
    isLoading: false,
  },
  render: ({ isLoading, placeholder }) => (
    <FilterExample isLoading={isLoading} placeholder={placeholder} />
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
    <StoryLayout title="Search Bar - Filter">
      <StoryLayout.Section title="Layouts">
        <div className="flex flex-col gap-y-8">
          <SearchBarRow title="w/Dropdown items">
            <FilterExample />
          </SearchBarRow>
          <SearchBarRow title="Without dropdown items">
            <FilterExample withItems={false} />
          </SearchBarRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <SearchBarRow title="Loading">
          <FilterExample isLoading />
        </SearchBarRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
