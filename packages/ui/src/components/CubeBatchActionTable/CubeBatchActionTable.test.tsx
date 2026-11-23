import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import { GetCubeBatchActionTable } from './CubeBatchActionTable'
import type { CubeBatchActionTableProps } from './cubeBatchActionTableTypes'
import { useHeaderCheckboxStatus } from './useHeaderCheckboxStatus'

type Template = {
  id: string
  name: string
}

const TemplateTable = GetCubeBatchActionTable<Template>()

const templates: Template[] = [
  { id: '1', name: 'Admin alert' },
  { id: '2', name: 'User alert' },
  { id: '3', name: 'Maintenance' },
]

// Flat overrides: the props union (`showHeaderCheckbox` true or false) can't be
// made `Partial` as one object.
type TableProps = Partial<
  Omit<
    CubeBatchActionTableProps<Template>,
    'showHeaderCheckbox' | 'onAllCheckChange'
  >
> & {
  showHeaderCheckbox?: boolean
  onAllCheckChange?: (checked: boolean) => void
}

const renderTable = (props: TableProps = {}) => {
  const onCheckChange = vi.fn()
  const onAllCheckChange = vi.fn()
  const result = render(
    <TemplateTable
      rows={templates}
      selectedRowIds={[]}
      onCheckChange={onCheckChange}
      showHeaderCheckbox
      onAllCheckChange={onAllCheckChange}
      {...(props as object)}
    >
      <TemplateTable.Column label="Template" property="name" />
    </TemplateTable>,
  )
  return { ...result, onCheckChange, onAllCheckChange }
}

// Data rows only, skipping the header row.
const getBodyRows = () => screen.getAllByRole('row').slice(1)

const getRowCheckboxes = () =>
  screen.getAllByRole('checkbox', { name: 'Select Row' })

describe('CubeBatchActionTable', () => {
  it('adds a checkbox column before the data columns', () => {
    renderTable()

    expect(
      screen.getAllByRole('columnheader').map((th) => th.textContent),
    ).toEqual(['', 'Template'])
    expect(
      screen.getByRole('checkbox', { name: 'Select All Rows' }),
    ).toBeInTheDocument()
    expect(getRowCheckboxes()).toHaveLength(3)
  })

  it('checks the selected rows and highlights them', () => {
    renderTable({ selectedRowIds: ['2'] })

    const [first, second] = getRowCheckboxes()
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()
    expect(getBodyRows()[1]).toHaveClass('[&>td]:bg-functional-hover-secondary')
    expect(getBodyRows()[0]).not.toHaveClass(
      '[&>td]:bg-functional-hover-secondary',
    )
  })

  it('reports the next checked value of a row', async () => {
    const user = userEvent.setup()
    const { onCheckChange } = renderTable({ selectedRowIds: ['2'] })

    const [first, second] = getRowCheckboxes()
    await user.click(first!)
    expect(onCheckChange).toHaveBeenLastCalledWith('1', true)

    await user.click(second!)
    expect(onCheckChange).toHaveBeenLastCalledWith('2', false)
  })

  it('reports the header checkbox value', async () => {
    const user = userEvent.setup()
    const { onAllCheckChange, rerender } = renderTable()

    await user.click(screen.getByRole('checkbox', { name: 'Select All Rows' }))
    expect(onAllCheckChange).toHaveBeenLastCalledWith(true)

    rerender(
      <TemplateTable
        rows={templates}
        selectedRowIds={['1', '2', '3']}
        onCheckChange={() => {}}
        showHeaderCheckbox
        onAllCheckChange={onAllCheckChange}
      >
        <TemplateTable.Column label="Template" property="name" />
      </TemplateTable>,
    )
    const header = screen.getByRole('checkbox', { name: 'Select All Rows' })
    expect(header).toBeChecked()
    await user.click(header)
    expect(onAllCheckChange).toHaveBeenLastCalledWith(false)
  })

  it('shows no checkbox and dims disabled rows', () => {
    renderTable({ disabledRowIds: ['3'] })

    expect(getRowCheckboxes()).toHaveLength(2)
    expect(getBodyRows()[2]).toHaveClass(
      '[&>td]:bg-white',
      '[&>td]:text-functional-disable-text',
    )
  })

  it('hides the header checkbox', () => {
    renderTable({ showHeaderCheckbox: false, onAllCheckChange: undefined })

    expect(
      screen.queryByRole('checkbox', { name: 'Select All Rows' }),
    ).not.toBeInTheDocument()
    expect(getRowCheckboxes()).toHaveLength(3)
  })

  it('merges rowClassName with the selection classes', () => {
    renderTable({
      selectedRowIds: ['1'],
      rowClassName: (row) => (row.id === '1' ? 'font-bold' : undefined),
    })

    expect(getBodyRows()[0]).toHaveClass(
      'font-bold',
      '[&>td]:bg-functional-hover-secondary',
    )
  })

  it('renders skeletons instead of checkboxes while loading', () => {
    const { container } = renderTable({ isLoading: true })

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(
      container.querySelector('th .cube-skeleton.size-4'),
    ).toBeInTheDocument()
  })

  it('translates the checkbox labels', async () => {
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <TemplateTable
          rows={templates.slice(0, 1)}
          selectedRowIds={[]}
          onCheckChange={() => {}}
          showHeaderCheckbox
          onAllCheckChange={() => {}}
        >
          <TemplateTable.Column label="Template" property="name" />
        </TemplateTable>
      </CubeUiLocaleProvider>,
    )

    expect(
      await screen.findByRole('checkbox', { name: '全選' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: '選取此列' }),
    ).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderTable({
      selectedRowIds: ['1'],
      disabledRowIds: ['3'],
    })

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('useHeaderCheckboxStatus', () => {
  const rows = [{ id: '1' }, { id: '2' }, { id: '3', disabled: true }]

  it.each<[string, string[], boolean | null]>([
    ['nothing is selected', [], false],
    ['some enabled rows are selected', ['1'], null],
    ['every enabled row is selected', ['1', '2'], true],
  ])('is %s', (_, selected, expected) => {
    const { result } = renderHook(() =>
      useHeaderCheckboxStatus(rows, new Set(selected)),
    )

    expect(result.current).toBe(expected)
  })
})
