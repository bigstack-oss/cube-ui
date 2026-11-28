import { createContext } from 'react'

/** The table's test ID, so each row can derive `<test-id>-row` and `-value`. */
export const CubeDetailsTableTestIdContext = createContext<string | undefined>(
  undefined,
)
