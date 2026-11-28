import { createContext } from 'react'

/** The tab bar's test ID, so each tab can derive `<test-id>-tab`. */
export const CubeTabsTestIdContext = createContext<string | undefined>(
  undefined,
)
