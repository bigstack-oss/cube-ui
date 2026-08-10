import { CubeCheckbox, type CubeCheckboxProps } from '@components/CubeCheckbox'
import { CaptionText } from '@internals/components/CaptionText'
import { SubHeading } from '@internals/components/SubHeading'
import { CheckboxRow } from './CheckboxRow'
import { checkboxText } from './utils'

type LabelSize = Exclude<CubeCheckboxProps['labelSize'], undefined>

const captionTexts: Record<LabelSize, string> = {
  md: '14px (default)',
  sm: '13px',
  xs: '12px',
}

type CheckboxLabelSizeRowProps = {
  labelSize: LabelSize
}

const CheckboxLabelSizeRowHeader = () => {
  return (
    <CheckboxRow title="">
      <SubHeading>Font size</SubHeading>
      <SubHeading>Checkbox</SubHeading>
    </CheckboxRow>
  )
}

export const CheckboxLabelSizeRow = (props: CheckboxLabelSizeRowProps) => {
  const { labelSize } = props
  return (
    <CheckboxRow title={labelSize.toUpperCase()}>
      <CaptionText>{captionTexts[labelSize]}</CaptionText>
      <CubeCheckbox label={checkboxText} labelSize={labelSize} />
    </CheckboxRow>
  )
}

CheckboxLabelSizeRow.Header = CheckboxLabelSizeRowHeader
