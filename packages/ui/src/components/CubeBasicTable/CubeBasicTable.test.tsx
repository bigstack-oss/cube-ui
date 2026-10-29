import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import { CubeBasicTable, GetCubeBasicTable } from './CubeBasicTable'
import type { CubeTableColumnSkeletonVariant } from './rendering/CubeTableColumn'
import { cubeTableStyles } from './rendering/cubeTableStyles'
import type { ColumnCompareFnMap } from './sorting/sortingUtils'

type Node = {
  id: string
  hostname: string
  cpu: number
  status: string
}

const NodeTable = GetCubeBasicTable<Node>()

const nodes: Node[] = [
  { id: '1', hostname: 'Dell02', cpu: 22, status: 'running' },
  { id: '2', hostname: 'Dell03', cpu: 33, status: 'error' },
  { id: '3', hostname: 'Dell01', cpu: 11, status: 'success' },
]

const getBodyRows = () => screen.getAllByRole('row').slice(1)

// The first cell of each body row, top to bottom.
const getHostnames = () =>
  getBodyRows().map((row) => within(row).getAllByRole('cell')[0]?.textContent)

const getSortArrow = (label: string) =>
  screen.getByRole('columnheader', { name: label }).querySelector('svg')!

describe('CubeBasicTable', () => {
  it('renders a header per column and a row per item', () => {
    render(
      <NodeTable rows={nodes}>
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.Column label="CPU" property="cpu" />
      </NodeTable>,
    )

    expect(
      screen.getAllByRole('columnheader').map((th) => th.textContent),
    ).toEqual(['Hostname', 'CPU'])
    expect(getBodyRows()).toHaveLength(3)
    expect(getHostnames()).toEqual(['Dell02', 'Dell03', 'Dell01'])
    // Values without a render function are shown with `toString()`.
    expect(screen.getByRole('cell', { name: '22' })).toBeInTheDocument()
  })

  it('renders cells with a render function or static children', () => {
    render(
      <NodeTable rows={nodes.slice(0, 1)}>
        <NodeTable.Column label="CPU" property="cpu">
          {(cpu, row, rowIndex) => `${row.hostname} #${rowIndex}: ${cpu}%`}
        </NodeTable.Column>
        <NodeTable.Column label="Action">Edit</NodeTable.Column>
      </NodeTable>,
    )

    expect(
      screen.getByRole('cell', { name: 'Dell02 #0: 22%' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Edit' })).toBeInTheDocument()
  })

  it('emphasizes cells by a boolean or per row', () => {
    render(
      <NodeTable rows={nodes}>
        <NodeTable.Column label="Hostname" property="hostname" emphasize />
        <NodeTable.Column
          label="Status"
          property="status"
          emphasize={(row) => row.status === 'error'}
        />
      </NodeTable>,
    )

    expect(screen.getByRole('cell', { name: 'Dell02' })).toHaveClass(
      'font-semibold',
    )
    expect(screen.getByRole('cell', { name: 'error' })).toHaveClass(
      'font-semibold',
    )
    expect(screen.getByRole('cell', { name: 'running' })).not.toHaveClass(
      'font-semibold',
    )
  })

  it('applies fitContent and colSpan to the cells', () => {
    render(
      <NodeTable rows={nodes.slice(0, 1)}>
        <NodeTable.Column label="Hostname" property="hostname" fitContent />
        <NodeTable.Column label="CPU" property="cpu" colSpan={2} />
      </NodeTable>,
    )

    expect(screen.getByRole('cell', { name: 'Dell02' })).toHaveClass('w-0')
    expect(screen.getByRole('cell', { name: '22' })).toHaveAttribute(
      'colspan',
      '2',
    )
  })

  it('applies rowClassName and calls onRowClick with the row', async () => {
    const user = userEvent.setup()
    const onRowClick = vi.fn()
    render(
      <NodeTable
        rows={nodes}
        rowClassName={(row) => (row.status === 'error' ? 'bg-red-50' : '')}
        onRowClick={onRowClick}
      >
        <NodeTable.Column label="Hostname" property="hostname" />
      </NodeTable>,
    )

    const [, errorRow] = getBodyRows()
    expect(errorRow).toHaveClass('bg-red-50')
    expect(getBodyRows()[0]).not.toHaveClass('bg-red-50')

    await user.click(screen.getByRole('cell', { name: 'Dell03' }))
    expect(onRowClick).toHaveBeenCalledWith(nodes[1])
  })

  it('shows the empty state across all columns', () => {
    render(
      <NodeTable rows={[]}>
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.Column label="CPU" property="cpu" />
      </NodeTable>,
    )

    const cell = screen.getByRole('cell', { name: 'No Result' })
    expect(cell).toHaveAttribute('colspan', '2')
    // The header rounds all corners when there are no body rows.
    expect(screen.getByRole('columnheader', { name: 'Hostname' })).toHaveClass(
      'first-of-type:rounded-l-[5px]',
    )
  })

  it('translates the empty state', async () => {
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <NodeTable rows={[]}>
          <NodeTable.Column label="Hostname" property="hostname" />
        </NodeTable>
      </CubeUiLocaleProvider>,
    )

    expect(await screen.findByText('無資料')).toBeInTheDocument()
  })

  it('renders skeleton rows while loading', () => {
    const { container, rerender } = render(
      <NodeTable rows={nodes} isLoading>
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.Column label="CPU" property="cpu" />
      </NodeTable>,
    )

    expect(getBodyRows()).toHaveLength(5)
    expect(screen.queryByText('Dell02')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(10)

    rerender(
      <NodeTable rows={nodes} isLoading skeletonRowCount={2}>
        <NodeTable.Column label="Hostname" property="hostname" />
      </NodeTable>,
    )
    expect(getBodyRows()).toHaveLength(2)
  })

  it.each<[CubeTableColumnSkeletonVariant, number]>([
    ['regular', 1],
    ['subtext-vertical', 2],
    ['subtext-horizontal', 2],
    ['icon-left', 2],
    ['icon-right', 2],
    ['icon-vertical', 2],
    ['icon-only', 1],
    ['with-barchart', 2],
    ['status', 1],
  ])('renders the %s cell skeleton', (variant, count) => {
    const { container } = render(
      <CubeBasicTable.TdSkeleton variant={variant} />,
    )

    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(count)
  })

  it('cycles a sortable column through descending, ascending and unsorted', async () => {
    const user = userEvent.setup()
    render(
      <NodeTable rows={nodes}>
        <NodeTable.Column label="Hostname" property="hostname" isSortable />
        <NodeTable.Column label="Status" property="status" />
      </NodeTable>,
    )

    expect(getSortArrow('Status')).toBeNull()

    await user.click(getSortArrow('Hostname'))
    expect(getHostnames()).toEqual(['Dell03', 'Dell02', 'Dell01'])

    await user.click(getSortArrow('Hostname'))
    expect(getHostnames()).toEqual(['Dell01', 'Dell02', 'Dell03'])

    await user.click(getSortArrow('Hostname'))
    expect(getHostnames()).toEqual(['Dell02', 'Dell03', 'Dell01'])
  })

  it('sorts numbers numerically and starts from defaultSortingState', () => {
    render(
      <NodeTable
        rows={nodes}
        defaultSortingState={{ property: 'cpu', direction: 'ascending' }}
      >
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.Column label="CPU" property="cpu" isSortable />
      </NodeTable>,
    )

    expect(getHostnames()).toEqual(['Dell01', 'Dell02', 'Dell03'])
  })

  it('sorts with a custom compare function', async () => {
    const user = userEvent.setup()
    const order = ['running', 'success', 'error']
    const statusCompareFnMap: ColumnCompareFnMap<string> = {
      ascending: (a, b) => order.indexOf(a) <= order.indexOf(b),
      descending: (a, b) => order.indexOf(a) >= order.indexOf(b),
    }
    render(
      <NodeTable rows={nodes}>
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.Column
          label="Status"
          property="status"
          isSortable
          sortingCompareFnMap={statusCompareFnMap}
        />
      </NodeTable>,
    )

    await user.click(getSortArrow('Status'))
    expect(getHostnames()).toEqual(['Dell03', 'Dell01', 'Dell02'])
  })

  it('warns when the default sorted column is not sortable', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    render(
      <NodeTable
        rows={nodes}
        defaultSortingState={{ property: 'cpu', direction: 'descending' }}
      >
        <NodeTable.Column label="CPU" property="cpu" />
      </NodeTable>,
    )

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('Column with property cpu is sorted'),
    )
    warn.mockRestore()
  })

  it('renders sub rows under each row, hiding them per row', () => {
    render(
      <NodeTable rows={nodes.slice(0, 2)}>
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.SubRow isVisible={(row) => row.status === 'error'}>
          <NodeTable.Column property="status">
            {(status) => `Details: ${status}`}
          </NodeTable.Column>
        </NodeTable.SubRow>
      </NodeTable>,
    )

    const rows = getBodyRows()
    expect(rows).toHaveLength(4)
    expect(rows[1]).toHaveTextContent('Details: running')
    expect(rows[1]).toHaveClass('collapse')
    expect(rows[3]).toHaveTextContent('Details: error')
    expect(rows[3]).not.toHaveClass('collapse')
  })

  it.each([
    ['the last data row when its sub row is hidden', 'Dell02', 2],
    ['the last sub row when it is visible', 'Dell03', 3],
  ])('rounds the bottom corners on %s', (_, lastHostname, roundedIndex) => {
    render(
      <NodeTable rows={[nodes[0]!, { ...nodes[1]!, hostname: lastHostname }]}>
        <NodeTable.Column label="Hostname" property="hostname" />
        <NodeTable.SubRow isVisible={(row) => row.hostname === 'Dell03'}>
          <NodeTable.Column property="status" />
        </NodeTable.SubRow>
      </NodeTable>,
    )

    const rounded = getBodyRows().map((row) =>
      row.classList.contains('[&>td:first-of-type]:rounded-bl-[5px]'),
    )
    expect(rounded).toEqual([0, 1, 2, 3].map((i) => i === roundedIndex))
    // Rows no longer rely on `last-of-type`, which a collapsed row can match.
    getBodyRows().forEach((row) =>
      expect(row.className).not.toContain('[&:last-of-type'),
    )
  })

  it('exposes the table styles for hand-built tables', () => {
    expect(cubeTableStyles.table()).toContain('border-separate')
    expect(cubeTableStyles.th({ isTableEmpty: false })).toContain(
      'rounded-tl-[5px]',
    )
    expect(cubeTableStyles.td({ emphasize: true })).toContain('font-semibold')
    expect(cubeTableStyles.bodyTr()).toContain('hover:bg-functional-hover-grey')
    expect(cubeTableStyles.bodyTr()).toContain(
      '[&:last-of-type>td:first-of-type]:rounded-bl-[5px]',
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <NodeTable rows={nodes}>
        <NodeTable.Column label="Hostname" property="hostname" isSortable />
        <NodeTable.Column label="CPU" property="cpu" />
      </NodeTable>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
