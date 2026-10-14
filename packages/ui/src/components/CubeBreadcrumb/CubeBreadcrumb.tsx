import { twMerge } from 'tailwind-merge'
import { CubeBreadcrumbItem } from './CubeBreadcrumbItem'
import { CubeBreadcrumbSkeleton } from './CubeBreadcrumbSkeleton'
import type { CubeBreadcrumbProps } from './cubeBreadcrumbTypes'
import { MAX_BREADCRUMB_ITEMS } from './cubeBreadcrumbUtils'

export const CubeBreadcrumb = (props: CubeBreadcrumbProps) => {
  const { className, children, isLoading } = props

  if (Array.isArray(children) && children.length > MAX_BREADCRUMB_ITEMS) {
    console.warn(
      'CubeBreadcrumb: The number of items in the breadcrumb should not exceed 5.',
    )
  }

  const skeletonCount = Array.isArray(children)
    ? Math.min(children.length, MAX_BREADCRUMB_ITEMS)
    : MAX_BREADCRUMB_ITEMS

  if (isLoading) {
    return <CubeBreadcrumbSkeleton length={skeletonCount} />
  }

  return (
    <div className={twMerge('flex w-fit items-center gap-3 py-1', className)}>
      {children}
    </div>
  )
}

CubeBreadcrumb.Item = CubeBreadcrumbItem
CubeBreadcrumb.Skeleton = CubeBreadcrumbSkeleton
