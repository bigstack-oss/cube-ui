import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { paginationSkeletonItems } from './cubePaginationStyles'

type CubePaginationSkeletonProps = {
  isMinimal: boolean
}

export const CubePaginationSkeleton = (props: CubePaginationSkeletonProps) => {
  const { isMinimal } = props

  return (
    <div className="flex w-full items-center justify-between gap-x-[10px]">
      {/** Amount */}
      <CubeSkeleton className="h-7 w-[67px] shrink-0" />
      <div className="flex gap-x-4">
        {/** Items */}
        <div className={paginationSkeletonItems({ isMinimal })}>
          {Array.from({ length: 9 }).map((_, index) => (
            <CubeSkeleton key={index} className="size-7 shrink-0" />
          ))}
        </div>
        {/** Go to Input */}
        <div className="flex items-center gap-x-[10px]">
          {!isMinimal && <CubeSkeleton className="h-7 w-[31px]" />}
          <CubeSkeleton className="h-7 w-[59px]" />
        </div>
      </div>
      {/** View Dropdown */}
      <div className="flex items-center gap-x-[10px]">
        {!isMinimal && <CubeSkeleton className="size-7" />}
        <CubeSkeleton className="h-7 w-[80px]" />
      </div>
    </div>
  )
}
