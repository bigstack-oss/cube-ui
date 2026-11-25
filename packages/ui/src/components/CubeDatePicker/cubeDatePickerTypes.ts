import type { Dayjs } from 'dayjs'

export const cubeDatePickerDateStatuses = [
  'unselected',
  'unselected-today',
  'selected-single',
  'selected-range-start',
  'selected-range-between',
  'selected-range-end',
] as const

export type CubeDatePickerDateStatus =
  (typeof cubeDatePickerDateStatuses)[number]

export type CubeDatePickerDates = {
  start: Dayjs | undefined
  end: Dayjs | undefined
}

export type CubeDatePickerProps = {
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * The range shown in the trigger and the calendar; manage it with
   * `useCubeDatePickerDisplayDates`.
   */
  displayDates: CubeDatePickerDates
  /**
   * Called with the clicked day.
   */
  onChange: (date: Dayjs) => void
  /**
   * Called when the calendar closes without applying (a click outside it).
   */
  onCancel: () => void
  /**
   * Called by Apply, only when both dates are set; the calendar then closes.
   */
  onApply: () => void
  onReset: () => void
}

export type UseCubeDatePickerDisplayDatesOptions = {
  initialStartDate?: Dayjs | undefined
  initialEndDate?: Dayjs | undefined
}

export type UseCubeDatePickerDisplayDates = {
  displayDates: CubeDatePickerDates
  onChange: (date: Dayjs) => void
  onCancel: () => void
  onReset: () => void
}
