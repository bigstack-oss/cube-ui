import type { ReactNode } from 'react'
import { detailCellContainer } from './cubeViewDetailsTableStyles'

type CustomizedDetailCellProps = {
  isExpanded: boolean
  children: ReactNode
}

export const CustomizedDetailCell = (props: CustomizedDetailCellProps) => {
  const { isExpanded, children } = props

  /**
   * A collapsed cell only sets `max-h-0`, so children stay in the DOM and keep
   * reporting their width. The parent table uses `table-layout: auto`, which
   * sizes every column from the widest cell content — a wide detail table then
   * stretches the card row and pushes the last column, the overflow menu, far
   * off screen. Mount the children on expand so a collapsed row costs nothing.
   */
  return (
    <div className={detailCellContainer({ isExpanded })}>
      {isExpanded && children}
    </div>
  )
}
