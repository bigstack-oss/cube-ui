import { cva } from 'class-variance-authority'

export const skeleton = cva('h-[34px] w-full', {
  variants: {
    variant: {
      global: 'rounded-full',
      filter: 'rounded-[5px]',
    },
  },
})

export const inputIcons = cva('absolute right-4 flex items-center gap-[6px]')

export const clearIcon = cva(
  'icon-md cursor-pointer text-functional-text-light',
)

export const searchIcon = cva('icon-md text-functional-text')

export const dropdownMenu = cva(
  [
    'z-10 overflow-y-auto rounded-[5px] border bg-white py-2',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      variant: {
        filter: 'min-w-[200px]',
        global: 'min-w-[160px]',
      },
    },
  },
)

export const filterInputWrapper = cva(
  'relative flex min-w-[200px] items-center',
)

export const filterInput = cva(
  [
    'primary-body2 h-[34px] w-full truncate rounded-[5px] bg-grey-100',
    'border border-grey-100 py-[7px] pl-4',
    'text-functional-text placeholder:text-functional-text-light',
    'outline-none hover:border-functional-hover-primary focus:border-functional-hover-primary',
  ],
  {
    variants: {
      hasInputValue: {
        true: 'pr-[56px]',
        false: 'pr-9',
      },
    },
  },
)

export const filterItem = cva(
  'primary-body3 px-4 py-[10px] hover:bg-functional-hover-secondary',
)

export const globalContainer = cva([
  'flex w-full items-center rounded-full',
  'border border-functional-border-divider hover:border-functional-hover-primary focus:border-functional-hover-primary',
])

export const globalInput = cva(
  [
    'primary-body2 h-[34px] w-full truncate bg-white py-[7px] pl-5 outline-none',
    'text-functional-text placeholder:text-functional-border-darker',
  ],
  {
    variants: {
      variant: {
        regular: 'rounded-full',
        category: 'rounded-l-full',
      },
      hasInputValue: {
        true: 'pr-[64px]',
        false: 'pr-[42px]',
      },
    },
  },
)

export const globalItem = cva(
  'primary-body3 cursor-pointer px-4 py-[10px] text-functional-text hover:bg-functional-hover-secondary',
  {
    variants: {
      isRecent: {
        true: 'flex items-center',
        false: '',
      },
    },
  },
)

export const globalItemContent = cva('flex min-w-[232px] items-center gap-x-2')

export const globalItemIcon = cva('icon-md text-functional-text-light')

export const globalItemClearIcon = cva(
  'icon-md cursor-pointer rounded-full text-functional-text-light hover:bg-white',
)

export const categoryDivider = cva(
  'h-[20px] w-px border-l border-functional-border-divider',
)

export const categoryTrigger = cva([
  'flex h-[34px] cursor-pointer items-center justify-between gap-x-[6px] rounded-r-full',
  'primary-body2 shrink-0 px-5 py-[7px] text-functional-text',
])

export const categoryTriggerLabel = cva('primary-body2 max-w-[100px] truncate')

export const categoryTriggerIcon = cva(
  'icon-md shrink-0 text-functional-text transition-transform',
  {
    variants: { isOpen: { true: 'rotate-180', false: 'rotate-0' } },
  },
)

export const categoryItem = cva(
  'primary-body3 px-6 py-[10px] text-functional-text',
  {
    variants: {
      hasData: {
        true: 'cursor-pointer hover:bg-functional-hover-secondary',
        false: '',
      },
    },
  },
)
