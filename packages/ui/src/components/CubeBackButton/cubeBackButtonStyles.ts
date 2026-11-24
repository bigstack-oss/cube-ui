import { cva } from 'class-variance-authority'

// cva does not merge Tailwind classes, so each alignment is its own variant.
export const backButton = cva('flex gap-x-2', {
  variants: {
    hasBottomContent: {
      true: 'items-start',
      false: 'items-center',
    },
  },
})

export const titleColumn = cva('flex flex-col gap-y-2')

export const titleRow = cva('flex items-center gap-x-3')

export const backButtonSkeleton = cva('size-[34px]')

export const title = cva('primary-h3 text-functional-title')

export const titleSkeleton = cva('h-6 w-[92px]')

export const details = cva('primary-body1 text-functional-text-light')

export const detailsSkeleton = cva('h-[22px] w-[49px]')

export const linkSkeleton = cva('h-4 w-[60px]')

export const divider = cva('h-4 w-px bg-functional-border-darker last:hidden')

export const barChart = cva('flex items-center')

export const barChartLabel = cva(
  'primary-body4 mr-1 text-functional-text-light',
)

export const barChartBar = cva('flex w-[90px] items-center')

export const barChartSkeleton = cva('flex items-center gap-x-2')
