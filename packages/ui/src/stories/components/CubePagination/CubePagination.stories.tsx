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
import {
  CubePagination,
  type CubePaginationProps,
} from '@components/CubePagination/CubePagination'
import { itemsPerPageOptions } from '@components/CubePagination/cubePaginationUtils'
import { PaginationRow, StatefulPagination } from './PaginationRow'

const CubePaginationDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<CubePaginationProps> = {
  title: 'Molecules/Pagination',
  component: CubePagination,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Page navigation for a list or table: the total amount, page buttons, a "go to page" input, and an items-per-page dropdown. Below 798px wide it switches to a minimal layout with fewer page buttons and no labels. The page input works like the table input and the dropdown like the dropdown, both at 28px high.',
      },
      page: CubePaginationDocs,
    },
  },
  argTypes: {
    isLoading: {
      description: 'Renders a skeleton instead of the pagination.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    totalItems: {
      description: 'The total number of items. 0 disables the controls.',
      table: { type: { summary: 'number' } },
      control: { type: 'number', min: 0 },
    },
    currentPage: {
      description: 'The current page, 1-indexed.',
      table: { type: { summary: 'number' } },
      control: { type: 'number', min: 1 },
    },
    itemsPerPage: {
      description: 'Items per page, one of the dropdown options.',
      table: { type: { summary: itemsPerPageOptions.join(' | ') } },
      defaultValue: { summary: '25' },
      control: 'select',
      options: itemsPerPageOptions,
    },
    onPageChange: {
      description:
        'Called with a page in range when a page is chosen, and with 1 after the items per page change.',
      table: { type: { summary: '(page: number) => void' } },
      control: { disable: true },
    },
    onItemsPerPageChange: {
      description: 'Called when another items-per-page option is chosen.',
      table: { type: { summary: '(itemsPerPage: ItemsPerPage) => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubePaginationProps>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[900px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    isLoading: false,
    totalItems: 1203,
    currentPage: 1,
    itemsPerPage: 25,
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()

    return (
      <CubePagination
        {...args}
        onPageChange={(currentPage) => updateArgs({ currentPage })}
        onItemsPerPageChange={(itemsPerPage) => updateArgs({ itemsPerPage })}
      />
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
      <StoryLayout title="Pagination">
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-12">
            <PaginationRow title="General" width={1000}>
              <StatefulPagination totalItems={1203} />
            </PaginationRow>
            <PaginationRow title="Minimal" width={600}>
              <StatefulPagination totalItems={1203} />
            </PaginationRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <PaginationRow title="Empty" width={1000}>
            <StatefulPagination totalItems={0} />
          </PaginationRow>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-12">
            <PaginationRow title="General" width={1000}>
              <StatefulPagination totalItems={1203} isLoading />
            </PaginationRow>
            <PaginationRow title="Minimal" width={600}>
              <StatefulPagination totalItems={1203} isLoading />
            </PaginationRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
