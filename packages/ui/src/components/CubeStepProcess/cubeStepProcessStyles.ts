import { cva } from 'class-variance-authority'

export const number = cva(
  'secondary-body7 flex size-4 shrink-0 items-center justify-center rounded-full font-extrabold text-white',
  {
    variants: {
      isActive: {
        true: 'bg-functional-text',
        false: 'bg-functional-disable-text',
      },
    },
  },
)

export const label = cva('primary-body3', {
  variants: {
    isActive: {
      true: 'font-semibold text-functional-text',
      false: 'text-functional-disable-text',
    },
  },
})
