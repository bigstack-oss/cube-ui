import {
  type ComponentProps,
  type ComponentType,
  Fragment,
  type PropsWithChildren,
  useMemo,
} from 'react'
import { twMerge } from 'tailwind-merge'
import {
  computeRowClassName,
  type CubeTableRow,
  type RowClassNameProp,
} from './cubeTableUtils'
import { CreateCubeTableColumn } from './rendering/CubeTableColumn'
import {
  bodyTrCellBorderRadiusClass,
  table,
  tableBodyTr,
} from './rendering/cubeTableStyles'
import { CubeTableTd } from './rendering/CubeTableTd'
import { CubeTableTdEmpty } from './rendering/CubeTableTdEmpty'
import { CubeTableTdSkeleton } from './rendering/CubeTableTdSkeleton'
import { CubeTableSubRow } from './rendering/CubeTableSubRow'
import { CubeTableTh } from './rendering/CubeTableTh'
import type { SortingState } from './sorting/sortingUtils'
import { useSortedRows } from './sorting/useSortedRows'
import { useColumnPayloads } from './useColumnPayloads'
import { useSubRows } from './useSubRows'

export type CubeBasicTableProps<Row extends CubeTableRow> = PropsWithChildren<{
  rows: Row[]
  defaultSortingState?: SortingState<Row>
  isLoading?: boolean
  /**
   * @default 5
   */
  skeletonRowCount?: number
  rowClassName?: RowClassNameProp<Row>
  onRowClick?: (row: Row) => void
}>

export const CubeBasicTable = <Row extends CubeTableRow>(
  props: CubeBasicTableProps<Row>,
) => {
  const {
    children,
    rows,
    defaultSortingState,
    isLoading,
    skeletonRowCount = 5,
    rowClassName,
    onRowClick,
  } = props

  const { columns, rowCompareFnMapRef } = useColumnPayloads<Row>(children)

  const subRows = useSubRows<Row>(children)

  const { sortedRows, sortingState, onSortDirectionChange } = useSortedRows(
    rows,
    columns,
    defaultSortingState,
    rowCompareFnMapRef,
  )

  const skeletonIndexes = useMemo<number[]>(() => {
    return Array.from(Array(skeletonRowCount).keys()).map((_, index) => index)
  }, [skeletonRowCount])

  const renderSkeletonRows = () => {
    return skeletonIndexes.map((rowIndex) => (
      <tr key={rowIndex} className={bodyTrCellBorderRadiusClass}>
        {columns.map((column, colIndex) => (
          <CubeTableTd
            key={`${column.property?.toString() ?? ''}-${colIndex}`}
            rowIndex={rowIndex}
            column={column}
            isLoading={isLoading}
          />
        ))}
      </tr>
    ))
  }

  const renderEmptyRow = () => (
    <tr>
      <CubeTableTdEmpty length={columns.length} />
    </tr>
  )

  // The last visible row rounds the table's bottom corners: the last data
  // row's last visible sub row, or the data row itself.
  const lastRow = sortedRows[sortedRows.length - 1]
  const lastVisibleSubRowIndex = lastRow
    ? subRows.map((subRow) => subRow.props.isVisible(lastRow)).lastIndexOf(true)
    : -1

  const renderDataRows = () => {
    if (sortedRows.length === 0) return renderEmptyRow()

    return sortedRows.map((row, rowIndex) => (
      <Fragment key={row.id}>
        <tr
          className={twMerge(
            tableBodyTr({
              roundedBottom: row === lastRow && lastVisibleSubRowIndex === -1,
            }),
            computeRowClassName(rowClassName, row),
          )}
          onClick={() => onRowClick?.(row)}
        >
          {columns.map((column, colIndex) => (
            <CubeTableTd
              key={`${column.property?.toString() ?? ''}-${colIndex}`}
              row={row}
              rowIndex={rowIndex}
              column={column}
            />
          ))}
        </tr>
        {renderSubRows(row)}
      </Fragment>
    ))
  }

  const renderSubRows = (parentRow: Row) => {
    if (!subRows.length) return undefined

    return subRows.map((subRow, subRowIndex) => {
      const { className, isVisible } = subRow.props
      return (
        <tr
          key={`${parentRow.id}-sub-row-${subRowIndex}`}
          className={twMerge(
            tableBodyTr({
              roundedBottom:
                parentRow === lastRow && subRowIndex === lastVisibleSubRowIndex,
            }),
            computeRowClassName(className, parentRow),
            // `collapse` removes a hidden sub row from the layout, while its
            // content still counts toward the column widths.
            !isVisible(parentRow) && 'collapse',
          )}
        >
          {subRow.columns.map((column, columnIndex) => (
            <CubeTableTd
              key={columnIndex}
              row={parentRow}
              rowIndex={subRowIndex}
              column={column}
            />
          ))}
        </tr>
      )
    })
  }

  return (
    <div className="overflow-auto">
      <table className={table()}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <CubeTableTh
                key={`${column.property?.toString() ?? ''}-${index}`}
                column={column}
                sortingState={sortingState}
                onSortClick={() => onSortDirectionChange(column.property!)}
                isTableEmpty={sortedRows.length === 0}
              />
            ))}
          </tr>
        </thead>
        <tbody>{isLoading ? renderSkeletonRows() : renderDataRows()}</tbody>
      </table>
    </div>
  )
}

CubeBasicTable.Column = CreateCubeTableColumn()
CubeBasicTable.SubRow = CubeTableSubRow
CubeBasicTable.TdSkeleton = CubeTableTdSkeleton

type CubeBasicTableWithColumn<Row extends CubeTableRow> =
  // Use `ComponentType` with `ComponentProps` on `CubeBasicTable<Row>` to
  // exclude the compound members attached above (`Column`, `SubRow`, `TdSkeleton`).
  // `Omit` doesn't work here because it would prevent the return type from
  // being a valid JSX element.
  //
  // This ensures TypeScript can correctly infer the `row` type in column render functions
  // when no explicit column properties are provided (e.g., `<MyTable.Column>{(_, row) => ...}</MyTable.Column>`).
  //
  // Without this adjustment, TS would infer the row as`CubeTableRow` instead of
  // the generic type specified by the user.
  ComponentType<ComponentProps<typeof CubeBasicTable<Row>>> & {
    Column: ReturnType<typeof CreateCubeTableColumn<Row>>
    SubRow: typeof CubeTableSubRow<Row>
    TdSkeleton: typeof CubeTableTdSkeleton
  }

// Function ensuring the table row type is assigned.
export const GetCubeBasicTable = <
  Row extends CubeTableRow,
>(): CubeBasicTableWithColumn<Row> => {
  return CubeBasicTable as unknown as CubeBasicTableWithColumn<Row>
}
