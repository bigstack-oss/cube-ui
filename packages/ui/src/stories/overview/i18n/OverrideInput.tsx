import { useState } from 'react'
import { CubeButton } from '../../../components/CubeButton'
import { CubeInput } from '../../../components/CubeInput'
import type { CubeUiLocale } from '../../../i18n'

type OverrideInputProps = {
  language: CubeUiLocale
  onSubmit: (text: string) => void
  onClear?: () => void
}

export const OverrideInput = (props: OverrideInputProps) => {
  const { language, onSubmit, onClear } = props

  const [text, setText] = useState('')

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleSubmit = () => onSubmit(text)

  const handleClear = () => {
    setText('')
    onClear?.()
  }

  return (
    <div className="flex items-center gap-x-2">
      <CubeInput
        placeholder={`Override ${language} with...`}
        value={text}
        onChange={handleTextChange}
      />
      <CubeButton type="primary" onClick={handleSubmit}>
        Override
      </CubeButton>
      <CubeButton type="secondary" onClick={handleClear}>
        Restore
      </CubeButton>
    </div>
  )
}
