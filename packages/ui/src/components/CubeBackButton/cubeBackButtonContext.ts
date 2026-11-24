import { createContext } from 'react'

export type CubeBackButtonContextValue = {
  isLoading: boolean
}

export const CubeBackButtonContext = createContext<CubeBackButtonContextValue>({
  isLoading: false,
})
