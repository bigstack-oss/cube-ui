import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'

export type CubeProgressBarSkeletonProps = PropsWithClassName

export const CubeProgressBarSkeleton = (
  props: CubeProgressBarSkeletonProps,
) => {
  const { className: classNameProps } = props

  const className = twMerge('flex w-full items-center gap-x-2', classNameProps)

  return (
    <div className={className}>
      <CubeSkeleton className="h-[9px] w-full" />
      <CubeSkeleton className="h-[15px] w-[23px]" />
    </div>
  )
}
