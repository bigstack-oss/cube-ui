import { useContext, useMemo } from 'react'
import dayjs from 'dayjs'
import { MonochromeChevronLeft, MonochromeChevronRight } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { testIdOf } from '@utils/testId'
import { CubeDatePickerContext } from './cubeDatePickerContext'
import {
  calendar,
  calendarHeader,
  dayButton,
  monthButton,
  monthIcon,
  monthTitle,
  week,
  weekday,
  weekdays,
  weeks as weeksStyle,
} from './cubeDatePickerStyles'
import {
  computeCalendarWeeks,
  getDateButtonStatus,
} from './cubeDatePickerUtils'

export const CubeDatePickerCalendar = () => {
  const {
    now,
    currentMonth,
    onPreviousMonthClick,
    onNextMonthClick,
    onDateClick,
    displayDates,
    testId,
  } = useContext(CubeDatePickerContext)

  const { start, end } = displayDates

  const startDateOfCurrentMonth = useMemo(
    () => currentMonth.startOf('month'),
    [currentMonth],
  )

  const weeks = useMemo(
    () => computeCalendarWeeks(startDateOfCurrentMonth),
    [startDateOfCurrentMonth],
  )

  const { t } = useCubeUiTranslation()

  const weekTitles = [
    t('component.datePicker.weekdays.sunday'),
    t('component.datePicker.weekdays.monday'),
    t('component.datePicker.weekdays.tuesday'),
    t('component.datePicker.weekdays.wednesday'),
    t('component.datePicker.weekdays.thursday'),
    t('component.datePicker.weekdays.friday'),
    t('component.datePicker.weekdays.saturday'),
  ]

  return (
    <div className={calendar()}>
      <div className={calendarHeader()}>
        <div
          onClick={onPreviousMonthClick}
          className={monthButton()}
          data-testid={testIdOf(testId, 'prev')}
        >
          <MonochromeChevronLeft className={monthIcon()} />
        </div>
        <div className={monthTitle()} data-testid={testIdOf(testId, 'month')}>
          {dayjs(currentMonth).format('MMMM YYYY')}
        </div>
        <div
          onClick={onNextMonthClick}
          className={monthButton()}
          data-testid={testIdOf(testId, 'next')}
        >
          <MonochromeChevronRight className={monthIcon()} />
        </div>
      </div>
      <div className={weekdays()}>
        {weekTitles.map((title, index) => (
          <div key={`${title}-${index}`} className={weekday()}>
            {title}
          </div>
        ))}
      </div>
      <div className={weeksStyle()}>
        {weeks.map((days, weekIndex) => (
          <div key={weekIndex} className={week()}>
            {days.map((date, dayIndex) => (
              <button
                key={dayIndex}
                onClick={() => onDateClick(date)}
                disabled={false}
                data-testid={testIdOf(testId, 'day')}
                // The date, so a test does not depend on the month's layout or language.
                data-key={testId ? date.format('YYYY-MM-DD') : undefined}
                className={dayButton({
                  status: getDateButtonStatus({
                    date,
                    now,
                    selectedStartDate: start,
                    selectedEndDate: end,
                  }),
                  // TODO: apply disabled logic
                  disabled: false,
                })}
              >
                {date.date()}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
