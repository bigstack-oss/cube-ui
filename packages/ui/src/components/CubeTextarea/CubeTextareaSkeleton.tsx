import { CubeSkeleton } from '../CubeSkeleton'

export const CubeTextareaSkeleton = () => (
  <div className="flex flex-col gap-[6px]">
    <CubeSkeleton className="h-[20px] min-w-[280px] max-w-[380px]" />
    <CubeSkeleton className="h-[140px] min-w-[280px] max-w-[380px]" />
  </div>
)
