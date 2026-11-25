import { act, renderHook } from '@testing-library/react'
import dayjs from 'dayjs'
import type { CubeDatePickerDates } from './cubeDatePickerTypes'
import { useCubeDatePickerDisplayDates } from './useCubeDatePickerDisplayDates'

const ymd = (dates: CubeDatePickerDates) => [
  dates.start?.format('YYYY-MM-DD'),
  dates.end?.format('YYYY-MM-DD'),
]

describe('useCubeDatePickerDisplayDates', () => {
  it('starts from the initial dates', () => {
    const { result } = renderHook(() =>
      useCubeDatePickerDisplayDates({
        initialStartDate: dayjs('2025-04-15'),
        initialEndDate: dayjs('2025-05-31'),
      }),
    )

    expect(ymd(result.current.displayDates)).toEqual([
      '2025-04-15',
      '2025-05-31',
    ])
  })

  it('sets the start, then the end, then starts over', () => {
    const { result } = renderHook(() => useCubeDatePickerDisplayDates({}))

    act(() => result.current.onChange(dayjs('2026-11-10')))
    expect(ymd(result.current.displayDates)).toEqual(['2026-11-10', undefined])

    act(() => result.current.onChange(dayjs('2026-11-20')))
    expect(ymd(result.current.displayDates)).toEqual([
      '2026-11-10',
      '2026-11-20',
    ])

    act(() => result.current.onChange(dayjs('2026-11-05')))
    expect(ymd(result.current.displayDates)).toEqual(['2026-11-05', undefined])
  })

  it('swaps when the end is before the start', () => {
    const { result } = renderHook(() => useCubeDatePickerDisplayDates({}))

    act(() => result.current.onChange(dayjs('2026-11-20')))
    act(() => result.current.onChange(dayjs('2026-11-10')))

    expect(ymd(result.current.displayDates)).toEqual([
      '2026-11-10',
      '2026-11-20',
    ])
  })

  it('cancels back to the initial dates and resets to none', () => {
    const { result } = renderHook(() =>
      useCubeDatePickerDisplayDates({
        initialStartDate: dayjs('2026-11-01'),
        initialEndDate: dayjs('2026-11-08'),
      }),
    )

    act(() => result.current.onChange(dayjs('2026-11-18')))
    act(() => result.current.onCancel())
    expect(ymd(result.current.displayDates)).toEqual([
      '2026-11-01',
      '2026-11-08',
    ])

    act(() => result.current.onReset())
    expect(ymd(result.current.displayDates)).toEqual([undefined, undefined])
  })
})
