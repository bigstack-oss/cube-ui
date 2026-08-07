import { SubHeading } from '@internals/components/SubHeading'
import { CubeInput, type CubeInputProps } from '@components/CubeInput'

export type InputRowProps = {
  title: string
  inputProps?: Omit<CubeInputProps, 'label' | 'placeholder'>
}

const InputRowHeader = () => {
  return (
    <div className="grid grid-cols-5 items-end gap-x-12">
      <div />
      <SubHeading>Regular</SubHeading>
      <SubHeading>w/Placeholder</SubHeading>
      <SubHeading>w/Label</SubHeading>
      <SubHeading>w/Label & Placeholder</SubHeading>
    </div>
  )
}

export const InputRow = (props: InputRowProps) => {
  const { title, inputProps } = props

  return (
    <div className="grid grid-cols-5 items-end gap-x-12">
      <div className="flex h-full items-center">
        <SubHeading>{title}</SubHeading>
      </div>
      <CubeInput {...inputProps} />
      <CubeInput {...inputProps} placeholder="Placeholder" />
      <CubeInput {...inputProps} label="Label" />
      <CubeInput {...inputProps} label="Label" placeholder="Placeholder" />
    </div>
  )
}

InputRow.Header = InputRowHeader
