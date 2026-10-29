import type { ReactNode } from 'react'
import {
  type ColumnEmphasizeProp,
  CUBE_TABLE_COLUMN_SYMBOL,
  type CubeTableRow,
} from '../cubeTableUtils'
import type { ColumnCompareFnMap } from '../sorting/sortingUtils'

export type CubeTableColumnSkeletonVariant =
  | 'regular'
  | 'subtext-vertical'
  | 'subtext-horizontal'
  | 'icon-left'
  | 'icon-right'
  | 'icon-vertical'
  | 'icon-only'
  | 'with-barchart'
  | 'status'

export type CubeTableColumnProps<
  Row extends CubeTableRow,
  Property extends keyof Row | never,
> = {
  label?: ReactNode
  property?: Property
  emphasize?: ColumnEmphasizeProp<Row>
  fitContent?: boolean
  isSortable?: boolean
  /**
   * Function that determines whether the two elements are sorted.
   */
  sortingCompareFnMap?: Property extends keyof Row
    ? ColumnCompareFnMap<Row[Property]>
    : never
  children?:
    | ReactNode
    | ((
        propertyValue: Property extends keyof Row ? Row[Property] : undefined,
        row: Row,
        rowIndex: number,
      ) => ReactNode)
  /**
   * @default 'regular'
   */
  skeletonVariant?: CubeTableColumnSkeletonVariant
  /**
   * @default undefined
   */
  colSpan?: number
}

// Wrapper function to help TypeScript correctly infer the type of `Row[Property]`.
export const CreateCubeTableColumn = <Row extends CubeTableRow>() => {
  type ColumnProps<Property extends keyof Row | never> = CubeTableColumnProps<
    Row,
    Property
  >

  const CubeTableColumn = <Property extends keyof Row | never = never>(
    _props: ColumnProps<Property>,
  ) => {
    // The column component defines the schema for a table column, including its
    // headers and body cells.
    // The actual rendering logic is handled by the table component.
    return undefined
  }

  CubeTableColumn[CUBE_TABLE_COLUMN_SYMBOL] = true

  return CubeTableColumn
}
