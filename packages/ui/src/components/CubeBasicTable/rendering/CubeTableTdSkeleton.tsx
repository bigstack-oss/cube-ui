import { CubeSkeleton } from '../../CubeSkeleton/CubeSkeleton'
import type { CubeTableColumnSkeletonVariant } from './CubeTableColumn'

export type CubeTableTdSkeletonProps = {
  variant: CubeTableColumnSkeletonVariant
}

export const CubeTableTdSkeleton = (props: CubeTableTdSkeletonProps) => {
  const { variant } = props

  switch (variant) {
    case 'regular':
      return <CubeSkeleton className="h-4 w-[120px]" />
    case 'subtext-vertical':
      return (
        <div className="flex w-[120px] flex-col gap-y-[6px]">
          <CubeSkeleton className="h-4 w-full" />
          <CubeSkeleton className="h-[13px] w-full" />
        </div>
      )
    case 'subtext-horizontal':
      return (
        <div className="flex items-center gap-x-[6px]">
          <CubeSkeleton className="h-4 w-[30px]" />
          <CubeSkeleton className="h-4 w-[50px]" />
        </div>
      )
    case 'icon-left':
      return (
        <div className="flex items-center gap-x-4">
          <CubeSkeleton className="size-4" />
          <CubeSkeleton className="h-4 w-[88px]" />
        </div>
      )
    case 'icon-right':
      return (
        <div className="flex items-center gap-x-1">
          <CubeSkeleton className="h-4 w-[98px]" />
          <CubeSkeleton className="size-4" />
        </div>
      )
    case 'icon-vertical':
      return (
        <div className="flex w-[85px] flex-col gap-y-[6px]">
          <CubeSkeleton className="h-4 w-full" />
          <CubeSkeleton className="h-[17px] w-full" />
        </div>
      )
    case 'icon-only':
      return <CubeSkeleton className="size-4" />
    case 'with-barchart':
      return (
        <div className="flex items-center gap-x-[6px]">
          <CubeSkeleton className="h-4 w-[60px]" />
          <CubeSkeleton className="h-4 w-[23px]" />
        </div>
      )
    case 'status':
      return <CubeSkeleton className="h-[17px] w-[50px]" />
    default:
      throw new Error(`Unhandled CubeTableTdSkeleton variant ${variant}`)
  }
}
