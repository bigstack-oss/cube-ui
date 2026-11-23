import { cva } from 'class-variance-authority'

export const batchActionTableRow = cva(undefined, {
  variants: {
    isChecked: {
      true: '[&>td]:bg-functional-hover-secondary [&>td]:hover:bg-[#ECF1FF]',
    },
    isDisabled: {
      true: [
        '[&>td]:bg-white [&>td]:hover:bg-white',
        '[&>td]:text-functional-disable-text',
      ],
    },
  },
})
