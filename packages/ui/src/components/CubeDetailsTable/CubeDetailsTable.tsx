import type { ReactNode } from 'react'
import { table } from '../CubeBasicTable/rendering/cubeTableStyles'
import { detailsTableHeader } from './cubeDetailsTableStyles'
import { CubeDetailsTableRow } from './CubeDetailsTableRow'

export type CubeDetailsTableProps = {
  header: string
  children: ReactNode
}

export const CubeDetailsTable = (props: CubeDetailsTableProps) => {
  const { header, children } = props

  return (
    <div className="overflow-auto">
      <table className={table()}>
        <thead>
          <tr>
            <th className={detailsTableHeader()} colSpan={2}>
              {header}
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

CubeDetailsTable.Row = CubeDetailsTableRow
