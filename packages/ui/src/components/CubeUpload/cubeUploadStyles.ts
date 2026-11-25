import { cva } from 'class-variance-authority'

export const upload = cva('flex flex-col gap-4')

export const buttonRow = cva('flex items-center justify-between')

export const buttonGroup = cva('flex items-center gap-4')

export const fileInput = cva('hidden')

export const card = cva(
  'rounded-[5px] border border-functional-border-divider p-4',
)

export const file = cva('flex items-center justify-between')

export const fileName = cva('flex items-center gap-[9px]')

export const fileText = cva('primary-body2 font-medium', {
  variants: {
    disabled: {
      true: 'text-functional-text-light',
      false: 'text-functional-title',
    },
  },
})

export const fileStatusIcon = cva('icon-md', {
  variants: {
    disabled: {
      true: 'text-functional-disable-text',
      false: 'text-status-positive',
    },
  },
})

export const cancelButton = cva('icon-md', {
  variants: {
    disabled: {
      true: 'cursor-default text-functional-disable-text',
      false: 'cursor-pointer text-functional-text',
    },
  },
})

export const progressBar = cva('flex flex-col gap-y-2')

export const progressBarHeader = cva('flex items-center gap-x-2')

export const truncatedText = cva(
  'primary-body2 truncate font-medium text-functional-title',
)

export const abortIcon = cva('icon-md shrink-0 cursor-pointer')

export const error = cva(
  'flex items-center gap-x-2 rounded-[5px] border border-status-negative p-4',
)

export const errorIcon = cva('icon-md shrink-0 text-status-negative')

export const errorCloseButton = cva('flex shrink-0 items-center justify-center')

export const errorCloseIcon = cva('icon-md text-functional-text')
