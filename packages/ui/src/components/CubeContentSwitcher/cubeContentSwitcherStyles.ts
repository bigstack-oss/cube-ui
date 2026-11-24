import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeContentSwitcherSize } from './cubeContentSwitcherTypes'

export const defaultItem = cva(
  [
    'flex items-center justify-center',
    'border-y border-primary-200 bg-grey-0',
    'whitespace-nowrap font-medium text-functional-text-light transition-colors',
    'first-of-type:rounded-l-[5px] first-of-type:border-l',
    'last-of-type:rounded-r-[5px] last-of-type:border-r',
  ],
  {
    variants: {
      size: {
        sm: 'secondary-body5 h-6 min-w-[64px] max-w-[80px] px-[19px] py-[6px]',
        md: 'secondary-body2 h-8 min-w-[100px] max-w-[156px] px-[36px] py-[7px]',
      } satisfies Record<CubeContentSwitcherSize, ClassValue>,
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
        isActive: true,
        disabled: false,
        className: 'bg-primary-200 text-functional-text',
      },
      {
        isActive: false,
        disabled: false,
        className: 'hover:bg-functional-hover-secondary',
      },
      {
        disabled: true,
        className: 'text-functional-disable-text',
      },
    ],
  },
)

export const radiusItem = cva(
  [
    'flex h-[28px] min-w-[100px] items-center justify-center rounded-full px-[32.5px] py-[5px]',
    'secondary-body2 font-medium transition-colors duration-200',
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
        class: 'bg-grey-0 text-functional-text-light hover:bg-secondary-50',
      },
      {
        isActive: true,
        disabled: false,
        class:
          'bg-secondary-300 text-functional-text [box-shadow:0px_0px_2px_0px_rgba(0,_0,_0,_0.20)]',
      },
      { disabled: true, class: 'bg-grey-0 text-functional-disable-text' },
    ],
  },
)

export const radiusItemWrapper = cva([
  'box-border border-y border-secondary-200 p-[2px]',
  'first-of-type:rounded-l-full first-of-type:border-l',
  'last-of-type:rounded-r-full last-of-type:border-r',
])

export const skeletonContainer = cva(
  ['flex items-center justify-center', 'border-y border-functional-skeleton'],
  {
    variants: {
      variant: {
        default:
          'first-of-type:rounded-l-[5px] first-of-type:border-l last-of-type:rounded-r-[5px] last-of-type:border-r',
        radius:
          'first-of-type:rounded-l-full first-of-type:border-l last-of-type:rounded-r-full last-of-type:border-r',
      },
      size: {
        sm: '',
        md: '',
      } satisfies Record<CubeContentSwitcherSize, ClassValue>,
    },
    compoundVariants: [
      { variant: 'default', size: 'md', class: 'h-[32px] w-[100px]' },
      { variant: 'default', size: 'sm', class: 'h-[24px] w-[64px]' },
      { variant: 'radius', class: 'h-[34px] w-[100px]' },
    ],
  },
)

export const skeletonBar = cva(null, {
  variants: {
    variant: {
      default: '',
      radius: '',
    },
    size: {
      sm: '',
      md: '',
    } satisfies Record<CubeContentSwitcherSize, ClassValue>,
  },
  compoundVariants: [
    { variant: 'default', size: 'md', class: 'h-[17px] w-[60px]' },
    { variant: 'default', size: 'sm', class: 'h-[13px] w-[39px]' },
    { variant: 'radius', class: 'h-[17px] w-[50px]' },
  ],
})
