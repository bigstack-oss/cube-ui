import type { CubeTableRow } from '../cubeTableUtils'
import type { SortingState } from '../sorting/sortingUtils'
import type { CubeTableColumnProps } from './CubeTableColumn'
import { SortingArrow } from './SortingArrow'
import { tableTh } from './cubeTableStyles'

export type CubeTableThProps<Row extends CubeTableRow> = {
  column: CubeTableColumnProps<Row, keyof Row | never>
  sortingState: SortingState<Row> | undefined
  onSortClick: () => void
  isTableEmpty?: boolean
}

export const CubeTableTh = <Row extends CubeTableRow>(
  props: CubeTableThProps<Row>,
) => {
  const { column, sortingState, onSortClick, isTableEmpty = false } = props

  return (
    <th className={tableTh({ isTableEmpty })}>
      <span className="flex items-center gap-x-2 whitespace-nowrap">
        {column.label}
        {column.isSortable && column.property && (
          <SortingArrow
            direction={
              sortingState?.property === column.property
                ? sortingState?.direction
                : undefined
            }
            onClick={onSortClick}
          />
        )}
      </span>
    </th>
  )
}
