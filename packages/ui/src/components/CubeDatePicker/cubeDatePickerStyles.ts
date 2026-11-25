import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeDatePickerDateStatus } from './cubeDatePickerTypes'

export const trigger = cva(
  [
    'secondary-body2 flex h-[34px] items-center gap-2 rounded-[5px] px-4 py-2 font-semibold',
    'border',
  ],
  {
    variants: {
      isSelected: {
        true: '',
        false: '',
      },
      isOpen: {
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
        isSelected: false,
        disabled: false,
        class:
          'border-blue-700 bg-grey-0 text-blue-700 hover:border-blue-600 hover:text-blue-600',
      },
      {
        isSelected: false,
        disabled: true,
        class: 'border-blue-200 text-functional-disable-text',
      },
      {
        isSelected: true,
        disabled: false,
        class:
          'border-blue-700 bg-secondary-50 text-blue-850 hover:bg-secondary-100',
      },
      {
        isSelected: true,
        isOpen: true,
        disabled: false,
        class:
          'border-blue-700 bg-secondary-100 text-blue-850 hover:bg-secondary-100',
      },
      {
        isSelected: true,
        disabled: true,
        class: 'border-blue-200 bg-secondary-0 text-functional-disable-text',
      },
    ],
  },
)

export const triggerIcon = cva('icon-md shrink-0')

export const menu = cva([
  'z-10 flex w-fit flex-col gap-4 border p-4',
  'rounded-[5px] border-functional-border-divider bg-white shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
])

export const menuInputs = cva('flex gap-4')

export const menuActions = cva('flex justify-end gap-2')

export const input = cva('flex w-[132.5px] flex-col gap-2')

export const inputLabel = cva(
  'primary-body4 font-medium text-functional-text-light',
)

export const calendar = cva('flex flex-col gap-[15px]')

export const calendarHeader = cva('flex items-center justify-between')

export const monthButton = cva('cursor-pointer p-[10px]')

export const monthIcon = cva('icon-md text-functional-text')

export const monthTitle = cva('secondary-h5')

export const weekdays = cva('grid grid-cols-7 items-center text-center')

export const weekday = cva('primary-body3 w-10 text-functional-text-light')

export const weeks = cva('flex flex-col gap-y-1')

export const week = cva('grid grid-cols-7 gap-0')

export const dayButton = cva(
  'primary-body2 flex aspect-square w-full items-center justify-center',
  {
    variants: {
      status: {
        unselected: 'rounded-[5px] text-functional-title hover:bg-blue-0',
        'unselected-today':
          'rounded-[5px] font-semibold text-blue-700 hover:bg-blue-0',
        'selected-single':
          'rounded-[5px] bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
        'selected-range-start':
          'rounded-l-[5px] bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
        'selected-range-between':
          'bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
        'selected-range-end':
          'rounded-r-[5px] bg-secondary-100 font-semibold text-blue-700 hover:bg-blue-800 hover:text-white',
      } satisfies Record<CubeDatePickerDateStatus, ClassValue>,
      disabled: {
        true: 'text-functional-disable-text hover:bg-white',
      },
    },
  },
)

export const skeleton = cva('h-[34px] w-[91px]')
