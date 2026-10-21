import { Fragment, type ReactNode } from 'react'
import { LabelText } from './LabelText'
import { SubHeading } from './SubHeading'

export type GalleryMatrixRow<Row> = {
  title: string
  value: Row
}

export type GalleryMatrixCell<RowGroup, Row, ColumnGroup, Column> = {
  rowGroup: RowGroup
  row: Row
  columnGroup: ColumnGroup
  column: Column
}

export type GalleryMatrixProps<
  RowGroup extends string,
  Row,
  ColumnGroup extends string,
  Column extends string,
> = {
  /**
   * Outer row labels, e.g. sizes. Each group repeats every row.
   */
  rowGroups: readonly RowGroup[]
  /**
   * Inner rows, e.g. states (`Default`, `Disabled`).
   */
  rows: readonly GalleryMatrixRow<Row>[]
  /**
   * Outer column labels, e.g. types. Omit for a single, unlabelled group.
   */
  columnGroups?: readonly ColumnGroup[]
  /**
   * Inner column labels, e.g. usages. Repeated under each column group.
   */
  columns: readonly Column[]
  renderCell: (
    cell: GalleryMatrixCell<RowGroup, Row, ColumnGroup | undefined, Column>,
  ) => ReactNode
}

/**
 * A full Gallery cross-product: row groups × rows down, column groups ×
 * columns across. Use it where a section must keep every combination the
 * component can show (e.g. Button's type × size × state × usage).
 */
export const GalleryMatrix = <
  RowGroup extends string,
  Row,
  ColumnGroup extends string,
  Column extends string,
>(
  props: GalleryMatrixProps<RowGroup, Row, ColumnGroup, Column>,
) => {
  const { rowGroups, rows, columnGroups, columns, renderCell } = props

  const groups: readonly (ColumnGroup | undefined)[] = columnGroups ?? [
    undefined,
  ]
  const columnSpan = { gridColumn: `span ${columns.length}` }

  return (
    <div
      className="grid items-center gap-x-6 gap-y-4"
      style={{
        // Every track hugs its content, so labels sit next to their cells.
        gridTemplateColumns: `repeat(${groups.length * columns.length + 2}, max-content)`,
      }}
    >
      {columnGroups && (
        <>
          <span className="col-span-2" />
          {columnGroups.map((group) => (
            <div key={group} style={columnSpan}>
              <SubHeading className="text-center">{group}</SubHeading>
            </div>
          ))}
        </>
      )}
      <span className="col-span-2" />
      {groups.map((group) =>
        columns.map((column) => (
          <LabelText key={`${group}-${column}`}>{column}</LabelText>
        )),
      )}
      {rowGroups.map((rowGroup) =>
        rows.map((row, rowIndex) => (
          <Fragment key={`${rowGroup}-${row.title}`}>
            {/* Spans this group's rows, so each row lines up beside it. */}
            {rowIndex === 0 && (
              <div className="pr-4" style={{ gridRow: `span ${rows.length}` }}>
                <SubHeading>{rowGroup}</SubHeading>
              </div>
            )}
            <LabelText>{row.title}</LabelText>
            {groups.map((columnGroup) =>
              columns.map((column) => (
                <div
                  key={`${columnGroup}-${column}`}
                  className="flex items-center whitespace-nowrap"
                >
                  {renderCell({
                    rowGroup,
                    row: row.value,
                    columnGroup,
                    column,
                  })}
                </div>
              )),
            )}
          </Fragment>
        )),
      )}
    </div>
  )
}
