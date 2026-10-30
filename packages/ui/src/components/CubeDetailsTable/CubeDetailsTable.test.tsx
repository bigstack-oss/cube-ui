import { render, screen, within } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeDetailsTable } from './CubeDetailsTable'

const renderTable = () =>
  render(
    <CubeDetailsTable header="License">
      <CubeDetailsTable.Row title="Product">CubeCOS</CubeDetailsTable.Row>
      <CubeDetailsTable.Row title="Status">Active</CubeDetailsTable.Row>
      <CubeDetailsTable.Row title="Feature">Standard</CubeDetailsTable.Row>
    </CubeDetailsTable>,
  )

describe('CubeDetailsTable', () => {
  it('renders the header across both columns', () => {
    renderTable()

    const header = screen.getByText('License')
    expect(header).toHaveAttribute('colspan', '2')
    expect(header).toHaveClass('bg-functional-text', 'text-grey-0')
  })

  it('renders a title and content per row', () => {
    renderTable()

    const rows = screen.getAllByRole('row').slice(1)
    expect(
      // The title is a `<th>` and the content a `<td>` (see the open issue on
      // the missing `scope="row"`, so the role isn't asserted here).
      rows.map((row) => [
        row.querySelector('th')?.textContent,
        within(row).getByRole('cell').textContent,
      ]),
    ).toEqual([
      ['Product', 'CubeCOS'],
      ['Status', 'Active'],
      ['Feature', 'Standard'],
    ])
  })

  it('styles the title as bold and the content as light text', () => {
    renderTable()

    expect(screen.getByText('Product')).toHaveClass(
      'font-semibold',
      'text-functional-text',
    )
    expect(screen.getByRole('cell', { name: 'CubeCOS' })).toHaveClass(
      'text-functional-text-light',
    )
  })

  it('gives every row the hover and rounded-corner classes', () => {
    renderTable()

    screen
      .getAllByRole('row')
      .slice(1)
      .forEach((row) =>
        expect(row).toHaveClass(
          '[&:hover>*]:bg-functional-hover-grey',
          '[&:last-of-type>*:first-child]:rounded-bl-[5px]',
        ),
      )
  })

  it('has no axe violations', async () => {
    const { container } = renderTable()

    expect(await axe(container)).toHaveNoViolations()
  })
})
