import { twMerge } from 'tailwind-merge'
import { CubeBreadcrumbItem } from './CubeBreadcrumbItem'
import { CubeBreadcrumbTestIdContext } from './cubeBreadcrumbContext'
import { CubeBreadcrumbSkeleton } from './CubeBreadcrumbSkeleton'
import type { CubeBreadcrumbProps } from './cubeBreadcrumbTypes'
import { MAX_BREADCRUMB_ITEMS } from './cubeBreadcrumbUtils'

export const CubeBreadcrumb = (props: CubeBreadcrumbProps) => {
  const { className, children, isLoading, 'data-testid': testIdProp } = props

  const testId = testIdProp || undefined

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
    <CubeBreadcrumbTestIdContext.Provider value={testId}>
      <div
        className={twMerge('flex w-fit items-center gap-3 py-1', className)}
        data-testid={testId}
      >
        {children}
      </div>
    </CubeBreadcrumbTestIdContext.Provider>
  )
}

CubeBreadcrumb.Item = CubeBreadcrumbItem
CubeBreadcrumb.Skeleton = CubeBreadcrumbSkeleton
