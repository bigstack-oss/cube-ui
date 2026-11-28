import { createContext } from 'react'

type CubeOverflowMenuContextValue = {
  closeMenu: () => void
  /** The consumer's test ID; each part derives its own from it. */
  testId?: string
}

export const CubeOverflowMenuContext =
  createContext<CubeOverflowMenuContextValue>({
    closeMenu: () => undefined,
    testId: undefined,
  })
