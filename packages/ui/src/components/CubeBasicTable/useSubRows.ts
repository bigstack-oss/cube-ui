import { Children, type ReactNode, useEffect, useState } from 'react'
import {
  type CubeTableRow,
  isCubeTableColumn,
  isCubeTableSubRow,
} from './cubeTableUtils'
import type { CubeTableColumnProps } from './rendering/CubeTableColumn'
import type { CubeTableSubRowProps } from './rendering/CubeTableSubRow'

export type SubRow<ParentRow extends CubeTableRow> = {
  columns: CubeTableColumnProps<ParentRow, keyof ParentRow | never>[]
  props: CubeTableSubRowProps<ParentRow>
}

export const useSubRows = <ParentRow extends CubeTableRow>(
  tableChildren: ReactNode,
): SubRow<ParentRow>[] => {
  const [subRows, setSubRows] = useState<SubRow<ParentRow>[]>([])

  useEffect(() => {
    const nextSubRows: SubRow<ParentRow>[] = []

    Children.toArray(tableChildren).forEach((subRowNode) => {
      if (!isCubeTableSubRow<ParentRow>(subRowNode)) return

      const subRowColumns: CubeTableColumnProps<
        ParentRow,
        keyof ParentRow | never
      >[] = []

      Children.toArray(subRowNode.props.children).forEach((columnNode) => {
        if (!isCubeTableColumn<ParentRow>(columnNode)) return

        const columnProps = columnNode.props as CubeTableColumnProps<
          ParentRow,
          keyof ParentRow | never
        >
        subRowColumns.push(columnProps)
      })

      if (subRowColumns.length) {
        nextSubRows.push({
          columns: subRowColumns,
          props: subRowNode.props,
        })
      }
    })

    setSubRows(nextSubRows)
  }, [tableChildren])

  return subRows
}
