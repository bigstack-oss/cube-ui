import { cva } from 'class-variance-authority'

export const container = cva(
  'primary-body2 inline-flex w-fit cursor-pointer items-start gap-x-2',
  {
    variants: {
      disabled: {
        true: 'cursor-default',
      },
    },
  },
)

export const iconWrap = cva(
  [
    'shrink-0 p-0.5',
    'text-functional-border-darker transition-colors duration-100 peer-hover:text-functional-hover-primary',
  ],
  {
    variants: {
      isSelected: {
        true: 'text-primary',
      },
      disabled: {
        true: 'text-functional-disable-text peer-hover:text-functional-disable-text',
      },
    },
  },
)

export const label = cva('max-w-[152px] break-words text-functional-text', {
  variants: {
    disabled: {
      true: 'text-functional-disable-text',
    },
  },
})
