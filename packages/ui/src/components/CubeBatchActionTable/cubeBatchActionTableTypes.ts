import type { CubeBasicTableProps } from '../CubeBasicTable/CubeBasicTable'
import type { CubeTableRow } from '../CubeBasicTable/cubeTableUtils'

export type CubeBatchActionTableRow = CubeTableRow & {
  checked?: boolean
  disabled?: boolean
}

export type CubeBatchActionTableProps<Row extends CubeBatchActionTableRow> =
  CubeBasicTableProps<Row> & {
    selectedRowIds: string[]
    disabledRowIds?: string[]
    onCheckChange: (rowId: string, checked: boolean) => void
  } & (
      | {
          showHeaderCheckbox: true
          onAllCheckChange: (checked: boolean) => void
        }
      | { showHeaderCheckbox: false }
    )
