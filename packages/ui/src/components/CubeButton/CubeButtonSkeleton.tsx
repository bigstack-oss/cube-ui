import { twMerge } from 'tailwind-merge'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import type { CubeButtonSize, CubeButtonUsage } from './cubeButtonTypes'
import { buttonSkeleton } from './cubeButtonStyles'

export type CubeButtonSkeletonProps = {
  /**
   * @default 'md
   */
  size?: CubeButtonSize
  /**
   * @default 'text-only'
   */
  usage?: CubeButtonUsage
}

export const CubeButtonSkeleton = (props: CubeButtonSkeletonProps) => {
  const { size = 'md', usage = 'text-only' } = props

  return <CubeSkeleton className={twMerge(buttonSkeleton({ size, usage }))} />
}
