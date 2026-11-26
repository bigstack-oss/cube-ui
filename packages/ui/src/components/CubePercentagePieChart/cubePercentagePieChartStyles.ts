import { cva } from 'class-variance-authority'

export const chart = cva('flex flex-col items-center gap-y-4')

export const title = cva(
  'primary-body2 w-full text-left font-medium text-functional-title',
)

export const pieWrap = cva('relative')

export const pieLabel = cva(
  'absolute left-1/2 top-[50px] flex -translate-x-1/2 flex-col items-center gap-y-1',
)

export const percentage = cva('primary-h3 text-functional-title')

export const pieDetails = cva('flex flex-col items-center')

export const total = cva('primary-body5 text-functional-text-light')

export const overThreshold = cva('primary-body5 text-status-negative')

export const usage = cva('primary-body5 text-functional-text-light')

export const ring = cva('-rotate-90')

export const track = cva('fill-transparent stroke-functional-border-divider')

export const skeletonHole = cva([
  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
  'flex size-[128px] flex-col items-center justify-center gap-y-1 rounded-full bg-white',
])
