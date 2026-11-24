import { createContext } from 'react'
import type {
  CubeContentSwitcherSize,
  CubeContentSwitcherVariant,
} from './cubeContentSwitcherTypes'

export type CubeContentSwitcherContextValue = {
  variant: CubeContentSwitcherVariant
  size?: CubeContentSwitcherSize
}

export const CubeContentSwitcherContext =
  createContext<CubeContentSwitcherContextValue>({
    variant: 'default',
    size: 'md',
  })
