import type { ReactNode } from 'react'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
import { table } from '../CubeBasicTable/rendering/cubeTableStyles'
import { CubeDetailsTableTestIdContext } from './cubeDetailsTableContext'
import { detailsTableHeader } from './cubeDetailsTableStyles'
import { CubeDetailsTableRow } from './CubeDetailsTableRow'

export type CubeDetailsTableProps = {
  header: string
  children: ReactNode
} & CubeTestIdProps

export const CubeDetailsTable = (props: CubeDetailsTableProps) => {
  const { header, children, 'data-testid': testIdProp } = props

  const testId = testIdProp || undefined

  return (
    <CubeDetailsTableTestIdContext.Provider value={testId}>
      <div className="overflow-auto">
        <table className={table()} data-testid={testId}>
          <thead>
            <tr>
              <th
                className={detailsTableHeader()}
                colSpan={2}
                data-testid={testIdOf(testId, 'header')}
              >
                {header}
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </CubeDetailsTableTestIdContext.Provider>
  )
}

CubeDetailsTable.Row = CubeDetailsTableRow
