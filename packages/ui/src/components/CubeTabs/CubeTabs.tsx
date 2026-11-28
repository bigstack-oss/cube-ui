import type { CubeTabsProps } from './cubeTabsTypes'
import { CubeTab } from './CubeTab'
import { CubeTabSkeleton } from './CubeTabSkeleton'
import { CubeTabsTestIdContext } from './cubeTabsContext'

export const CubeTabs = (props: CubeTabsProps) => {
  const { children, 'data-testid': testIdProp } = props

  const testId = testIdProp || undefined

  return (
    <CubeTabsTestIdContext.Provider value={testId}>
      <div className="flex items-end" data-testid={testId}>
        {children}
      </div>
    </CubeTabsTestIdContext.Provider>
  )
}

CubeTabs.Tab = CubeTab
CubeTabs.Skeleton = CubeTabSkeleton
