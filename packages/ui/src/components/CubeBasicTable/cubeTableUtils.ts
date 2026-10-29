import { isValidElement, type ReactElement, type ReactNode } from 'react'
import type { ClassNameValue } from 'tailwind-merge'
import type { CubeTableColumnProps } from './rendering/CubeTableColumn'
import type { CubeTableSubRowProps } from './rendering/CubeTableSubRow'

export type CubeTableRow = {
  id: string
}

export const CUBE_TABLE_COLUMN_SYMBOL = Symbol('CubeTableColumn')

export const CUBE_TABLE_SUB_ROW_SYMBOL = Symbol('CubeTableSubRow')

export const isCubeTableColumn = <Row extends CubeTableRow>(
  node: ReactNode,
): node is ReactElement<CubeTableColumnProps<Row, keyof Row | never>> => {
  if (!isValidElement(node)) {
    return false
  }
  return (
    typeof node.type === 'function' && CUBE_TABLE_COLUMN_SYMBOL in node.type
  )
}

export const isCubeTableSubRow = <ParentRow extends CubeTableRow>(
  node: ReactNode,
): node is ReactElement<CubeTableSubRowProps<ParentRow>> => {
  if (!isValidElement(node)) {
    return false
  }
  return (
    typeof node.type === 'function' && CUBE_TABLE_SUB_ROW_SYMBOL in node.type
  )
}

export type RowClassNameProp<Row extends CubeTableRow> =
  | ClassNameValue
  | ((row: Row) => ClassNameValue)

export type ColumnEmphasizeProp<Row extends CubeTableRow> =
  | boolean
  | ((row: Row) => boolean)

export const computeRowClassName = <Row extends CubeTableRow>(
  prop: RowClassNameProp<Row> | undefined,
  row: Row,
): ClassNameValue => {
  if (typeof prop === 'function') {
    return prop(row)
  }
  return prop
}
