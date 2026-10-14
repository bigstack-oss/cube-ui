import { useState, type ChangeEvent } from 'react'
import { CubeCheckbox, type CubeCheckboxProps } from '@components/CubeCheckbox'
import { checkboxText, type CheckboxCheckState } from './utils'

const initialChecked: Record<CheckboxCheckState, boolean | null> = {
  Unchecked: false,
  Checked: true,
  Indeterminate: null,
}

export type CheckboxStateCellProps = Omit<
  CubeCheckboxProps,
  'label' | 'checked' | 'onChange'
> & {
  checkState: CheckboxCheckState
}

/**
 * One Gallery cell: a checkbox that starts in `checkState` and stays clickable.
 */
export const CheckboxStateCell = (props: CheckboxStateCellProps) => {
  const { checkState, ...checkboxProps } = props

  const [checked, setChecked] = useState(initialChecked[checkState])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked)

  return (
    <CubeCheckbox
      {...checkboxProps}
      label={checkboxText}
      checked={checked}
      onChange={handleChange}
    />
  )
}
