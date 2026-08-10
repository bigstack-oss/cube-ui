import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeCheckboxColor } from './cubeCheckboxTypes'

export const container = cva(
  'inline-flex w-fit cursor-pointer items-start gap-x-2',
  {
    variants: {
      labelSize: {
        md: 'primary-body2',
        sm: 'primary-body3',
        xs: 'primary-body4',
      },
      disabled: {
        true: 'cursor-default',
      },
    },
  },
)

export const iconWrap = cva('shrink-0 p-0.5 transition-colors duration-100', {
  variants: {
    color: {} as Record<CubeCheckboxColor, ClassValue>,
    isSelected: {
      true: '',
    },
    disabled: {
      true: '',
    },
  },
  compoundVariants: [
    /** Primary */
    {
      color: 'primary',
      isSelected: false,
      className:
        'text-functional-border-darker peer-hover:text-functional-hover-primary',
    },
    {
      color: 'primary',
      isSelected: true,
      className: 'text-primary peer-hover:text-functional-hover-primary',
    },
    {
      color: 'primary',
      disabled: true,
      className:
        'text-functional-disable-text peer-hover:text-functional-disable-text',
    },
    /** Primary (dark) */
    {
      color: 'primary-dark',
      isSelected: false,
      className:
        'text-functional-text peer-hover:text-functional-hover-primary',
    },
    {
      color: 'primary-dark',
      isSelected: true,
      className: 'text-primary-700 peer-hover:text-primary-500',
    },
    {
      color: 'primary-dark',
      disabled: true,
      className:
        'text-functional-disable-text peer-hover:text-functional-disable-text',
    },
    /** Secondary */
    {
      color: 'secondary',
      isSelected: false,
      className: 'text-functional-border-darker peer-hover:text-blue-700',
    },
    {
      color: 'secondary',
      isSelected: true,
      className: 'text-blue-600 peer-hover:text-blue-700',
    },
    {
      color: 'secondary',
      disabled: true,
      className:
        'text-functional-disable-text peer-hover:text-functional-disable-text',
    },
    /** Secondary (dark) */
    {
      color: 'secondary-dark',
      isSelected: false,
      className: 'text-functional-text peer-hover:text-blue-600',
    },
    {
      color: 'secondary-dark',
      isSelected: true,
      className: 'text-blue-700 peer-hover:text-blue-600',
    },
    {
      color: 'secondary-dark',
      disabled: true,
      className:
        'text-functional-disable-text peer-hover:text-functional-disable-text',
    },
  ],
})

export const label = cva('max-w-[152px] break-words text-functional-text', {
  variants: {
    color: {} as Record<CubeCheckboxColor, ClassValue>,
    disabled: {
      true: 'text-functional-disable-text',
    },
  },
  compoundVariants: [
    {
      color: 'primary',
      disabled: false,
      className: 'text-functional-text',
    },
    {
      color: 'primary',
      disabled: true,
      className: 'text-functional-disable-text',
    },
    {
      color: 'primary-dark',
      disabled: false,
      className: 'font-semibold text-functional-text',
    },
    {
      color: 'primary-dark',
      disabled: true,
      className: 'font-semibold text-functional-disable-text',
    },
    {
      color: 'secondary',
      disabled: false,
      className: 'text-functional-text',
    },
    {
      color: 'secondary',
      disabled: true,
      className: 'text-functional-disable-text',
    },
    {
      color: 'secondary-dark',
      disabled: false,
      className: 'font-semibold text-functional-text',
    },
    {
      color: 'secondary-dark',
      disabled: true,
      className: 'font-semibold text-functional-disable-text',
    },
  ],
})
