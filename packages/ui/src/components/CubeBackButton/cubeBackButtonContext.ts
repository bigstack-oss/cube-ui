import { createContext } from 'react'

export type CubeBackButtonContextValue = {
  isLoading: boolean
  /** The consumer's test ID; each part derives its own from it. */
  testId?: string
}

export const CubeBackButtonContext = createContext<CubeBackButtonContextValue>({
  isLoading: false,
  testId: undefined,
})
