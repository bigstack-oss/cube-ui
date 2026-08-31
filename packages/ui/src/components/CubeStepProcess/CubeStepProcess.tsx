import { twMerge } from 'tailwind-merge'
import type { CubeStepProcessProps } from './cubeStepProcessTypes'
import { CubeStepProcessItem } from './CubeStepProcessItem'
import { CubeStepProcessSkeleton } from './CubeStepProcessSkeleton'

export const CubeStepProcess = (props: CubeStepProcessProps) => {
  const { className, children, isLoading } = props

  if (isLoading) {
    return <CubeStepProcessSkeleton />
  }

  return (
    <div className={twMerge('flex items-center gap-3', className)}>
      {children}
    </div>
  )
}

CubeStepProcess.Item = CubeStepProcessItem
CubeStepProcess.Skeleton = CubeStepProcessSkeleton
