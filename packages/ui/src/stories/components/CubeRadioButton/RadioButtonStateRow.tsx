import { useState, type ChangeEvent } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import {
  CubeRadioButton,
  type CubeRadioButtonProps,
} from '@components/CubeRadioButton'
import { RadioButtonRow } from './RadioButtonRow'
import { radioButtonText } from './utils'

export type RadioButtonStateRowProps = {
  title: string
  radioButtonProps?: Omit<
    CubeRadioButtonProps,
    'label' | 'onChange' | 'checked'
  >
}

const RadioButtonStateRowHeader = () => {
  return (
    <RadioButtonRow title="">
      <SubHeading>Unselected</SubHeading>
      <SubHeading>Selected</SubHeading>
    </RadioButtonRow>
  )
}

export const RadioButtonStateRow = (props: RadioButtonStateRowProps) => {
  const { title, radioButtonProps } = props

  const [unselected, setUnselected] = useState(false)
  const [selected, setSelected] = useState(true)

  const handleUnselected = (event: ChangeEvent<HTMLInputElement>) =>
    setUnselected(event.target.checked)

  const handleSelected = (event: ChangeEvent<HTMLInputElement>) =>
    setSelected(event.target.checked)

  return (
    <RadioButtonRow title={title}>
      <CubeRadioButton
        {...radioButtonProps}
        label={radioButtonText}
        checked={unselected}
        onChange={handleUnselected}
      />
      <CubeRadioButton
        {...radioButtonProps}
        label={radioButtonText}
        checked={selected}
        onChange={handleSelected}
      />
    </RadioButtonRow>
  )
}

RadioButtonStateRow.Header = RadioButtonStateRowHeader
