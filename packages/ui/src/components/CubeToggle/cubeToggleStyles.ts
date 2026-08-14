import { cva } from 'class-variance-authority'

export const track = cva(
  'flex h-[20px] w-9 items-center rounded-full border border-transparent transition-colors',
  {
    variants: {
      checked: {
        true: 'bg-status-positive',
        false: 'bg-functional-disable-text',
      },
      disabled: {
        false: 'cursor-pointer',
        true: 'cursor-default',
      },
    },
    compoundVariants: [
      // Not disabled
      {
        checked: true,
        disabled: false,
        className: 'hover:bg-green-400',
      },
      {
        checked: false,
        disabled: false,
        className: 'hover:bg-grey-400',
      },
      // Disabled
      {
        checked: true,
        disabled: true,
        className: 'border-green-200 bg-green-100',
      },
      {
        checked: false,
        disabled: true,
        className: 'border-functional-disable bg-grey-150',
      },
    ],
  },
)

export const thumb = cva(
  'size-[17px] rounded-full bg-grey-0 shadow-md transition-transform',
  {
    variants: {
      checked: {
        true: 'translate-x-4',
        false: 'translate-x-px',
      },
    },
  },
)

export const label = cva('primary-body4 text-functional-text', {
  variants: {
    disabled: {
      false: 'cursor-pointer',
      true: 'cursor-default',
    },
  },
})
