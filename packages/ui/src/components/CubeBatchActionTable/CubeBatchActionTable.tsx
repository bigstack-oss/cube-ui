import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { testIdOf } from '@utils/testId'
import {
  CubeBasicTable,
  GetCubeBasicTable,
} from '../CubeBasicTable/CubeBasicTable'
import { computeRowClassName } from '../CubeBasicTable/cubeTableUtils'
import type { CreateCubeTableColumn } from '../CubeBasicTable/rendering/CubeTableColumn'
import { CubeCheckbox } from '../CubeCheckbox/CubeCheckbox'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { batchActionTableRow } from './cubeBatchActionTableStyles'
import type {
  CubeBatchActionTableProps,
  CubeBatchActionTableRow,
} from './cubeBatchActionTableTypes'
import { useHeaderCheckboxStatus } from './useHeaderCheckboxStatus'

export const CubeBatchActionTable = <Row extends CubeBatchActionTableRow>(
  props: CubeBatchActionTableProps<Row>,
) => {
  const {
    children,
    rows,
    rowClassName,
    selectedRowIds,
    disabledRowIds = [],
    onCheckChange,
    showHeaderCheckbox,
    ...restProps
  } = props

  const { t } = useCubeUiTranslation()

  // Both also pass through to the basic table, which tags the rows.
  const testId = restProps['data-testid'] || undefined
  const rowTestKeyOf = (row: Row) =>
    testId ? (restProps.getRowTestKey?.(row) ?? row.id) : undefined

  const TypedBasicTable = GetCubeBasicTable<Row>()

  const selectedRowIdSet = useMemo(
    () => new Set(selectedRowIds),
    [selectedRowIds],
  )

  const disabledRowIdSet = useMemo(
    () => new Set(disabledRowIds),
    [disabledRowIds],
  )

  const convertedRows: Row[] = useMemo(
    () =>
      rows.map((row) => ({
        ...row,
        checked: selectedRowIdSet.has(row.id),
        disabled: disabledRowIdSet.has(row.id),
      })),
    [rows, selectedRowIdSet, disabledRowIdSet],
  )

  const evaluateRowClassName = (row: Row): string => {
    return twMerge(
      batchActionTableRow({
        isChecked: selectedRowIdSet?.has(row.id),
        isDisabled: disabledRowIdSet?.has(row.id),
      }),
      computeRowClassName(rowClassName, row),
    )
  }

  const checkboxStatus = useHeaderCheckboxStatus(
    convertedRows,
    selectedRowIdSet,
  )

  const renderHeaderCheckbox = () => {
    if (!showHeaderCheckbox) return null

    const { onAllCheckChange, isLoading } = props

    if (isLoading) return <CubeSkeleton className="size-4 rounded-[3px]" />

    return (
      <CubeCheckbox
        checked={checkboxStatus}
        onChange={(e) => onAllCheckChange(e.target.checked)}
        aria-label={t('component.table.selectAllRows')}
        data-testid={testIdOf(testId, 'all')}
      />
    )
  }

  return (
    <TypedBasicTable
      {...restProps}
      rows={convertedRows}
      rowClassName={evaluateRowClassName}
    >
      <TypedBasicTable.Column
        label={renderHeaderCheckbox()}
        fitContent={true}
        data-column="select"
      >
        {(_, row) => {
          if (row.disabled) return null

          return (
            <CubeCheckbox
              checked={row.checked}
              onChange={(e) => onCheckChange(row.id, e.target.checked)}
              aria-label={t('component.table.selectRow')}
              data-testid={testIdOf(testId, 'select')}
              data-key={rowTestKeyOf(row)}
            />
          )
        }}
      </TypedBasicTable.Column>
      {children}
    </TypedBasicTable>
  )
}

CubeBatchActionTable.Column = CubeBasicTable.Column

type CubeBatchActionTableWithColumn<Row extends CubeBatchActionTableRow> =
  typeof CubeBatchActionTable<Row> & {
    Column: ReturnType<typeof CreateCubeTableColumn<Row>>
  }

export const GetCubeBatchActionTable = <
  Row extends CubeBatchActionTableRow,
>(): CubeBatchActionTableWithColumn<Row> => {
  return CubeBatchActionTable as CubeBatchActionTableWithColumn<Row>
}
