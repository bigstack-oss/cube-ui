import type { MouseEvent, ReactNode } from 'react'

export type CubeTabsProps = {
  children: ReactNode
}

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
)
