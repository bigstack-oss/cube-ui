import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeContentSwitcherContext } from './cubeContentSwitcherContext'
import { skeletonBar, skeletonContainer } from './cubeContentSwitcherStyles'

export const CubeContentSwitcherSkeleton = () => {
  const { size, variant } = useContext(CubeContentSwitcherContext)
  const className = twMerge(skeletonContainer({ variant, size }))

  return (
    <div className={className}>
      <CubeSkeleton className={twMerge(skeletonBar({ variant, size }))} />
    </div>
  )
}
