import dayjs from 'dayjs'
import {
  computeCalendarWeeks,
  formatDateRange,
  getDateButtonStatus,
} from './cubeDatePickerUtils'

const ymd = (date: dayjs.Dayjs) => date.format('YYYY-MM-DD')

describe('formatDateRange', () => {
  it.each([
    [dayjs('2025-04-15'), dayjs('2025-05-31'), '2025/04/15 - 2025/05/31'],
    [dayjs('2025-04-15'), undefined, '2025/04/15'],
    [undefined, dayjs('2025-05-31'), '2025/05/31'],
    [undefined, undefined, undefined],
  ])('formats %s and %s', (start, end, expected) => {
    expect(formatDateRange(start, end)).toBe(expected)
  })
})

describe('getDateButtonStatus', () => {
  const now = dayjs('2026-11-25')
  const start = dayjs('2026-11-10')
  const end = dayjs('2026-11-20')

  it.each([
    ['2026-11-05', 'unselected'],
    ['2026-11-25', 'unselected-today'],
    ['2026-11-10', 'selected-range-start'],
    ['2026-11-15', 'selected-range-between'],
    ['2026-11-20', 'selected-range-end'],
  ])('returns the status of %s within a range', (date, expected) => {
    expect(
      getDateButtonStatus({
        date: dayjs(date),
        now,
        selectedStartDate: start,
        selectedEndDate: end,
      }),
    ).toBe(expected)
  })

  it('returns selected-single when start and end are the same day', () => {
    expect(
      getDateButtonStatus({
        date: start,
        now,
        selectedStartDate: start,
        selectedEndDate: start,
      }),
    ).toBe('selected-single')
  })

  it('returns selected-range-start for a start without an end', () => {
    expect(
      getDateButtonStatus({
        date: start,
        now,
        selectedStartDate: start,
        selectedEndDate: undefined,
      }),
    ).toBe('selected-range-start')
  })
})

describe('computeCalendarWeeks', () => {
  it('fills full Sunday-to-Saturday weeks around the month', () => {
    // April 2025 starts on a Tuesday and ends on a Wednesday.
    const weeks = computeCalendarWeeks(dayjs('2025-04-01'))

    expect(weeks).toHaveLength(5)
    expect(weeks.every((week) => week.length === 7)).toBe(true)
    expect(ymd(weeks[0]![0]!)).toBe('2025-03-30')
    expect(ymd(weeks[4]![6]!)).toBe('2025-05-03')
  })

  it('adds no extra days when the month starts on Sunday', () => {
    // November 2026 starts on a Sunday.
    const weeks = computeCalendarWeeks(dayjs('2026-11-01'))

    expect(ymd(weeks[0]![0]!)).toBe('2026-11-01')
    expect(ymd(weeks.at(-1)!.at(-1)!)).toBe('2026-12-05')
  })
})
