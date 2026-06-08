import type { ComponentProps, ReactElement } from 'react'

import type SvgComponentInstance from '*.svg?react'

export const allCubeIconSizes = ['xs', 'sm', 'md-sm', 'md', 'lg', 'xl'] as const

export type CubeIconSize = (typeof allCubeIconSizes)[number]

export type SvgComponent = typeof SvgComponentInstance

export type SvgElement = ReactElement<ComponentProps<SvgComponent>>

export type CubeIconFrameProps = {
  className?: string
  /**
   * @default "md"
   */
  size?: CubeIconSize
  onClick?: () => void
  children: SvgElement
}
