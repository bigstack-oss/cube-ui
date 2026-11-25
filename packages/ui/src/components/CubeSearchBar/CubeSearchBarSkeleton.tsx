import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { skeleton } from './cubeSearchBarStyles'

type CubeSearchBarSkeletonProps = {
  variant: 'global' | 'filter'
}

export const CubeSearchBarSkeleton = (props: CubeSearchBarSkeletonProps) => {
  const { variant } = props

  return <CubeSkeleton className={skeleton({ variant })} />
}
