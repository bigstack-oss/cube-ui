import { twMerge } from 'tailwind-merge'
import type { CubeStepProcessProps } from './cubeStepProcessTypes'
import { CubeStepProcessTestIdContext } from './cubeStepProcessContext'
import { CubeStepProcessItem } from './CubeStepProcessItem'
import { CubeStepProcessSkeleton } from './CubeStepProcessSkeleton'

export const CubeStepProcess = (props: CubeStepProcessProps) => {
  const { className, children, isLoading, 'data-testid': testIdProp } = props

  const testId = testIdProp || undefined

  if (isLoading) {
    return <CubeStepProcessSkeleton />
  }

  return (
    <CubeStepProcessTestIdContext.Provider value={testId}>
      <div
        className={twMerge('flex items-center gap-3', className)}
        data-testid={testId}
      >
        {children}
      </div>
    </CubeStepProcessTestIdContext.Provider>
  )
}

CubeStepProcess.Item = CubeStepProcessItem
CubeStepProcess.Skeleton = CubeStepProcessSkeleton
