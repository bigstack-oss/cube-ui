import {
  CubeCheckbox,
  type CubeCheckboxGridProps,
} from '@components/CubeCheckbox'
import { CheckboxRow } from './CheckboxRow'
import { longCheckboxText } from './utils'

export type CheckboxLayoutRowProps = {
  title: string
  direction: CubeCheckboxGridProps['direction']
}

export const CheckboxLayoutRow = (props: CheckboxLayoutRowProps) => {
  const { title, direction } = props
  return (
    <CheckboxRow title={title}>
      <CubeCheckbox.Grid direction={direction} className="col-span-3">
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
        <CubeCheckbox label={longCheckboxText} />
      </CubeCheckbox.Grid>
    </CheckboxRow>
  )
}
