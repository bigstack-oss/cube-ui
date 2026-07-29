import { useState } from 'react'
import { type CubeInputProps, CubeInput } from '../CubeInput/CubeInput'
import { MonochromeView as View, MonochromeViewOff as ViewOff } from '@icons'

export type CubePasswordInputProps = Omit<
  CubeInputProps,
  'trailingIcon' | 'type'
> & {
  /**
   * @default false
   */
  initialShowPassword?: boolean
}

export const CubePasswordInput = (props: CubePasswordInputProps) => {
  const { initialShowPassword = false, disabled, ...restProps } = props

  const [showPassword, setShowPassword] = useState<boolean>(initialShowPassword)

  const handleShowHide = () => {
    setShowPassword((prev) => !prev)
  }

  const IconComponent = showPassword ? View : ViewOff

  return (
    <CubeInput
      {...restProps}
      type={showPassword ? 'text' : 'password'}
      disabled={disabled}
      trailingIcon={
        <IconComponent onClick={disabled ? undefined : handleShowHide} />
      }
    />
  )
}
