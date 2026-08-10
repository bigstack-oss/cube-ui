import type { InputHTMLAttributes, RefObject } from 'react'

export const cubeCheckboxColors = [
  'primary',
  'primary-dark',
  'secondary',
  'secondary-dark',
] as const

export const cubeCheckboxLabelSizes = ['md', 'sm', 'xs'] as const

export const cubeCheckboxGridDirections = ['vertical', 'wrap'] as const

export type CubeCheckboxColor = (typeof cubeCheckboxColors)[number]

export type CubeCheckboxLabelSize = (typeof cubeCheckboxLabelSizes)[number]

export type CubeCheckboxGridDirection =
  (typeof cubeCheckboxGridDirections)[number]

export type CubeCheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'checked' | 'defaultChecked'
> & {
  containerClassName?: string
  /**
   * @default "primary"
   */
  color?: CubeCheckboxColor
  label?: string
  /**
   * @default "md"
   */
  labelSize?: CubeCheckboxLabelSize
  labelClassName?: string
  /**
   * Use `null` for indeterminate state.
   */
  checked?: boolean | null
  /**
   * Use `null` for indeterminate state.
   */
  defaultChecked?: boolean | null
  /**
   * @default false
   */
  isLoading?: boolean
  ref?: RefObject<HTMLInputElement | null>
}
