import { cva } from 'class-variance-authority'

export const paginationItemButton = cva(
  [
    'flex size-7 shrink-0 items-center justify-center rounded-full',
    'transition-colors duration-300 ease-in-out',
  ],
  {
    variants: {
      isActive: {
        true: '',
        false: '',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        isActive: false,
        disabled: false,
        class: 'bg-grey-0 text-functional-text hover:bg-functional-hover-grey',
      },
      {
        isActive: true,
        disabled: false,
        class:
          'bg-functional-hover-secondary font-semibold text-functional-text',
      },
      { disabled: true, class: 'text-functional-disable-text' },
    ],
  },
)

export const paginationItemWrap = cva('secondary-body2 flex text-center', {
  variants: {
    isMinimal: {
      true: 'p-[3.5px]',
      false: 'p-1.5',
    },
  },
})

export const paginationSkeletonItems = cva('flex items-center', {
  variants: { isMinimal: { true: 'gap-x-1.5', false: 'gap-x-3' } },
})
