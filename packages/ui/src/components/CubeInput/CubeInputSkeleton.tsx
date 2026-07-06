import { CubeSkeleton } from '../CubeSkeleton'
import { skeleton } from './cubeInputStyles'

export type InputSkeletonType = 'input' | 'label' | 'footer'

export type CubeInputSkeletonProps = {
  type: InputSkeletonType
}

export const CubeInputSkeleton = (props: CubeInputSkeletonProps) => {
  const { type } = props

  return <CubeSkeleton className={skeleton({ type })} />
}
