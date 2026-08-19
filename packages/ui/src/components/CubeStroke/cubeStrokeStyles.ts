import { cva } from 'class-variance-authority'

export const stroke = cva('', {
  variants: {
    type: {
      regular: 'border-functional-border-divider',
      dot: 'border-t-4 border-dotted border-primary-50',
    },
  },
})
