import { cva } from 'class-variance-authority'

export const container = cva('flex flex-col gap-y-3')

export const barSection = cva('flex flex-col gap-y-2')

export const header = cva('flex items-center gap-x-3')

export const title = cva('primary-body2 font-medium text-functional-title')

export const subtext = cva('primary-body3 text-functional-text')

export const counts = cva('flex flex-row items-center justify-between', {
  variants: {
    isLoading: {
      true: 'gap-x-[60px]',
      false: 'gap-x-2',
    },
  },
})

export const countSkeleton = cva('flex flex-1 flex-col items-center gap-y-2')

export const countInfo = cva('flex flex-col gap-y-2')

export const countInfoLabel = cva('flex items-center justify-between gap-x-1')

export const countInfoName = cva('primary-body5 text-functional-text-light')

export const countInfoCount = cva(
  'primary-body1 self-end font-semibold text-functional-text',
)
