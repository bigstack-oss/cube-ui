import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { pieWrap, skeletonHole } from './cubePercentagePieChartStyles'

export const CubePercentagePieChartSkeleton = () => (
  <>
    <div className={pieWrap()}>
      <CubeSkeleton className="size-[144px] rounded-full" />
      <div className={skeletonHole()}>
        <CubeSkeleton className="h-[24px] w-[53px]" />
        <CubeSkeleton className="h-[15px] w-[53px]" />
      </div>
    </div>
    <CubeSkeleton className="h-[15px] w-[144px]" />
  </>
)
