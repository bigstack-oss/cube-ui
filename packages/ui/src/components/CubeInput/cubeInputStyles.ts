import { cva } from 'class-variance-authority'

export const input = cva(
  [
    'primary-body2 w-full truncate rounded-[6px] py-[9px] outline-none',
    'bg-grey-0',
    'text-functional-text placeholder:text-functional-border-darker',
    'border border-functional-border-divider',
    'hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      isError: {
        true: [
          'pl-4 pr-8',
          'border-status-negative hover:border-status-negative',
        ],
      },
      disabled: {
        true: [
          'disabled:border-functional-disable-text disabled:text-functional-disable-text disabled:placeholder:text-functional-border-divider',
          'disabled:hover:border-functional-disable-text',
        ],
      },
      hasIcon: {
        true: 'pl-4 pr-8',
        false: 'px-4',
      },
    },
    compoundVariants: [
      { isError: true, hasIcon: true, class: 'pr-[56px]' },
      { isError: true, hasIcon: false, class: 'pr-9' },
    ],
  },
)

export const customIcon = cva('icon-md', {
  variants: {
    disabled: {
      true: 'cursor-default text-functional-border-divider',
      false: 'cursor-pointer text-functional-text',
    },
  },
})

export const footer = cva('primary-body4', {
  variants: {
    isError: {
      true: 'text-status-negative',
      false: 'text-functional-text-light',
    },
  },
})

export const skeleton = cva('w-full', {
  variants: {
    type: {
      label: 'h-[20px]',
      input: 'h-[38px]',
      footer: 'h-[16px]',
    },
  },
})
