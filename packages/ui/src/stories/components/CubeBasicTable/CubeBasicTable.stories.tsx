import type { ComponentType, ReactNode } from 'react'
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
import { CubeBasicTable } from '@components/CubeBasicTable'
import type {
  ColumnCompareFnMap,
  CubeTableColumnProps,
  CubeTableColumnSkeletonVariant,
} from '@components/CubeBasicTable'
import { CubeResourceUsageBar } from '@components/CubeProgressBar'
import { CubeStatus } from '@components/CubeStatus'
import { CubeTag } from '@components/CubeTag'
import { BasicTableRow } from './BasicTableRow'
import {
  type MockNode,
  mockNodes,
  NodeTable,
  statusCompareFnMap,
} from './mockNodes'

const skeletonVariants: CubeTableColumnSkeletonVariant[] = [
  'regular',
  'subtext-vertical',
  'subtext-horizontal',
  'icon-left',
  'icon-right',
  'icon-vertical',
  'icon-only',
  'with-barchart',
  'status',
]

type NodeColumnOptions = {
  /**
   * Props for the first (Hostname) column, e.g. from Playground controls.
   */
  hostname?: Partial<CubeTableColumnProps<MockNode, 'hostname'>>
  sortable?: (keyof MockNode)[]
  fitContent?: (keyof MockNode)[]
  statusCompareFnMap?: ColumnCompareFnMap<string>
}

/**
 * The node columns as an array: the table reads its `Column` children
 * directly, so they can't be wrapped in a component or a fragment.
 */
const nodeColumns = (options: NodeColumnOptions = {}) => {
  const { hostname, sortable = [], fitContent = [] } = options

  const flags = (property: keyof MockNode) => ({
    isSortable: sortable.includes(property) || undefined,
    fitContent: fitContent.includes(property) || undefined,
  })

  return [
    <NodeTable.Column
      key="hostname"
      {...flags('hostname')}
      label="Hostname"
      property="hostname"
      emphasize
      {...hostname}
    />,
    <NodeTable.Column
      key="managementIp"
      {...flags('managementIp')}
      label="Management IP"
      property="managementIp"
    />,
    <NodeTable.Column
      key="role"
      {...flags('role')}
      label="Role"
      property="role"
    >
      {(role) => (
        <CubeTag color="blue" variant="filled">
          {role}
        </CubeTag>
      )}
    </NodeTable.Column>,
    <NodeTable.Column
      key="licenseExpire"
      {...flags('licenseExpire')}
      label="License Expire"
      property="licenseExpire"
    >
      {(licenseExpire) => licenseExpire.toLocaleDateString('en-US')}
    </NodeTable.Column>,
    <NodeTable.Column key="cpu" {...flags('cpu')} label="CPU" property="cpu">
      {(cpu) => (
        <CubeResourceUsageBar className="min-w-[90px]" progress={cpu} />
      )}
    </NodeTable.Column>,
    <NodeTable.Column key="ram" {...flags('ram')} label="RAM" property="ram">
      {(ram) => (
        <CubeResourceUsageBar className="min-w-[90px]" progress={ram} />
      )}
    </NodeTable.Column>,
    <NodeTable.Column
      key="partition"
      {...flags('partition')}
      label="Partition"
      property="partition"
    >
      {(partition) => (
        <CubeResourceUsageBar className="min-w-[90px]" progress={partition} />
      )}
    </NodeTable.Column>,
    <NodeTable.Column
      key="running"
      {...flags('running')}
      label="Running"
      property="running"
    >
      {(running) => (
        <span className="text-nowrap">
          {running.toLocaleString('en-US')} days
        </span>
      )}
    </NodeTable.Column>,
    <NodeTable.Column
      key="status"
      {...flags('status')}
      label="Status"
      property="status"
      sortingCompareFnMap={options.statusCompareFnMap}
    >
      {(status) => <CubeStatus status={status} />}
    </NodeTable.Column>,
  ]
}

const CubeBasicTableDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeBasicTable</Subheading>
      <Controls
        include={[
          'rows',
          'isLoading',
          'skeletonRowCount',
          'defaultSortingState',
          'rowClassName',
          'onRowClick',
        ]}
      />
      <Subheading>CubeBasicTable.Column</Subheading>
      <Controls
        include={[
          'label',
          'property',
          'emphasize',
          'fitContent',
          'isSortable',
          'sortingCompareFnMap',
          'skeletonVariant',
          'colSpan',
        ]}
      />
    </>
  )
}

// Table and Column props share one Playground so a full table stays visible,
// but each name is a real prop: the first group on CubeBasicTable, the second
// on CubeBasicTable.Column (applied to the first, Hostname, column).
type CubeBasicTableStoryArgs = {
  rows?: MockNode[]
  isLoading?: boolean
  skeletonRowCount?: number
  defaultSortingState?: unknown
  rowClassName?: unknown
  onRowClick?: unknown
  label?: string
  property?: unknown
  emphasize?: boolean
  fitContent?: boolean
  isSortable?: boolean
  sortingCompareFnMap?: unknown
  skeletonVariant?: CubeTableColumnSkeletonVariant
  colSpan?: unknown
}

const meta: Meta<CubeBasicTableStoryArgs> = {
  title: 'Organisms/Table/Basic Table',
  component: CubeBasicTable as ComponentType<CubeBasicTableStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A data table whose columns are declared as `CubeBasicTable.Column` children. Create a typed table with `GetCubeBasicTable<Row>()`, so each column infers its value type from `property`. Columns can be sortable, and the table shows an empty state and loading skeletons.',
      },
      page: CubeBasicTableDocs,
    },
  },
  argTypes: {
    rows: {
      description: 'The rows to show. Each row needs a unique `id`.',
      table: { type: { summary: 'Row[]' } },
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
    defaultSortingState: {
      description: 'The column and direction sorted on first render.',
      table: { type: { summary: 'SortingState<Row>' } },
      control: { disable: true },
    },
    rowClassName: {
      description: 'Classes for each body row, or a function of the row.',
      table: {
        type: { summary: 'ClassNameValue | ((row: Row) => ClassNameValue)' },
      },
      control: { disable: true },
    },
    onRowClick: {
      description: 'Called with the row when a body row is clicked.',
      table: { type: { summary: '(row: Row) => void' } },
      control: { disable: true },
    },
    label: {
      description: 'The column header.',
      table: { type: { summary: 'ReactNode' } },
      control: 'text',
    },
    property: {
      description:
        'The row property shown in this column. Without a render function, the cell shows its `toString()`.',
      table: { type: { summary: 'keyof Row' } },
      control: { disable: true },
    },
    emphasize: {
      description: 'Shows the cells in bold, for every row or per row.',
      table: { type: { summary: 'boolean | ((row: Row) => boolean)' } },
      control: 'boolean',
    },
    fitContent: {
      description: 'Shrinks the column to its content.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    isSortable: {
      description:
        'Shows a sorting arrow in the header (needs `property`). Clicking it cycles descending, ascending and unsorted.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    sortingCompareFnMap: {
      description:
        'Custom compare functions per direction. Required to sort non-primitive values such as dates.',
      table: { type: { summary: 'ColumnCompareFnMap<Row[Property]>' } },
      control: { disable: true },
    },
    skeletonVariant: {
      description: 'The cell skeleton shown while loading.',
      table: {
        type: { summary: skeletonVariants.map((v) => `'${v}'`).join(' | ') },
      },
      defaultValue: { summary: "'regular'" },
      control: 'select',
      options: skeletonVariants,
    },
    colSpan: {
      description: 'The number of columns each body cell spans.',
      table: { type: { summary: 'number' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeBasicTableStoryArgs>

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
    skeletonRowCount: 5,
    label: 'Hostname',
    emphasize: true,
    fitContent: false,
    isSortable: true,
    skeletonVariant: 'regular',
  },
  render: ({
    isLoading,
    skeletonRowCount,
    label,
    emphasize,
    fitContent,
    isSortable,
    skeletonVariant,
  }) => (
    <NodeTable
      rows={mockNodes}
      isLoading={isLoading}
      skeletonRowCount={skeletonRowCount}
    >
      {nodeColumns({
        hostname: { label, emphasize, fitContent, isSortable, skeletonVariant },
      })}
    </NodeTable>
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
      <StoryLayout title="Basic Table">
        <Section title="States">
          <BasicTableRow title="Default">
            <NodeTable rows={mockNodes}>{nodeColumns()}</NodeTable>
          </BasicTableRow>
          <BasicTableRow title="Empty">
            <NodeTable rows={[]}>{nodeColumns()}</NodeTable>
          </BasicTableRow>
        </Section>
        <Section title="Layouts">
          <BasicTableRow title="Default">
            <NodeTable rows={mockNodes}>{nodeColumns()}</NodeTable>
          </BasicTableRow>
          <BasicTableRow title="Fit content (Hostname, Management IP, Running, Status)">
            <NodeTable rows={mockNodes}>
              {nodeColumns({
                fitContent: ['hostname', 'managementIp', 'running', 'status'],
              })}
            </NodeTable>
          </BasicTableRow>
          <BasicTableRow title="w/Sub row (error nodes)">
            <NodeTable rows={mockNodes}>
              {nodeColumns()}
              <NodeTable.SubRow isVisible={(node) => node.status === 'error'}>
                <NodeTable.Column property="hostname" colSpan={9}>
                  {(hostname) => `${hostname} needs attention.`}
                </NodeTable.Column>
              </NodeTable.SubRow>
            </NodeTable>
          </BasicTableRow>
        </Section>
        <Section title="Sorting">
          <BasicTableRow title="Sortable (Hostname, RAM)">
            <NodeTable rows={mockNodes}>
              {nodeColumns({ sortable: ['hostname', 'ram'] })}
            </NodeTable>
          </BasicTableRow>
          <BasicTableRow title="Default sorting state (Hostname, descending)">
            <NodeTable
              rows={mockNodes}
              defaultSortingState={{
                property: 'hostname',
                direction: 'descending',
              }}
            >
              {nodeColumns({ sortable: ['hostname', 'ram'] })}
            </NodeTable>
          </BasicTableRow>
          <BasicTableRow title="Custom compare function (Status: running, success, error)">
            <NodeTable rows={mockNodes}>
              {nodeColumns({ sortable: ['status'], statusCompareFnMap })}
            </NodeTable>
          </BasicTableRow>
        </Section>
        <Section title="Skeleton">
          <NodeTable rows={mockNodes} isLoading skeletonRowCount={3}>
            {skeletonVariants.map((variant) => (
              <NodeTable.Column
                key={variant}
                label={variant}
                skeletonVariant={variant}
              />
            ))}
          </NodeTable>
        </Section>
      </StoryLayout>
    )
  },
}
