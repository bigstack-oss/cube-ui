import { upperFirst } from 'lodash'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeTableInput } from '../CubeTableInput/CubeTableInput'
import { input, inputLabel } from './cubeDatePickerStyles'

type CubeDatePickerInputProps = {
  type: 'start' | 'end'
  value?: string
  placeholder?: string
}

export const CubeDatePickerInput = (props: CubeDatePickerInputProps) => {
  const { type, value, placeholder } = props

  const { t } = useCubeUiTranslation()

  const typeDisplay = t(`component.datePicker.${type}`)

  return (
    <div className={input()}>
      <p className={inputLabel()}>{upperFirst(typeDisplay)}</p>
      <CubeTableInput
        type="text"
        value={value}
        placeholder={placeholder}
        hideErrorIcon={true}
        readOnly
      />
    </div>
  )
}
