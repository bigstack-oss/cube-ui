import {
  Children,
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { type CubeTableRow, isCubeTableColumn } from './cubeTableUtils'
import type { CubeTableColumnProps } from './rendering/CubeTableColumn'
import type { RowCompareFnMap } from './sorting/sortingUtils'

export type ColumnPayloads<Row extends CubeTableRow> = {
  columns: CubeTableColumnProps<Row, keyof Row | never>[]
  rowCompareFnMapRef: RefObject<RowCompareFnMap<Row>>
}

export const useColumnPayloads = <Row extends CubeTableRow>(
  children: ReactNode,
): ColumnPayloads<Row> => {
  const [columns, setColumns] = useState<
    CubeTableColumnProps<Row, keyof Row | never>[]
  >([])
  const rowCompareFnMapRef = useRef<RowCompareFnMap<Row>>({})

  useEffect(() => {
    const nextColumns: CubeTableColumnProps<Row, keyof Row>[] = []
    const nextRowCompareFnMap: RowCompareFnMap<Row> = {}

    Children.toArray(children).forEach((child) => {
      if (!isCubeTableColumn<Row>(child)) return

      const columnProps = child.props as CubeTableColumnProps<
        Row,
        keyof Row | never
      >
      nextColumns.push(columnProps)

      const { property, sortingCompareFnMap } = columnProps

      if (property) {
        nextRowCompareFnMap[property] = sortingCompareFnMap
      }
    })

    setColumns(nextColumns)
    rowCompareFnMapRef.current = nextRowCompareFnMap
  }, [children])

  return {
    columns,
    rowCompareFnMapRef,
  }
}
