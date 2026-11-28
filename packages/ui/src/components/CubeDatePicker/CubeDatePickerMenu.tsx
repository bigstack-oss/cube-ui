import { useContext } from 'react'
import { createPortal } from 'react-dom'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { testIdOf } from '@utils/testId'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeDatePickerCalendar } from './CubeDatePickerCalendar'
import { CubeDatePickerContext } from './cubeDatePickerContext'
import { CubeDatePickerInput } from './CubeDatePickerInput'
import { menu, menuActions, menuInputs } from './cubeDatePickerStyles'

export const CubeDatePickerMenu = () => {
  const { floatingProps, displayDates, onApply, onReset, testId } = useContext(
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
      data-testid={testIdOf(testId, 'menu')}
    >
      <div className={menuInputs()}>
        <CubeDatePickerInput
          type="start"
          value={start ? start.format('YYYY/MM/DD') : ''}
          placeholder={t('component.datePicker.chooseStart')}
          testId={testIdOf(testId, 'start')}
        />
        <CubeDatePickerInput
          type="end"
          value={end ? end.format('YYYY/MM/DD') : ''}
          placeholder={t('component.datePicker.chooseEnd')}
          testId={testIdOf(testId, 'end')}
        />
      </div>
      <CubeDatePickerCalendar />
      <div className={menuActions()}>
        <CubeButton
          size="sm"
          type="ghost"
          onClick={onReset}
          data-testid={testIdOf(testId, 'reset')}
        >
          {t('component.datePicker.reset')}
        </CubeButton>
        <CubeButton
          size="sm"
          type="primary"
          onClick={onApply}
          disabled={!start || !end}
          data-testid={testIdOf(testId, 'apply')}
        >
          {t('component.datePicker.apply')}
        </CubeButton>
      </div>
    </div>,
    document.body,
  )
}
