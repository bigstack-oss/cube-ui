import { CubeSkeleton } from '../CubeSkeleton'
import { baseClass } from './cubeStatusReactionStyles'

export const CubeStatusReactionSkeleton = () => {
  return (
    <div className={baseClass}>
      <CubeSkeleton className="size-4" />
      <CubeSkeleton className="h-4 w-11" />
    </div>
  )
}
