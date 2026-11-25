import { cva } from 'class-variance-authority'

export const chart = cva('relative h-[385px]')

export const canvas = cva('min-w-0')

export const empty = cva('flex w-full flex-col items-center px-4 py-6')

export const emptyIcon = cva('icon-xl m-2.5 text-functional-text')

export const emptyText = cva('primary-body2 text-functional-text-light')

export const skeleton = cva('relative flex flex-col items-center gap-2')

export const skeletonRows = cva('flex w-full grow flex-col gap-[34px]')

export const skeletonRow = cva('flex items-center gap-2')

export const skeletonBars = cva(
  'absolute bottom-[38px] flex w-full items-center justify-evenly pl-4',
)

export const skeletonBar = cva('flex w-[48px] justify-center')

export const skeletonLabels = cva(
  'flex w-full items-center justify-evenly pl-4',
)
