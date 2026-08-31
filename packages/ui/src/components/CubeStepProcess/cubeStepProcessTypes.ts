import type { ReactElement } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeStepProcessItem } from './CubeStepProcessItem'

export type CubeStepProcessProps = PropsWithClassName & {
  isLoading?: boolean
  children?:
    | ReactElement<typeof CubeStepProcessItem>[]
    | ReactElement<typeof CubeStepProcessItem>
}

export type CubeStepProcessItemProps = {
  /**
   * The step serial number (1-based) that represents this step in the process.
   */
  stepNumber: number
  label: string
  isActive: boolean
}
