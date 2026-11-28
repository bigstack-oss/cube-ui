import type { MouseEvent, ReactNode } from 'react'
import type {
  CubeTestIdProps,
  CubeTestKeyProps,
} from '@shared-types/test-id-types'

export type CubeTabsProps = {
  children: ReactNode
} & CubeTestIdProps

export type CubeTabProps = {
  children: string
  // TODO: Support query params if necessary.
  href?: string
  isActive: boolean
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void
} & (
  | { number: number; dot?: never }
  | { number?: never; dot: true }
  | { number?: never; dot?: never }
) &
  CubeTestKeyProps
