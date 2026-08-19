import type { CubeTabsProps } from './cubeTabsTypes'
import { CubeTab } from './CubeTab'
import { CubeTabSkeleton } from './CubeTabSkeleton'

export const CubeTabs = (props: CubeTabsProps) => {
  const { children } = props

  return <div className="flex items-end">{children}</div>
}

CubeTabs.Tab = CubeTab
CubeTabs.Skeleton = CubeTabSkeleton
