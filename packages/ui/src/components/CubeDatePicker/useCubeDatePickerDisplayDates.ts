import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import type {
  CubeDatePickerDates,
  UseCubeDatePickerDisplayDates,
  UseCubeDatePickerDisplayDatesOptions,
} from './cubeDatePickerTypes'

/**
 * Keeps the range shown while picking. Pass the last applied dates as the
 * initial dates on every render: cancelling goes back to them.
 */
export const useCubeDatePickerDisplayDates = (
  options: UseCubeDatePickerDisplayDatesOptions,
): UseCubeDatePickerDisplayDates => {
  const { initialStartDate, initialEndDate } = options

  const [displayDates, setDisplayDates] = useState<CubeDatePickerDates>({
    start: initialStartDate,
    end: initialEndDate,
  })

  const onChange = (date: Dayjs) => {
    const { start, end } = displayDates

    if (start && end) {
      setDisplayDates({ start: date, end: undefined })
    } else if (!start) {
      setDisplayDates({ start: date, end: undefined })
    } else if (start && date >= start) {
      setDisplayDates((prev) => ({ ...prev, end: date }))
    } else {
      setDisplayDates((prev) => ({ start: date, end: prev.start }))
    }
  }

  const onCancel = () => {
    setDisplayDates({ start: initialStartDate, end: initialEndDate })
  }

  const onReset = () => {
    setDisplayDates({ start: undefined, end: undefined })
  }

  return {
    displayDates,
    onChange,
    onCancel,
    onReset,
  }
}
