import { cva } from 'class-variance-authority'

export const header = cva(
  'relative flex h-[54px] flex-row items-center justify-end gap-x-2.5 px-5',
)

export const divider = cva('h-6 w-px bg-functional-border-divider')

export const bottomStroke = cva('absolute bottom-0 left-0 w-full px-5')

export const bar = cva('flex flex-row items-center')

export const quickAccessSkeletonWrap = cva('p-2')

export const quickAccessSkeleton = cva('size-[18px]')
