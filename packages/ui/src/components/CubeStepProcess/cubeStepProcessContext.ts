import { createContext } from 'react'

/** The process's test ID, so each step can derive `<test-id>-item`. */
export const CubeStepProcessTestIdContext = createContext<string | undefined>(
  undefined,
)
