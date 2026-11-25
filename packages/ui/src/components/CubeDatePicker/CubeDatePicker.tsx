import { useCallback, useContext, useEffect, useState } from 'react'
import { useFloating } from '@internals/utils/floating/useFloating'
import { useTimeZoneTime } from '@internals/utils/timeZone/useTimeZoneTime'
import { CubeDatePickerContext } from './cubeDatePickerContext'
import { CubeDatePickerMenu } from './CubeDatePickerMenu'
import { CubeDatePickerSkeleton } from './CubeDatePickerSkeleton'
import { CubeDatePickerTrigger } from './CubeDatePickerTrigger'
import type { CubeDatePickerProps } from './cubeDatePickerTypes'
import { CubeTimeZoneContext } from './CubeTimeZoneContext'
import { useDayjsState } from './useDayjsState'

export const CubeDatePicker = (props: CubeDatePickerProps) => {
  const {
    disabled = false,
    isLoading = false,
    displayDates,
    onChange: onChangeProps,
    onCancel: onCancelProps,
    onApply: onApplyProps,
    onReset: onResetProps,
  } = props

  const timeZone = useContext(CubeTimeZoneContext)

  const now = useTimeZoneTime(timeZone, 5000)

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [currentMonth, setCurrentMonth] = useDayjsState(
    /**
     * Initialize `currentMonth` to either `displayDates.start` (if available) or `now`.
     * Also, the value only needs to be computed once.
     */
    () => displayDates.start ?? now,
  )

  const onApply = () => {
    const { start, end } = displayDates

    if (!start || !end) return

    onApplyProps()
    setIsCalendarOpen(false)
  }

  const onReset = useCallback(() => {
    onResetProps()
  }, [onResetProps])

  const onCancel = useCallback(() => {
    onCancelProps()
    setIsCalendarOpen(false)
  }, [onCancelProps])

  const toggleCalendarOpen = () => {
    setIsCalendarOpen((prev) => !prev)
  }

  const onPreviousMonthClick = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'))
  }

  const onNextMonthClick = () => {
    setCurrentMonth(currentMonth.add(1, 'month'))
  }

  const floatingProps = useFloating<HTMLButtonElement, HTMLDivElement>({
    isOpen: isCalendarOpen,
    placement: 'bottom-left',
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef } = floatingProps

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        onCancel()
      }
    },
    [anchorRef, elementRef, onCancel],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  if (isLoading) return <CubeDatePickerSkeleton />

  return (
    <CubeDatePickerContext.Provider
      value={{
        now,
        currentMonth,
        calendarOpen: isCalendarOpen,
        toggleCalendarOpen,
        floatingProps,
        triggerDisabled: disabled,
        isSelected: !!displayDates.start || !!displayDates.end,
        displayDates,
        onDateClick: onChangeProps,
        onPreviousMonthClick,
        onNextMonthClick,
        onCancel,
        onApply,
        onReset,
      }}
    >
      <CubeDatePickerTrigger />
      <CubeDatePickerMenu />
    </CubeDatePickerContext.Provider>
  )
}
