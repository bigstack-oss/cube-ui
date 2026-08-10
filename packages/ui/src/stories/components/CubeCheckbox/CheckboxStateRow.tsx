import { useState, type ChangeEvent } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import { CubeCheckbox, type CubeCheckboxProps } from '@components/CubeCheckbox'
import { CheckboxRow } from './CheckboxRow'
import { checkboxText } from './utils'

export type CheckboxStateRowProps = {
  title: string
  checkboxProps: Omit<CubeCheckboxProps, 'label' | 'onChange'>
}

const CheckboxStateRowHeader = () => {
  return (
    <CheckboxRow title="">
      <SubHeading>Unchecked</SubHeading>
      <SubHeading>Checked</SubHeading>
      <SubHeading>Indeterminate</SubHeading>
    </CheckboxRow>
  )
}

export const CheckboxStateRow = (props: CheckboxStateRowProps) => {
  const { title, checkboxProps } = props

  const [checked, setChecked] = useState<boolean | null>(true)
  const [unchecked, setUnchecked] = useState<boolean | null>(false)
  const [indeterminateChecked, setIndeterminateChecked] = useState<
    boolean | null
  >(null)

  const handleChecked = (event: ChangeEvent<HTMLInputElement>) =>
    setChecked(event.target.checked)

  const handleUnchecked = (event: ChangeEvent<HTMLInputElement>) =>
    setUnchecked(event.target.checked)

  const handleIndeterminateChecked = (event: ChangeEvent<HTMLInputElement>) =>
    setIndeterminateChecked(event.target.checked)

  return (
    <CheckboxRow title={title}>
      <CubeCheckbox
        {...checkboxProps}
        label={checkboxText}
        checked={unchecked}
        onChange={handleUnchecked}
      />
      <CubeCheckbox
        {...checkboxProps}
        label={checkboxText}
        checked={checked}
        onChange={handleChecked}
      />
      <CubeCheckbox
        {...checkboxProps}
        label={checkboxText}
        checked={indeterminateChecked}
        onChange={handleIndeterminateChecked}
      />
    </CheckboxRow>
  )
}

CheckboxStateRow.Header = CheckboxStateRowHeader
