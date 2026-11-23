import { useState, type ComponentType, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Subheading,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeBatchActionTable } from '@components/CubeBatchActionTable'
import { BatchActionTableRow } from './BatchActionTableRow'
import { mockTemplates, TemplateTable } from './mockTemplates'

const CubeBatchActionTableDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeBatchActionTable</Subheading>
      <Controls
        include={[
          'rows',
          'selectedRowIds',
          'disabledRowIds',
          'onCheckChange',
          'showHeaderCheckbox',
          'onAllCheckChange',
          'isLoading',
          'skeletonRowCount',
        ]}
      />
      <Subheading>CubeBatchActionTable.Column</Subheading>
      <Controls include={['label']} />
    </>
  )
}

// Table and Column props share one Playground so a full table stays visible,
// but each name is a real prop: the first group on CubeBatchActionTable, then
// `label` on CubeBatchActionTable.Column (applied to the first data column).
// The other Column props are documented on the Basic Table page.
type CubeBatchActionTableStoryArgs = {
  rows?: unknown
  selectedRowIds?: unknown
  disabledRowIds?: string[]
  onCheckChange?: unknown
  showHeaderCheckbox: boolean
  onAllCheckChange?: unknown
  isLoading?: boolean
  skeletonRowCount?: number
  label?: string
}

const meta: Meta<CubeBatchActionTableStoryArgs> = {
  title: 'Organisms/Table/Batch Action Table',
  component:
    CubeBatchActionTable as ComponentType<CubeBatchActionTableStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A basic table with a checkbox column for selecting rows to act on together. The header checkbox selects or clears every enabled row and shows a partial state when only some are selected. Create a typed table with `GetCubeBatchActionTable<Row>()`; the selection is controlled through `selectedRowIds` and the change callbacks.',
      },
      page: CubeBatchActionTableDocs,
    },
  },
  argTypes: {
    rows: {
      description: 'The rows to show. Each row needs a unique `id`.',
      table: { type: { summary: 'Row[]' } },
      control: { disable: true },
    },
    selectedRowIds: {
      description: 'The ids of the checked rows.',
      table: { type: { summary: 'string[]' } },
      control: { disable: true },
    },
    disabledRowIds: {
      description:
        'The ids of rows that cannot be selected; they show no checkbox and are dimmed.',
      table: { type: { summary: 'string[]' } },
      control: 'object',
    },
    onCheckChange: {
      description:
        'Called with the row id and its next checked value when a row checkbox is clicked.',
      table: { type: { summary: '(rowId: string, checked: boolean) => void' } },
      control: { disable: true },
    },
    showHeaderCheckbox: {
      description:
        'Shows the select-all checkbox in the header. Requires `onAllCheckChange` when true.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    onAllCheckChange: {
      description:
        'Called with the next checked value when the header checkbox is clicked.',
      table: { type: { summary: '(checked: boolean) => void' } },
      control: { disable: true },
    },
    isLoading: {
      description: 'Renders skeleton rows instead of the data rows.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    skeletonRowCount: {
      description: 'The number of skeleton rows while loading.',
      table: { type: { summary: 'number' } },
      defaultValue: { summary: '5' },
      control: { type: 'number', min: 1 },
    },
    label: {
      description: 'The column header.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<CubeBatchActionTableStoryArgs>

const enabledIds = (disabledRowIds: string[]) =>
  mockTemplates
    .map((template) => template.id)
    .filter((id) => !disabledRowIds.includes(id))

type ExampleProps = {
  /**
   * Rows checked on first render.
   * @default []
   */
  initiallySelected?: string[]
  disabledRowIds?: string[]
  showHeaderCheckbox?: boolean
  isLoading?: boolean
  skeletonRowCount?: number
  templateLabel?: string
}

// Holds the selection the way a page would, so every example is clickable.
const TemplateTableExample = (props: ExampleProps) => {
  const {
    initiallySelected = [],
    disabledRowIds = [],
    showHeaderCheckbox = true,
    isLoading,
    skeletonRowCount,
    templateLabel = 'Template',
  } = props
  const [selectedRowIds, setSelectedRowIds] = useState(initiallySelected)

  const onCheckChange = (rowId: string, checked: boolean) => {
    setSelectedRowIds((prev) =>
      checked ? [...prev, rowId] : prev.filter((id) => id !== rowId),
    )
  }

  const onAllCheckChange = (checked: boolean) => {
    setSelectedRowIds(checked ? enabledIds(disabledRowIds) : [])
  }

  const columns = [
    <TemplateTable.Column
      key="template"
      label={templateLabel}
      property="template"
    />,
    <TemplateTable.Column
      key="description"
      label="Description"
      property="description"
    />,
  ]

  const tableProps = {
    rows: mockTemplates,
    selectedRowIds,
    disabledRowIds,
    onCheckChange,
    isLoading,
    skeletonRowCount,
  }

  return showHeaderCheckbox ? (
    <TemplateTable
      {...tableProps}
      showHeaderCheckbox
      onAllCheckChange={onAllCheckChange}
    >
      {columns}
    </TemplateTable>
  ) : (
    <TemplateTable {...tableProps} showHeaderCheckbox={false}>
      {columns}
    </TemplateTable>
  )
}

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
    disabledRowIds: ['template-3'],
    showHeaderCheckbox: true,
    isLoading: false,
    skeletonRowCount: 5,
    label: 'Template',
  },
  render: ({
    disabledRowIds,
    showHeaderCheckbox,
    isLoading,
    skeletonRowCount,
    label,
  }) => (
    <TemplateTableExample
      // Remount when the disabled rows change, so no disabled row stays selected.
      key={String(disabledRowIds)}
      disabledRowIds={disabledRowIds}
      showHeaderCheckbox={showHeaderCheckbox}
      isLoading={isLoading}
      skeletonRowCount={skeletonRowCount}
      templateLabel={label}
    />
  ),
}

const Section = (props: { title: string; children: ReactNode }) => (
  <StoryLayout.Section title={props.title}>
    <div className="flex flex-col gap-y-10">{props.children}</div>
  </StoryLayout.Section>
)

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
      <StoryLayout title="Batch Action Table">
        <Section title="States">
          <BatchActionTableRow title="Default">
            <TemplateTableExample />
          </BatchActionTableRow>
          <BatchActionTableRow title="Some selected">
            <TemplateTableExample initiallySelected={['template-1']} />
          </BatchActionTableRow>
          <BatchActionTableRow title="All selected">
            <TemplateTableExample
              initiallySelected={mockTemplates.map((template) => template.id)}
            />
          </BatchActionTableRow>
          <BatchActionTableRow title="w/Disabled row (System Maintenance Reminder)">
            <TemplateTableExample
              initiallySelected={['template-1']}
              disabledRowIds={['template-3']}
            />
          </BatchActionTableRow>
        </Section>
        <Section title="Layouts">
          <BatchActionTableRow title="Header checkbox hidden">
            <TemplateTableExample showHeaderCheckbox={false} />
          </BatchActionTableRow>
        </Section>
        <Section title="Skeleton">
          <TemplateTableExample isLoading skeletonRowCount={3} />
        </Section>
      </StoryLayout>
    )
  },
}
