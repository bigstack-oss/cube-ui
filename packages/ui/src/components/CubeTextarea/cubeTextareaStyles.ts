import { cva } from 'class-variance-authority'

export const textarea = cva(
  [
    'primary-body2 rounded-[5px] bg-grey-0 px-4 py-[10px] outline-none',
    'max-h-[260px] min-h-[140px] min-w-[280px]',
    'text-functional-text placeholder:text-functional-border-darker',
    'border border-functional-border-divider',
    'hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      isError: {
        true: 'border-status-negative hover:border-status-negative',
      },
      disabled: {
        true: [
          'disabled:border-functional-disable-text disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
          'disabled:hover:border-functional-disable-text',
        ],
      },
    },
  },
)
