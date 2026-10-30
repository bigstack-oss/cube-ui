import { detailsTableCell, detailsTableRow } from './cubeDetailsTableStyles'

export type CubeDetailsTableRowProps = {
  title: string
  children: string
}

export const CubeDetailsTableRow = (props: CubeDetailsTableRowProps) => {
  const { title, children } = props

  return (
    <tr className={detailsTableRow()}>
      <th className={detailsTableCell({ type: 'title' })}>{title}</th>
      <td className={detailsTableCell({ type: 'content' })}>{children}</td>
    </tr>
  )
}
