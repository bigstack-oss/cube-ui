import { useState, type ChangeEvent } from 'react'
import {
  CubeRadioButton,
  type CubeRadioButtonGridProps,
} from '@components/CubeRadioButton'
import { RadioButtonRow } from './RadioButtonRow'
import { radioButtonOptions } from './utils'

export type RadioButtonLayoutRowProps = {
  title: string
  direction: CubeRadioButtonGridProps['direction']
}

export const RadioButtonLayoutRow = (props: RadioButtonLayoutRowProps) => {
  const { title, direction } = props

  const [selectedValue, setSelectedValue] = useState<string>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
  }

  return (
    <RadioButtonRow title={title}>
      <CubeRadioButton.Grid direction={direction} className="col-span-3">
        {radioButtonOptions.map((option) => (
          <CubeRadioButton
            key={option.value}
            label={option.label}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleChange}
          />
        ))}
      </CubeRadioButton.Grid>
    </RadioButtonRow>
  )
}
