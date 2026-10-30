import type { ReactNode } from 'react'
import type { CubeBasicTableProps } from '../CubeBasicTable/CubeBasicTable'
import type { CubeTableRow } from '../CubeBasicTable/cubeTableUtils'

export type CubeViewDetailsTableDetailItem = {
  title: string
  value: string | number
}

export type CubeViewDetailsTableProps<ParentRow extends CubeTableRow> = Omit<
  CubeBasicTableProps<ParentRow> & {
    expandedRowIdSet: Set<string>
    onExpandChange: (parentRowId: string, value: boolean) => void
    detailTitle?: string | ((parentRow: ParentRow) => string)
    getDetailItems?: (parentRow: ParentRow) => CubeViewDetailsTableDetailItem[]
    getCustomizedDetailCell?: (parentRow: ParentRow) => ReactNode
    beforeExpandButton?: (parentRow: ParentRow) => ReactNode
    isRowExpandDisabled?: (row: ParentRow) => boolean
  },
  'rowClassName'
>
