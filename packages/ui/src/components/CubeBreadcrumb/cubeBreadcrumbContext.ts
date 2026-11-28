import { createContext } from 'react'

/** The breadcrumb's test ID, so each item can derive `<test-id>-item`. */
export const CubeBreadcrumbTestIdContext = createContext<string | undefined>(
  undefined,
)
