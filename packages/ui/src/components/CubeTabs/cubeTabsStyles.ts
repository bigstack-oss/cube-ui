import { cva } from 'class-variance-authority'

export const tab = cva(
  'inline-block min-h-[34px] max-w-[200px] border-b border-b-functional-border-divider',
  {
    variants: {
      isActive: {
        false: 'text-functional-text-light',
      },
      disabled: {
        false: ['cursor-pointer hover:text-functional-hover-primary'],
        true: ['cursor-default text-functional-disable-text'],
      },
    },
    compoundVariants: [
      {
        isActive: true,
        disabled: false,
        className: 'border-b-cosmos-primary text-cosmos-primary',
      },
    ],
    defaultVariants: {
      isActive: false,
      disabled: false,
    },
  },
)

// Use an inner container with a default transparent border-bottom to avoid a
// slight layout shift when toggling between active and inactive states.
export const innerContainer = cva(
  [
    'secondary-body2 flex items-center justify-center px-2.5 py-2',
    'border-b border-b-transparent',
  ],
  {
    variants: {
      isActive: {
        true: '',
        false: '',
      },
      disabled: {
        false: 'font-medium',
      },
    },
    compoundVariants: [
      {
        isActive: true,
        disabled: false,
        className: 'border-b-cosmos-primary font-semibold',
      },
    ],
    defaultVariants: {
      isActive: false,
      disabled: false,
    },
  },
)
