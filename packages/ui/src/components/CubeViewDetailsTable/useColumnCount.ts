import { Children, type ReactNode, useEffect, useState } from 'react'
import {
  type CubeTableRow,
  isCubeTableColumn,
} from '../CubeBasicTable/cubeTableUtils'

// CubeViewDetailsTable is built on top of CubeBasicTable, so passing the column
// count from the base (CubeBasicTable) up to CubeViewDetailsTable (or any other
// table built on top of it) would take extra effort.
// To keep things simple, we calculate the column count here for now.
export const useColumnCount = (children: ReactNode): number => {
  const [columnCount, setColumnCount] = useState(0)

  useEffect(() => {
    const columnNodeCount = Children.toArray(children).filter((child) => {
      return isCubeTableColumn<CubeTableRow>(child)
    }).length
    setColumnCount(columnNodeCount)
  }, [children])

  return columnCount
}
