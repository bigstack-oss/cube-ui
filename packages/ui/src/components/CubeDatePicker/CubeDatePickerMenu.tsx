import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeDatePickerCalendar } from './CubeDatePickerCalendar'
import { CubeDatePickerContext } from './cubeDatePickerContext'
import { CubeDatePickerInput } from './CubeDatePickerInput'
import { menu, menuActions, menuInputs } from './cubeDatePickerStyles'

export const CubeDatePickerMenu = () => {
  const { floatingProps, displayDates, onApply, onReset } = useContext(
    CubeDatePickerContext,
  )

  const { start, end } = displayDates

  const { elementRef, resolvedStyles } = floatingProps

  const { t } = useCubeUiTranslation()

  return createPortal(
    <div
      ref={elementRef}
      className={menu()}
      style={resolvedStyles?.floatingStyle}
    >
      <div className={menuInputs()}>
        <CubeDatePickerInput
          type="start"
          value={start ? start.format('YYYY/MM/DD') : ''}
          placeholder={t('component.datePicker.chooseStart')}
        />
        <CubeDatePickerInput
          type="end"
          value={end ? end.format('YYYY/MM/DD') : ''}
          placeholder={t('component.datePicker.chooseEnd')}
        />
      </div>
      <CubeDatePickerCalendar />
      <div className={menuActions()}>
        <CubeButton size="sm" type="ghost" onClick={onReset}>
          {t('component.datePicker.reset')}
        </CubeButton>
        <CubeButton
          size="sm"
          type="primary"
          onClick={onApply}
          disabled={!start || !end}
        >
          {t('component.datePicker.apply')}
        </CubeButton>
      </div>
    </div>,
    document.body,
  )
}
