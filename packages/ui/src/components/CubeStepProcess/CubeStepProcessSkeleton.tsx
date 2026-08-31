import { range } from 'lodash'
import { CubeSkeleton } from '../CubeSkeleton'

export type CubeStepProcessSkeletonProps = {
  /**
   * @default 5
   */
  length?: number
}

export const CubeStepProcessSkeleton = (
  props: CubeStepProcessSkeletonProps,
) => {
  const { length = 5 } = props
  return (
    <div className="flex gap-3">
      {range(0, length).map((_, index) => (
        <div key={index} className="group flex">
          <CubeSkeleton className="mr-2 size-[18px]" />
          <CubeSkeleton className="mr-3 h-[18px] w-[58px]" />
          <CubeSkeleton className="size-[18px] group-last:hidden" />
        </div>
      ))}
    </div>
  )
}
