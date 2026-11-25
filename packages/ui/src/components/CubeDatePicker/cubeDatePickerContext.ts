import { createContext } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import type { UseFloating } from '@internals/utils/floating/useFloating'
import type { CubeDatePickerDates } from './cubeDatePickerTypes'

export type CubeDatePickerContextValue = {
  now: Dayjs
  currentMonth: Dayjs
  calendarOpen: boolean
  toggleCalendarOpen: () => void
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>

  triggerDisabled: boolean
  isSelected: boolean
  displayDates: CubeDatePickerDates
  onDateClick: (date: Dayjs) => void
  onPreviousMonthClick: () => void
  onNextMonthClick: () => void
  onCancel: () => void
  onApply: () => void
  onReset: () => void
}

export const CubeDatePickerContext = createContext<CubeDatePickerContextValue>({
  now: dayjs(),
  currentMonth: dayjs(),
  calendarOpen: false,
  toggleCalendarOpen: () => {},
  floatingProps: undefined as unknown as UseFloating<
    HTMLButtonElement,
    HTMLDivElement
  >,

  triggerDisabled: false,
  isSelected: false,
  displayDates: {
    start: undefined,
    end: undefined,
  },
  onDateClick: () => {},
  onPreviousMonthClick: () => {},
  onNextMonthClick: () => {},
  onCancel: () => {},
  onApply: () => {},
  onReset: () => {},
})
