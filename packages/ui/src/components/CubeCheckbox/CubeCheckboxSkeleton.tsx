import { CubeSkeleton } from '../CubeSkeleton'

export const CubeCheckboxSkeleton = () => (
  <div className="inline-flex gap-x-2">
    <CubeSkeleton className="size-5" />
    <CubeSkeleton className="h-5 w-[152px]" />
  </div>
)
