import { range } from 'lodash'
import { CubeSkeleton } from '../CubeSkeleton'
import { MAX_BREADCRUMB_ITEMS } from './cubeBreadcrumbUtils'

export type CubeBreadcrumbSkeletonProps = {
  /**
   * @default 5
   */
  length?: number
}

export const CubeBreadcrumbSkeleton = (props: CubeBreadcrumbSkeletonProps) => {
  const { length = MAX_BREADCRUMB_ITEMS } = props

  return (
    <div className="flex w-fit gap-3">
      {range(0, length).map((_, index) => (
        <div key={index} className="group flex gap-3">
          <CubeSkeleton className="h-[18px] w-[86px]" />
          <CubeSkeleton className="size-[18px] group-last:hidden" />
        </div>
      ))}
    </div>
  )
}
