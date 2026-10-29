import type { CubeTableRow } from '../cubeTableUtils'
import type { CubeTableColumnProps } from './CubeTableColumn'
import { CubeTableTdSkeleton } from './CubeTableTdSkeleton'
import { tableTd } from './cubeTableStyles'

export type CubeTableTdProps<Row extends CubeTableRow> = {
  row?: Row
  rowIndex: number
  column: CubeTableColumnProps<Row, keyof Row | never>
  isLoading?: boolean
}

export const CubeTableTd = <Row extends CubeTableRow>(
  props: CubeTableTdProps<Row>,
) => {
  const { row, rowIndex, column, isLoading } = props

  const getEmphasize = (): boolean | undefined => {
    const { emphasize } = column
    if (emphasize === undefined || !row) {
      return undefined
    }
    if (typeof emphasize === 'function') {
      return emphasize(row)
    }
    return emphasize
  }

  const renderContent = () => {
    if (!row) {
      return undefined
    }

    const { children, property } = column

    const propertyValue = property ? row[property] : undefined

    if (typeof children === 'function') {
      return children(
        propertyValue as typeof property extends keyof Row
          ? Row[keyof Row]
          : undefined,
        row,
        rowIndex,
      )
    } else if (children) {
      return children
    }

    return propertyValue?.toString()
  }

  return (
    <td
      className={tableTd({
        emphasize: getEmphasize(),
        fitContent: column.fitContent,
      })}
      colSpan={column.colSpan}
    >
      {isLoading ? (
        <CubeTableTdSkeleton variant={column.skeletonVariant ?? 'regular'} />
      ) : (
        renderContent()
      )}
    </td>
  )
}
