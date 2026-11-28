import { createContext } from 'react'

/** The upload's test ID, so `.File`, `.ProgressBar` and `.Error` can derive their own. */
export const CubeUploadTestIdContext = createContext<string | undefined>(
  undefined,
)
