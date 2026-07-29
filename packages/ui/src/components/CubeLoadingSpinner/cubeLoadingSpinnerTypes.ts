import type { PropsWithClassName } from '@shared-types/react-types'

export const cubeLoadingSpinnerVariants = ['dot45', 'dot120', 'cube'] as const

export type CubeLoadingSpinnerVariant =
  (typeof cubeLoadingSpinnerVariants)[number]

export type CubeLoadingSpinnerProps = PropsWithClassName & {
  variant: CubeLoadingSpinnerVariant
}
