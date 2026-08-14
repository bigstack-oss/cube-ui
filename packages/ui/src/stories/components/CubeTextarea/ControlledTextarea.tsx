import { useState, type ChangeEvent } from 'react'
import { CubeTextarea, type CubeTextareaProps } from '@components/CubeTextarea'
import { SubHeading } from '@internals/components/SubHeading'

const shortText = 'Default Text'
const longText = `Display an ellipsis when a long message is entered in the input field. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum have been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`

type ControlledTextareaProps = {
  title: string
  defaultValue?: 'short' | 'long'
  textareaProps: Omit<
    CubeTextareaProps,
    'label' | 'placeholder' | 'maxLength' | 'value' | 'onChange'
  >
}

const getInitialValue = (
  defaultValue: ControlledTextareaProps['defaultValue'],
): string => {
  if (defaultValue === 'short') return shortText
  if (defaultValue === 'long') return longText
  return ''
}

export const ControlledTextarea = (props: ControlledTextareaProps) => {
  const { title, defaultValue, textareaProps } = props

  const [value, setValue] = useState(() => getInitialValue(defaultValue))

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return (
    <div className="grid grid-cols-4 items-start gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      <CubeTextarea
        {...textareaProps}
        label="Label"
        placeholder="Placeholder"
        maxLength={20}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
