import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import { CubeSkeleton } from '../../CubeSkeleton/CubeSkeleton'

export type CubeInlineNotificationSkeletonProps = PropsWithClassName & {
  hasIcon?: boolean
  hasTitle?: boolean
  hasSubtitle?: boolean
  hasLink?: boolean
}

export const CubeInlineNotificationSkeleton = (
  props: CubeInlineNotificationSkeletonProps,
) => {
  const { hasIcon, hasTitle, hasSubtitle, hasLink, className } = props

  return (
    <div
      className={twMerge(
        'flex min-h-[44px] gap-3 rounded-[5px] border border-functional-border-divider px-4 py-[14px]',
        className,
      )}
    >
      <div className="flex flex-1 items-start gap-2">
        {hasIcon && <CubeSkeleton className="size-4" />}
        {hasTitle && <CubeSkeleton className="h-4 w-[97px]" />}
        {hasSubtitle && <CubeSkeleton className="h-4 w-full" />}
      </div>
      <div className="flex items-center gap-2 self-start">
        {hasLink && <CubeSkeleton className="h-4 w-[85px]" />}
        <CubeSkeleton className="size-4" />
      </div>
    </div>
  )
}
