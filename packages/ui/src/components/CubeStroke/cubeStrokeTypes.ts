import type { PropsWithClassName } from '@shared-types/react-types'
import type { BorderColorClass } from '@theme/tokens/cubeTheme'

export const cubeStrokeTypes = ['regular', 'dot'] as const

export type CubeStrokeType = (typeof cubeStrokeTypes)[number]

export type CubeStrokeProps = PropsWithClassName & {
  /**
   * @default 'regular'
   */
  type?: CubeStrokeType
  color?: BorderColorClass
}
