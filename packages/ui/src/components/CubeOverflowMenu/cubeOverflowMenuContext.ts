import { createContext } from 'react'

type CubeOverflowMenuContextValue = () => void

export const CubeOverflowMenuContext =
  createContext<CubeOverflowMenuContextValue>(() => undefined)
