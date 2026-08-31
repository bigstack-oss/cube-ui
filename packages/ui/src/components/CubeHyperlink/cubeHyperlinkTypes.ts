import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'
import type { PropsWithClassName } from '@shared-types/react-types'

export const cubeHyperlinkColors = ['primary', 'secondary'] as const

export const cubeHyperlinkVariants = [
  'text-only',
  'text-inline',
  'icon-left',
  'icon-right',
] as const

export const cubeHyperlinkSizes = ['sm', 'md'] as const

export type CubeHyperlinkColor = (typeof cubeHyperlinkColors)[number]

export type CubeHyperlinkVariant = (typeof cubeHyperlinkVariants)[number]

export type CubeHyperlinkSize = (typeof cubeHyperlinkSizes)[number]

type BaseHyperlinkProps = {
  /**
   * @default "primary"
   */
  color?: CubeHyperlinkColor
  /**
   * @default "md"
   */
  size?: CubeHyperlinkSize
  /**
   * @default false
   */
  disabled?: boolean
  children: string
  href?: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export type CubeHyperlinkProps = PropsWithClassName &
  BaseHyperlinkProps &
  (
    | {
        variant: Extract<CubeHyperlinkVariant, 'icon-left' | 'icon-right'>
        Icon: SvgComponent
      }
    | {
        variant: Extract<CubeHyperlinkVariant, 'text-only' | 'text-inline'>
        Icon?: never
      }
  )
