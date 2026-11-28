import { useContext } from 'react'
import { MonochromeCalendar } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeDatePickerContext } from './cubeDatePickerContext'
import { trigger, triggerIcon } from './cubeDatePickerStyles'
import { formatDateRange } from './cubeDatePickerUtils'

export const CubeDatePickerTrigger = () => {
  const {
    floatingProps,
    isSelected,
    triggerDisabled: disabled,
    calendarOpen: isOpen,
    toggleCalendarOpen,
    displayDates,
    testId,
  } = useContext(CubeDatePickerContext)

  const { start, end } = displayDates

  const { t } = useCubeUiTranslation()

  return (
    <button
      ref={floatingProps.anchorRef}
      type="button"
      disabled={disabled}
      onClick={toggleCalendarOpen}
      className={trigger({ isSelected, isOpen, disabled })}
      data-testid={testId}
    >
      <MonochromeCalendar className={triggerIcon()} />
      <span>
        {formatDateRange(start, end) ?? t('component.datePicker.time')}
      </span>
    </button>
  )
}
