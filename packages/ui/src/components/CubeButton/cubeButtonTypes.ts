import type { ButtonHTMLAttributes, JSX } from 'react'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
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

/**
 * An icon-only button has no text, so it must be named for screen readers
 * and for tests that find it by role: `aria-label`, or `aria-labelledby`
 * pointing at visible text.
 *
 * The type checks that a name is given, not that it has text: an empty
 * `aria-label`, or an `aria-labelledby` that matches no element, still
 * compiles and leaves the button unnamed.
 */
type CubeButtonAccessibleName =
  | { 'aria-label': string }
  | { 'aria-labelledby': string }

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
    | ({
        usage: Extract<CubeButtonUsage, 'icon-only'>
        Icon: SvgComponent
      } & CubeButtonAccessibleName)
    | {
        usage: Extract<CubeButtonUsage, 'icon-left' | 'icon-right'>
        children: string
        Icon: SvgComponent
      }
  ) &
  CubeTestIdProps
