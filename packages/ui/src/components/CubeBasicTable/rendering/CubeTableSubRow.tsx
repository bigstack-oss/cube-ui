import type { ReactNode } from 'react'
import {
  CUBE_TABLE_SUB_ROW_SYMBOL,
  type CubeTableRow,
  type RowClassNameProp,
} from '../cubeTableUtils'

export type CubeTableSubRowProps<ParentRow extends CubeTableRow> = {
  className?: RowClassNameProp<ParentRow>
  children: ReactNode
  isVisible: (parentRow: ParentRow) => boolean
}

export const CubeTableSubRow = <ParentRow extends CubeTableRow>(
  _props: CubeTableSubRowProps<ParentRow>,
) => {
  // The actual rendering logic is handled by CubeBasicTable.
  return undefined
}

CubeTableSubRow[CUBE_TABLE_SUB_ROW_SYMBOL] = true
