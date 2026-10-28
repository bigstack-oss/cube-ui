import { cva } from 'class-variance-authority'

export const progressFill = cva('absolute h-full', {
  variants: {
    isFull: {
      true: 'rounded-full',
      false: 'rounded-l-full',
    },
  },
})
