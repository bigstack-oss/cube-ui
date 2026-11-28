import { testIdOf } from '@utils/testId'
import { columnTestKeyOf, type CubeTableRow } from '../cubeTableUtils'
import type { SortingState } from '../sorting/sortingUtils'
import type { CubeTableColumnProps } from './CubeTableColumn'
import { SortingArrow } from './SortingArrow'
import { tableTh } from './cubeTableStyles'

export type CubeTableThProps<Row extends CubeTableRow> = {
  column: CubeTableColumnProps<Row, keyof Row | never>
  sortingState: SortingState<Row> | undefined
  onSortClick: () => void
  isTableEmpty?: boolean
  /** The table's test ID; the header is `<test-id>-header`. */
  testId?: string
}

export const CubeTableTh = <Row extends CubeTableRow>(
  props: CubeTableThProps<Row>,
) => {
  const {
    column,
    sortingState,
    onSortClick,
    isTableEmpty = false,
    testId,
  } = props

  return (
    <th
      className={tableTh({ isTableEmpty })}
      data-testid={testIdOf(testId, 'header')}
      data-column={testId ? columnTestKeyOf(column) : undefined}
    >
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
            testId={testIdOf(testId, 'sort')}
          />
        )}
      </span>
    </th>
  )
}
