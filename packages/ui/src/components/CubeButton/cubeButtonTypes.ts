import type { ButtonHTMLAttributes, JSX } from 'react'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'

export const cubeButtonTypes = [
  'primary',
  'secondary',
  'ghost',
  'warning',
  'light',
] as const

export const cubeButtonSizes = ['sm', 'md', 'lg'] as const

export const cubeButtonUsages = [
  'text-only',
  'icon-only',
  'icon-left',
  'icon-right',
] as const

export type CubeButtonType = (typeof cubeButtonTypes)[number]

export type CubeButtonSize = (typeof cubeButtonSizes)[number]

export type CubeButtonUsage = (typeof cubeButtonUsages)[number]

export type CubeButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'type' | 'children'
> & {
  /**
   * @default "button"
   */
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  /**
   * @default "primary"
   */
  type?: CubeButtonType
  /**
   * @default "md"
   */
  size?: CubeButtonSize
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  loading?: boolean
} & (
    | {
        usage?: never
        children: string
      }
    | {
        usage: Extract<CubeButtonUsage, 'text-only'>
        children: string
      }
    | {
        usage: Extract<CubeButtonUsage, 'icon-only'>
        Icon: SvgComponent
      }
    | {
        usage: Extract<CubeButtonUsage, 'icon-left' | 'icon-right'>
        children: string
        Icon: SvgComponent
      }
  )
