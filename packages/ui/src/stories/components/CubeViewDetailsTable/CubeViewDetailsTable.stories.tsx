import { useState, type ComponentType, type ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Subheading,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { upperFirst } from 'lodash'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import {
  CubeViewDetailsTable,
  useExpandedRowIdSet,
  type CubeViewDetailsTableProps,
} from '@components/CubeViewDetailsTable'
import {
  getDynamicDetailItems,
  getDynamicDetailTitle,
  getLicenseDetailItems,
  LicenseTable,
  type MockLicense,
  mockLicenses,
} from './mockLicenses'
import { ViewDetailsTableRow } from './ViewDetailsTableRow'

const CubeViewDetailsTableDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Subheading>CubeViewDetailsTable</Subheading>
      <Controls
        include={[
          'rows',
          'expandedRowIdSet',
          'onExpandChange',
          'detailTitle',
          'getDetailItems',
          'getCustomizedDetailCell',
          'beforeExpandButton',
          'isRowExpandDisabled',
          'isLoading',
          'skeletonRowCount',
        ]}
      />
      <Subheading>CubeViewDetailsTable.Column</Subheading>
      <Controls include={['label']} />
    </>
  )
}

// Table and Column props share one Playground so a full table stays visible,
// but each name is a real prop: the first group on CubeViewDetailsTable, then
// `label` on CubeViewDetailsTable.Column (applied to the first data column).
// The other Column props are documented on the Basic Table page.
type CubeViewDetailsTableStoryArgs = {
  rows?: MockLicense[]
  expandedRowIdSet?: unknown
  onExpandChange?: unknown
  detailTitle?: string
  getDetailItems?: unknown
  getCustomizedDetailCell?: unknown
  beforeExpandButton?: unknown
  isRowExpandDisabled?: unknown
  isLoading?: boolean
  skeletonRowCount?: number
  label?: string
}

const meta: Meta<CubeViewDetailsTableStoryArgs> = {
  title: 'Organisms/Table/View Details Table',
  component:
    CubeViewDetailsTable as ComponentType<CubeViewDetailsTableStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A basic table whose rows expand to show details: a title and a list of items, or custom content. It adds an expand button column before the data columns. Create a typed table with `GetCubeViewDetailsTable<Row>()`, and keep the expanded rows with `useExpandedRowIdSet()`.',
      },
      page: CubeViewDetailsTableDocs,
    },
  },
  argTypes: {
    rows: {
      description: 'The rows to show. Each row needs a unique `id`.',
      table: { type: { summary: 'Row[]' } },
      control: { disable: true },
    },
    expandedRowIdSet: {
      description:
        'The ids of the expanded rows, e.g. from `useExpandedRowIdSet()`.',
      table: { type: { summary: 'Set<string>' } },
      control: { disable: true },
    },
    onExpandChange: {
      description:
        'Called with the row id and its next expanded value when the expand button is clicked.',
      table: {
        type: { summary: '(parentRowId: string, value: boolean) => void' },
      },
      control: { disable: true },
    },
    detailTitle: {
      description:
        'A title above the detail items, for every row or per row. Used with `getDetailItems`.',
      table: { type: { summary: 'string | ((parentRow: Row) => string)' } },
      control: 'text',
    },
    getDetailItems: {
      description:
        'The detail items of a row, shown as title and value pairs. Provide this or `getCustomizedDetailCell`.',
      table: {
        type: {
          summary: '(parentRow: Row) => CubeViewDetailsTableDetailItem[]',
          detail: '{ title: string; value: string | number }',
        },
      },
      control: { disable: true },
    },
    getCustomizedDetailCell: {
      description:
        'Custom detail content of a row, mounted only while the row is expanded.',
      table: { type: { summary: '(parentRow: Row) => ReactNode' } },
      control: { disable: true },
    },
    beforeExpandButton: {
      description: 'Content shown before the expand button of a row.',
      table: { type: { summary: '(parentRow: Row) => ReactNode' } },
      control: { disable: true },
    },
    isRowExpandDisabled: {
      description: 'Disables the expand button of a row.',
      table: { type: { summary: '(row: Row) => boolean' } },
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

type Story = StoryObj<CubeViewDetailsTableStoryArgs>

type LicenseColumnsProps = {
  productLabel?: string
}

/**
 * The license columns as an array: the table reads its `Column` children
 * directly, so they can't be wrapped in a component or a fragment.
 */
const licenseColumns = ({
  productLabel = 'Product',
}: LicenseColumnsProps = {}) => [
  <LicenseTable.Column key="product" label={productLabel} property="product" />,
  <LicenseTable.Column key="name" label="License name" property="name" />,
  <LicenseTable.Column key="hosts" label="Hosts" property="hosts">
    {(hosts) => hosts.join(', ')}
  </LicenseTable.Column>,
  <LicenseTable.Column
    key="issueDate"
    label="Issue date"
    property="issueDate"
  />,
  <LicenseTable.Column
    key="expireDate"
    label="Expire date"
    property="expireDate"
  />,
  <LicenseTable.Column key="expired" label="Expired" property="expired" />,
  <LicenseTable.Column key="type" label="Type" property="type" />,
]

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
    detailTitle: 'License Detail',
    isLoading: false,
    skeletonRowCount: 5,
    label: 'Product',
  },
  render: function Render({ detailTitle, isLoading, skeletonRowCount, label }) {
    const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

    return (
      <LicenseTable
        rows={mockLicenses}
        expandedRowIdSet={expandedRowIdSet}
        onExpandChange={onExpandChange}
        detailTitle={detailTitle}
        getDetailItems={getLicenseDetailItems}
        isLoading={isLoading}
        skeletonRowCount={skeletonRowCount}
      >
        {licenseColumns({ productLabel: label })}
      </LicenseTable>
    )
  },
}

type ExampleProps = Omit<
  CubeViewDetailsTableProps<MockLicense>,
  'rows' | 'expandedRowIdSet' | 'onExpandChange' | 'children'
> & {
  /**
   * Rows expanded on first render, so the Gallery shows their details.
   * @default ['1']
   */
  initiallyExpanded?: string[]
}

// Holds the expanded rows like `useExpandedRowIdSet()`, but starts with some
// rows open so the static Gallery shows their details.
const LicenseTableExample = (props: ExampleProps) => {
  const { initiallyExpanded = ['1'], ...tableProps } = props
  const [expandedRowIdSet, setExpandedRowIdSet] = useState(
    () => new Set(initiallyExpanded),
  )

  const onExpandChange = (parentRowId: string, value: boolean) => {
    setExpandedRowIdSet((prev) => {
      const next = new Set(prev)
      if (value) {
        next.add(parentRowId)
      } else {
        next.delete(parentRowId)
      }
      return next
    })
  }

  return (
    <LicenseTable
      rows={mockLicenses}
      expandedRowIdSet={expandedRowIdSet}
      onExpandChange={onExpandChange}
      {...tableProps}
    >
      {licenseColumns()}
    </LicenseTable>
  )
}

const Section = (props: { title: string; children: ReactNode }) => (
  <StoryLayout.Section title={props.title}>
    <div className="flex flex-col gap-y-10">{props.children}</div>
  </StoryLayout.Section>
)

const customizedDetailCell = (license: MockLicense) => (
  <div className="flex flex-col gap-4 p-4">
    <div className="primary-body4 font-extrabold text-functional-text">{`This is a customized detail cell for ${license.name} license.`}</div>
    <div className="mt-2 flex flex-col flex-wrap gap-4">
      {[
        ['Quantity', license.quantity],
        ['Support Plan', license.supportPlan],
        ['Feature', upperFirst(license.feature)],
      ].map(([title, value]) => (
        <div key={title} className="flex items-center gap-x-4">
          <span className="primary-body4 w-[80px] font-extrabold text-functional-hover-primary">
            {title}
          </span>
          <span className="primary-body5 w-[164px] font-extrabold text-functional-text-light">
            {value}
          </span>
        </div>
      ))}
    </div>
  </div>
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
      <StoryLayout title="View Details Table">
        <Section title="States">
          <ViewDetailsTableRow title="Default">
            <LicenseTableExample
              initiallyExpanded={[]}
              getDetailItems={getLicenseDetailItems}
            />
          </ViewDetailsTableRow>
          <ViewDetailsTableRow title="Expanded">
            <LicenseTableExample getDetailItems={getLicenseDetailItems} />
          </ViewDetailsTableRow>
          <ViewDetailsTableRow title="Expand disabled (CubeCMP)">
            <LicenseTableExample
              getDetailItems={getLicenseDetailItems}
              isRowExpandDisabled={(license) => license.product === 'CubeCMP'}
            />
          </ViewDetailsTableRow>
        </Section>
        <Section title="Layouts">
          <ViewDetailsTableRow title="w/Content before button">
            <LicenseTableExample
              getDetailItems={getLicenseDetailItems}
              beforeExpandButton={() => (
                <span className="inline-flex size-4 items-center justify-center">
                  <span className="size-[4.5px] rounded-full bg-cosmos-secondary" />
                </span>
              )}
            />
          </ViewDetailsTableRow>
        </Section>
        <Section title="Details">
          <ViewDetailsTableRow title="Items">
            <LicenseTableExample getDetailItems={getLicenseDetailItems} />
          </ViewDetailsTableRow>
          <ViewDetailsTableRow title="w/Title">
            <LicenseTableExample
              detailTitle="License Detail"
              getDetailItems={getLicenseDetailItems}
            />
          </ViewDetailsTableRow>
          <ViewDetailsTableRow title="Title and items per row">
            <LicenseTableExample
              initiallyExpanded={['1', '2']}
              detailTitle={getDynamicDetailTitle}
              getDetailItems={getDynamicDetailItems}
            />
          </ViewDetailsTableRow>
          <ViewDetailsTableRow title="Customized">
            <LicenseTableExample
              getCustomizedDetailCell={customizedDetailCell}
            />
          </ViewDetailsTableRow>
        </Section>
        <Section title="Skeleton">
          <LicenseTableExample
            isLoading
            initiallyExpanded={[]}
            getDetailItems={getLicenseDetailItems}
          />
        </Section>
      </StoryLayout>
    )
  },
}
