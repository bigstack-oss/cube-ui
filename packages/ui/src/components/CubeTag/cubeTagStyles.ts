import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import { twMerge } from 'tailwind-merge'
import type { CubeTagColor, CubeTagVariant } from './cubeTagTypes'

type Compound = {
  color: CubeTagColor
  variant: CubeTagVariant
  hasCloseButton?: boolean
  hasIcon?: boolean
  disabled?: boolean
  className: ClassValue
}

const compoundsCreator = (
  color: CubeTagColor,
  variant: CubeTagVariant,
  entries: Omit<Compound, 'color' | 'variant'>[],
): Compound[] => entries.map((entry) => ({ color, variant, ...entry }))

const defaultCompounds: Compound[] = [
  // Filled - Base
  {
    color: 'default',
    variant: 'filled',
    disabled: false,
    className: twMerge(
      'bg-functional-border-divider hover:bg-grey-300',
      'text-functional-text',
    ),
  },
  {
    color: 'default',
    variant: 'filled',
    disabled: true,
    className: twMerge(
      'bg-functional-disable-light',
      'text-functional-disable-text',
    ),
  },
  // Filled - Close button
  {
    color: 'default',
    variant: 'filled',
    hasCloseButton: true,
    disabled: false,
    className: twMerge(
      '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
    ),
  },
  {
    color: 'default',
    variant: 'filled',
    hasCloseButton: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
  // Filled - Icon
  {
    color: 'default',
    variant: 'filled',
    hasIcon: true,
    disabled: false,
    className: twMerge('[&>svg]:text-functional-text-light'),
  },
  {
    color: 'default',
    variant: 'filled',
    hasIcon: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
  // Stroke - Base
  {
    color: 'default',
    variant: 'stroke',
    disabled: false,
    className: twMerge(
      'bg-functional-border-divider hover:bg-grey-300',
      'text-functional-text',
      'border border-functional-border-darker',
    ),
  },
  {
    color: 'default',
    variant: 'stroke',
    disabled: true,
    className: twMerge(
      'bg-functional-disable-light',
      'text-functional-disable-text',
      'border border-functional-border-divider',
    ),
  },
  // Stroke - Close button
  {
    color: 'default',
    variant: 'stroke',
    hasCloseButton: true,
    disabled: false,
    className: twMerge(
      '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
    ),
  },
  {
    color: 'default',
    variant: 'stroke',
    hasCloseButton: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
  // Stroke - Icon
  {
    color: 'default',
    variant: 'stroke',
    hasIcon: true,
    disabled: false,
    className: twMerge('[&>svg]:text-functional-text-light'),
  },
  {
    color: 'default',
    variant: 'stroke',
    hasIcon: true,
    disabled: true,
    className: twMerge('[&>svg]:text-functional-disable-text'),
  },
]

const primaryBlueCompounds: Compound[] = [
  ...compoundsCreator('primary-blue', 'filled', [
    {
      disabled: false,
      className: twMerge(
        'bg-primary-200 hover:bg-primary-150',
        'text-functional-text',
      ),
    },
    {
      disabled: true,
      className: twMerge('bg-primary-50', 'text-functional-disable-text'),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-grey-0 [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-functional-text-light'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
  ]),
  ...compoundsCreator('primary-blue', 'stroke', [
    {
      disabled: false,
      className: twMerge(
        'bg-primary-0 hover:bg-primary-50',
        'text-functional-text',
        'border border-primary-200',
      ),
    },
    {
      disabled: true,
      className: twMerge(
        'bg-primary-0',
        'text-functional-disable-text',
        'border border-primary-50',
      ),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-primary-200 [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-primary-200'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
  ]),
]

const blueCompounds: Compound[] = [
  ...compoundsCreator('blue', 'filled', [
    {
      disabled: false,
      className: twMerge(
        'bg-blue-200 hover:bg-blue-150',
        'text-functional-text',
      ),
    },
    {
      disabled: true,
      className: twMerge('bg-blue-50', 'text-functional-disable-text'),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-functional-text-light'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
  ]),
  ...compoundsCreator('blue', 'stroke', [
    {
      disabled: false,
      className: twMerge(
        'bg-blue-50 hover:bg-blue-100',
        'text-functional-text',
        'border border-primary-400',
      ),
    },
    {
      disabled: true,
      className: twMerge(
        'bg-blue-0',
        'text-functional-disable-text',
        'border border-primary-150',
      ),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-functional-text-light'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
  ]),
]

const cyanCompounds: Compound[] = [
  ...compoundsCreator('cyan', 'filled', [
    {
      disabled: false,
      className: twMerge(
        'bg-secondary-200 hover:bg-secondary-150',
        'text-functional-text',
      ),
    },
    {
      disabled: true,
      className: twMerge('bg-secondary-50', 'text-functional-disable-text'),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-functional-text-light'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
  ]),
  ...compoundsCreator('cyan', 'stroke', [
    {
      disabled: false,
      className: twMerge(
        'bg-secondary-50 hover:bg-secondary-100',
        'text-functional-text',
        'border border-secondary-600',
      ),
    },
    {
      disabled: true,
      className: twMerge(
        'bg-secondary-0',
        'text-functional-disable-text',
        'border border-secondary-150',
      ),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-functional-text-light'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-disable-text'),
    },
  ]),
]

const darkCompounds: Compound[] = [
  ...compoundsCreator('dark', 'filled', [
    {
      disabled: false,
      className: twMerge('bg-dark-500 hover:bg-dark-400', 'text-grey-0'),
    },
    {
      disabled: true,
      className: twMerge('bg-functional-disable', 'text-grey-0'),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge('[&>svg]:text-dark-150 [&>svg]:hover:text-grey-0'),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-grey-0'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-dark-150'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-grey-0'),
    },
  ]),
  ...compoundsCreator('dark', 'stroke', [
    {
      disabled: false,
      className: twMerge(
        'bg-dark-50 hover:bg-dark-100',
        'text-functional-text',
        'border border-functional-text',
      ),
    },
    {
      disabled: true,
      className: twMerge(
        'bg-dark-0',
        'text-functional-border-divider',
        'border border-functional-border-divider',
      ),
    },
    {
      hasCloseButton: true,
      disabled: false,
      className: twMerge(
        '[&>svg]:text-functional-text-light [&>svg]:hover:text-functional-text',
      ),
    },
    {
      hasCloseButton: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-border-divider'),
    },
    {
      hasIcon: true,
      disabled: false,
      className: twMerge('[&>svg]:text-functional-text-light'),
    },
    {
      hasIcon: true,
      disabled: true,
      className: twMerge('[&>svg]:text-functional-border-divider'),
    },
  ]),
]

export const tag = cva(
  [
    'inline-flex items-center gap-x-[5px] whitespace-nowrap',
    'h-[21px] w-fit cursor-default rounded-[20px] px-2.5 py-1',
    'secondary-body5 font-semibold',
  ],
  {
    variants: {
      // Use `as` for `compoundVariants` to infer the type.
      color: {} as Record<CubeTagColor, ClassValue>,
      variant: {} as Record<CubeTagVariant, ClassValue>,
      hasCloseButton: {
        true: undefined,
      },
      hasIcon: {
        true: undefined,
      },
      disabled: {
        true: undefined,
      },
    },
    compoundVariants: [
      ...defaultCompounds,
      ...primaryBlueCompounds,
      ...blueCompounds,
      ...cyanCompounds,
      ...darkCompounds,
    ],
  },
)

export const closeButton = cva('icon-xs', {
  variants: {
    disabled: {
      false: 'cursor-pointer',
      true: 'cursor-default',
    },
  },
})

export const skeleton = cva('h-[23px] rounded-full', {
  variants: {
    hasIcon: {
      true: 'w-[95px]',
      false: 'w-[80px]',
    },
  },
})
