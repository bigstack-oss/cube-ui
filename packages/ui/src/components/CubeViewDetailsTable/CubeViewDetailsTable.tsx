import { MonochromeChevronDown } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { type ClassNameValue, twMerge } from 'tailwind-merge'
import {
  CubeBasicTable,
  GetCubeBasicTable,
} from '../CubeBasicTable/CubeBasicTable'
import type { CubeTableRow } from '../CubeBasicTable/cubeTableUtils'
import type { CreateCubeTableColumn } from '../CubeBasicTable/rendering/CubeTableColumn'
import { CubeTableSubRow } from '../CubeBasicTable/rendering/CubeTableSubRow'
import { CustomizedDetailCell } from './CustomizedDetailCell'
import { DetailCell } from './DetailCell'
import { expandButton } from './cubeViewDetailsTableStyles'
import type { CubeViewDetailsTableProps } from './cubeViewDetailsTableTypes'
import { useColumnCount } from './useColumnCount'

export const CubeViewDetailsTable = <ParentRow extends CubeTableRow>(
  props: CubeViewDetailsTableProps<ParentRow>,
) => {
  const {
    children,
    expandedRowIdSet,
    onExpandChange: onExpandChangeProp,
    detailTitle,
    getDetailItems,
    getCustomizedDetailCell,
    beforeExpandButton,
    isRowExpandDisabled,
    ...restProps
  } = props

  const { t } = useCubeUiTranslation()

  const TypedBasicTable = GetCubeBasicTable<ParentRow>()

  const columnCount = useColumnCount(children)

  const isExpanded = (parentRowId: string): boolean => {
    return expandedRowIdSet.has(parentRowId)
  }

  const onExpandChange = (parentRowId: string): void => {
    const value = !expandedRowIdSet.has(parentRowId)
    onExpandChangeProp(parentRowId, value)
  }

  const computeParentRowClassName = (row: ParentRow): ClassNameValue => {
    if (isExpanded(row.id)) {
      return twMerge(
        '[&>td]:bg-functional-hover-secondary',
        '[&>td]:hover:bg-functional-hover-secondary',
      )
    }
    return undefined
  }

  const computeSubRowClassName = (parentRow: ParentRow): ClassNameValue => {
    if (isExpanded(parentRow.id)) {
      return twMerge(
        '[&>td]:bg-scene-background',
        '[&>td]:hover:bg-scene-background',
      )
    }
    // Hide the border of sub-rows when collapsed because it's still visible
    // even when `max-height` is 0.
    return twMerge('[&>td]:border-none')
  }

  const computeDetailTitle = (parentRow: ParentRow): string | undefined => {
    if (typeof detailTitle === 'function') {
      return detailTitle(parentRow)
    }
    return detailTitle
  }

  const renderDetailCells = (row: ParentRow) => {
    if ('getDetailItems' in props && 'getDetailCells' in props) {
      console.warn(
        'Props "getDetailItems" and "getDetailCells" cannot be used at the same time. Please choose one.',
      )
    }

    if (getDetailItems) {
      return (
        <DetailCell
          isExpanded={isExpanded(row.id)}
          title={computeDetailTitle(row)}
          items={getDetailItems(row)}
        />
      )
    }

    if (getCustomizedDetailCell) {
      return (
        <CustomizedDetailCell isExpanded={isExpanded(row.id)}>
          {getCustomizedDetailCell(row)}
        </CustomizedDetailCell>
      )
    }

    console.warn(
      'One of the props "getDetailItems" and "getDetailCells" must be provided.',
    )

    return null
  }

  const renderExpandButton = (parentRow: ParentRow) => {
    const disabled = isRowExpandDisabled?.(parentRow) ?? false
    return (
      <div className="flex items-center">
        {beforeExpandButton?.(parentRow)}
        <button
          type="button"
          className={expandButton({
            isExpanded: isExpanded(parentRow.id),
            disabled,
          })}
          onClick={() => onExpandChange(parentRow.id)}
          disabled={disabled}
          aria-label={t('component.table.rowDetails')}
          aria-expanded={isExpanded(parentRow.id)}
        >
          <MonochromeChevronDown className="icon-md" />
        </button>
      </div>
    )
  }

  return (
    <TypedBasicTable {...restProps} rowClassName={computeParentRowClassName}>
      <TypedBasicTable.Column
        // A visually hidden header names the expand column for screen readers.
        label={
          <span className="sr-only">{t('component.table.rowDetails')}</span>
        }
        skeletonVariant="icon-only"
        fitContent={true}
      >
        {(_, parentRow) => renderExpandButton(parentRow)}
      </TypedBasicTable.Column>
      {children}
      <CubeTableSubRow
        className={computeSubRowClassName}
        isVisible={(row) => isExpanded(row.id)}
      >
        {/* Placeholder column for the expand button. */}
        <TypedBasicTable.Column />
        {/* Details column. */}
        <TypedBasicTable.Column colSpan={columnCount}>
          {(_, row) => renderDetailCells(row)}
        </TypedBasicTable.Column>
      </CubeTableSubRow>
    </TypedBasicTable>
  )
}

CubeViewDetailsTable.Column = CubeBasicTable.Column

type CubeViewDetailsTableWithColumn<ParentRow extends CubeTableRow> =
  typeof CubeViewDetailsTable<ParentRow> & {
    Column: ReturnType<typeof CreateCubeTableColumn<ParentRow>>
  }

export const GetCubeViewDetailsTable = <
  ParentRow extends CubeTableRow,
>(): CubeViewDetailsTableWithColumn<ParentRow> => {
  return CubeViewDetailsTable as CubeViewDetailsTableWithColumn<ParentRow>
}
