import { act, render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import { GetCubeViewDetailsTable } from './CubeViewDetailsTable'
import type { CubeViewDetailsTableProps } from './cubeViewDetailsTableTypes'
import { useExpandedRowIdSet } from './useExpandedRowIdSet'

type License = {
  id: string
  product: string
  quantity: number
}

const LicenseTable = GetCubeViewDetailsTable<License>()

const licenses: License[] = [
  { id: '1', product: 'CubeCOS', quantity: 1 },
  { id: '2', product: 'CubeCMP', quantity: 2 },
]

const getDetailItems = (license: License) => [
  { title: 'Quantity', value: license.quantity },
]

type TableProps = Partial<CubeViewDetailsTableProps<License>>

const renderTable = (props: TableProps = {}) =>
  render(
    <LicenseTable
      rows={licenses}
      expandedRowIdSet={new Set()}
      onExpandChange={() => {}}
      getDetailItems={getDetailItems}
      {...props}
    >
      <LicenseTable.Column label="Product" property="product" />
    </LicenseTable>,
  )

// Data rows and their sub rows alternate: [data 1, sub 1, data 2, sub 2].
const getBodyRows = () => screen.getAllByRole('row').slice(1)

const getExpandButtons = () =>
  screen.getAllByRole('button', { name: 'Row Details' })

describe('CubeViewDetailsTable', () => {
  it('adds an expand button column before the data columns', () => {
    renderTable()

    // The expand column's header is visually hidden but named.
    expect(
      screen.getAllByRole('columnheader').map((th) => th.textContent),
    ).toEqual(['Row Details', 'Product'])
    expect(screen.getByText('Row Details', { selector: 'span' })).toHaveClass(
      'sr-only',
    )
    expect(getExpandButtons()).toHaveLength(2)
    getExpandButtons().forEach((button) =>
      expect(button).toHaveAttribute('aria-expanded', 'false'),
    )
  })

  it('reports the next expanded value when the button is clicked', async () => {
    const user = userEvent.setup()
    const onExpandChange = vi.fn()
    renderTable({ expandedRowIdSet: new Set(['2']), onExpandChange })

    const [first, second] = getExpandButtons()
    await user.click(first!)
    expect(onExpandChange).toHaveBeenLastCalledWith('1', true)

    await user.click(second!)
    expect(onExpandChange).toHaveBeenLastCalledWith('2', false)
  })

  it('shows the details of an expanded row only', () => {
    renderTable({
      expandedRowIdSet: new Set(['1']),
      detailTitle: 'License Detail',
    })

    const [parent, sub, , collapsedSub] = getBodyRows()
    expect(getExpandButtons()[0]).toHaveAttribute('aria-expanded', 'true')
    expect(parent).toHaveClass('[&>td]:bg-functional-hover-secondary')
    expect(sub).toHaveTextContent('License Detail')
    expect(sub).toHaveTextContent('Quantity1')
    expect(sub).toHaveClass('[&>td]:bg-scene-background')
    expect(sub).not.toHaveClass('collapse')
    expect(collapsedSub).toHaveClass('collapse', '[&>td]:border-none')
  })

  it('spans the details across every data column', () => {
    render(
      <LicenseTable
        rows={licenses}
        expandedRowIdSet={new Set(['1'])}
        onExpandChange={() => {}}
        getDetailItems={getDetailItems}
      >
        <LicenseTable.Column label="Product" property="product" />
        <LicenseTable.Column label="Quantity" property="quantity" />
      </LicenseTable>,
    )

    const cells = getBodyRows()[1]!.querySelectorAll('td')
    expect(cells).toHaveLength(2)
    expect(cells[1]).toHaveAttribute('colspan', '2')
  })

  it('computes the detail title per row', () => {
    renderTable({
      expandedRowIdSet: new Set(['1', '2']),
      detailTitle: (license) => `${license.product} detail`,
    })

    expect(screen.getByText('CubeCOS detail')).toBeInTheDocument()
    expect(screen.getByText('CubeCMP detail')).toBeInTheDocument()
  })

  it('mounts customized detail content only when expanded', () => {
    renderTable({
      getDetailItems: undefined,
      expandedRowIdSet: new Set(['2']),
      getCustomizedDetailCell: (license) => <p>Custom {license.product}</p>,
    })

    expect(screen.queryByText('Custom CubeCOS')).not.toBeInTheDocument()
    expect(screen.getByText('Custom CubeCMP')).toBeInTheDocument()
  })

  it('disables the expand button per row', async () => {
    const user = userEvent.setup()
    const onExpandChange = vi.fn()
    renderTable({
      onExpandChange,
      isRowExpandDisabled: (license) => license.product === 'CubeCMP',
    })

    const [enabled, disabled] = getExpandButtons()
    expect(enabled).toBeEnabled()
    expect(disabled).toBeDisabled()
    expect(disabled).toHaveClass('cursor-not-allowed')

    await user.click(disabled!)
    expect(onExpandChange).not.toHaveBeenCalled()
  })

  it('renders content before the expand button', () => {
    renderTable({
      beforeExpandButton: (license) => <span>New {license.product}</span>,
    })

    const marker = screen.getByText('New CubeCOS')
    expect(marker.nextElementSibling).toBe(getExpandButtons()[0])
  })

  it('warns when no detail content is provided', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    renderTable({ getDetailItems: undefined })

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('must be provided'),
    )
    warn.mockRestore()
  })

  it('renders an icon-only skeleton for the expand column while loading', () => {
    renderTable({ isLoading: true })

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const firstCell = getBodyRows()[0]!.querySelector('td')
    expect(firstCell?.querySelector('.cube-skeleton')).toHaveClass('size-4')
  })

  it('expands and collapses rows with useExpandedRowIdSet', async () => {
    const user = userEvent.setup()
    const Table = () => {
      const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()
      return (
        <LicenseTable
          rows={licenses}
          expandedRowIdSet={expandedRowIdSet}
          onExpandChange={onExpandChange}
          getDetailItems={getDetailItems}
        >
          <LicenseTable.Column label="Product" property="product" />
        </LicenseTable>
      )
    }
    render(<Table />)

    const [button] = getExpandButtons()
    await user.click(button!)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(getBodyRows()[1]).not.toHaveClass('collapse')

    await user.click(button!)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(getBodyRows()[1]).toHaveClass('collapse')
  })

  it('resets the expanded rows', () => {
    const { result } = renderHook(() => useExpandedRowIdSet())

    act(() => {
      result.current.onExpandChange('1', true)
      result.current.onExpandChange('2', true)
    })
    expect([...result.current.expandedRowIdSet]).toEqual(['1', '2'])

    act(() => result.current.resetExpandedRowIdSet())
    expect(result.current.expandedRowIdSet.size).toBe(0)
  })

  it('translates the expand button label', async () => {
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <LicenseTable
          rows={licenses.slice(0, 1)}
          expandedRowIdSet={new Set()}
          onExpandChange={() => {}}
          getDetailItems={getDetailItems}
        >
          <LicenseTable.Column label="Product" property="product" />
        </LicenseTable>
      </CubeUiLocaleProvider>,
    )

    expect(
      await screen.findByRole('button', { name: '詳細資料' }),
    ).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderTable({ expandedRowIdSet: new Set(['1']) })

    expect(await axe(container)).toHaveNoViolations()
  })
})
