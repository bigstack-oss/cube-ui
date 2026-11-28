import { createContext } from 'react'

/**
 * The consumer's test ID, passed down to the items a consumer renders as
 * children, so each can derive its own `<test-id>-option`.
 */
export const CubeSearchBarTestIdContext = createContext<string | undefined>(
  undefined,
)
