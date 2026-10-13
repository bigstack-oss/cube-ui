import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import type { CubeDropdownSize } from './cubeDropdownTypes'
import { skeletonContainer, skeletonInput } from './cubeDropdownStyles'

type CubeDropdownSkeletonProps = PropsWithClassName & {
  size: CubeDropdownSize
  hasLabel: boolean
}

export const CubeDropdownSkeleton = (props: CubeDropdownSkeletonProps) => {
  const { className, size, hasLabel } = props

  const renderLabelSkeleton = () => {
    return hasLabel ? <CubeSkeleton className="h-[18px] w-full" /> : null
  }

  return (
    <div className={twMerge(skeletonContainer({ size }), className)}>
      {renderLabelSkeleton()}
      <CubeSkeleton className={twMerge(skeletonInput({ size }))} />
    </div>
  )
}
