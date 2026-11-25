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
