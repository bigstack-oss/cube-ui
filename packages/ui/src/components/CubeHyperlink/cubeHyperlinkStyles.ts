import { cva } from 'class-variance-authority'

export const hyperlink = cva(
  ['flex cursor-pointer items-center gap-x-1 font-medium'],
  {
    variants: {
      color: {
        primary: [
          'text-primary',
          'hover:text-functional-hover-primary',
          'visited:text-primary-700',
        ],
        secondary: [
          'text-functional-border-darker',
          'hover:text-functional-text-light',
          'visited:text-functional-border-darker',
        ],
      },
      size: {
        md: 'primary-body2',
        sm: 'primary-body4',
      },
      variant: {
        'text-only': '',
        'text-inline': 'underline underline-offset-4',
        'icon-left': '',
        'icon-right': '',
      },
      disabled: {
        true: 'text-functional-disable-text hover:cursor-default hover:text-functional-disable-text',
      },
    },
  },
)
