import { twMerge } from 'tailwind-merge'
import { CubeSkeleton } from '../CubeSkeleton'
import { skeleton } from './cubeTagStyles'

export type CubeTagSkeletonProps = {
  hasIcon: boolean
}

export const CubeTagSkeleton = (props: CubeTagSkeletonProps) => {
  const { hasIcon } = props
  return <CubeSkeleton className={twMerge(skeleton({ hasIcon }))} />
}
