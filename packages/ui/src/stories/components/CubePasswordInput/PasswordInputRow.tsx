import { SubHeading } from '@internals/components/SubHeading'
import {
  CubePasswordInput,
  type CubePasswordInputProps,
} from '@components/CubePasswordInput'

export type PasswordInputRowProps = {
  title: string
  inputProps?: Omit<CubePasswordInputProps, 'label' | 'placeholder'>
}

const PasswordInputRowHeader = () => {
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

export const PasswordInputRow = (props: PasswordInputRowProps) => {
  const { title, inputProps } = props

  return (
    <div className="grid grid-cols-5 items-end gap-x-12">
      <div className="flex h-full items-center">
        <SubHeading>{title}</SubHeading>
      </div>
      <CubePasswordInput {...inputProps} />
      <CubePasswordInput {...inputProps} placeholder="Placeholder" />
      <CubePasswordInput {...inputProps} label="Label" />
      <CubePasswordInput
        {...inputProps}
        label="Label"
        placeholder="Placeholder"
      />
    </div>
  )
}

PasswordInputRow.Header = PasswordInputRowHeader
