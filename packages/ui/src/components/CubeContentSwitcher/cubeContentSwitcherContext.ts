import { createContext } from 'react'
import type {
  CubeContentSwitcherSize,
  CubeContentSwitcherVariant,
} from './cubeContentSwitcherTypes'

export type CubeContentSwitcherContextValue = {
  variant: CubeContentSwitcherVariant
  size?: CubeContentSwitcherSize
  /** The consumer's test ID, so each item can derive `<test-id>-item`. */
  testId?: string
}

export const CubeContentSwitcherContext =
  createContext<CubeContentSwitcherContextValue>({
    variant: 'default',
    size: 'md',
  })
