import { cva } from 'class-variance-authority'

export const expandButton = cva('transition-transform', {
  variants: {
    isExpanded: {
      true: 'rotate-180',
      false: 'rotate-0',
    },
    disabled: {
      true: 'cursor-not-allowed text-functional-border-divider',
      false: 'text-functional-text',
    },
  },
})

export const detailCellContainer = cva(
  [
    'flex flex-col gap-y-4 overflow-hidden',
    'transition-[max-height,padding-top,padding-bottom]',
  ],
  {
    variants: {
      isExpanded: {
        true: 'py-1.5 pr-8',
        false: 'max-h-0 p-0',
      },
    },
  },
)
