import type { PropsWithChildren, Ref } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { BackgroundColorClass } from '@theme/tokens/cubeTheme'

export type CubeProgressBarRef = {
  barWidth: number
}

export type CubeProgressBarProps = {
  ref?: Ref<CubeProgressBarRef>
  /**
   * An integer between 0 and 100 indicating the progress (percentage).
   */
  progress: number
  color: BackgroundColorClass
} & PropsWithClassName &
  PropsWithChildren

export type CubeResourceUsageBarProps = Pick<
  CubeProgressBarProps,
  'className' | 'progress'
>
