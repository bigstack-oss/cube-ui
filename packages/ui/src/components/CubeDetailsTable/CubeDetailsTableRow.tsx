import { useContext } from 'react'
import type { CubeTestKeyProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
import { CubeDetailsTableTestIdContext } from './cubeDetailsTableContext'
import { detailsTableCell, detailsTableRow } from './cubeDetailsTableStyles'

export type CubeDetailsTableRowProps = {
  title: string
  children: string
} & CubeTestKeyProps

export const CubeDetailsTableRow = (props: CubeDetailsTableRowProps) => {
  const { title, children, 'data-key': keyProp } = props

  const testId = useContext(CubeDetailsTableTestIdContext)

  return (
    <tr
      className={detailsTableRow()}
      data-testid={testIdOf(testId, 'row')}
      // The title is shown (and translated), so a key can stand in for it.
      data-key={testId ? (keyProp ?? title) : undefined}
    >
      <th className={detailsTableCell({ type: 'title' })}>{title}</th>
      <td
        className={detailsTableCell({ type: 'content' })}
        data-testid={testIdOf(testId, 'value')}
      >
        {children}
      </td>
    </tr>
  )
}
