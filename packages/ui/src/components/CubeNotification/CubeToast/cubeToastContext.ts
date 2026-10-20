import { createContext } from 'react'
import type { CubeToastType } from './cubeToastUtils'

export type CubeToastContextValue = {
  addToast: (toast: CubeToastType) => void
  removeToast: (id: string) => void
}

export const CubeToastContext = createContext<CubeToastContextValue>({
  addToast: () => {},
  removeToast: () => {},
})
