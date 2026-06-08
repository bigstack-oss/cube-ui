import type { PropsWithClassName } from '../../utils/react-types'

export const allCubeLoadingSpinnerVariants = [
  'dot45',
  'dot120',
  'cube',
] as const

export type CubeLoadingSpinnerVariant =
  (typeof allCubeLoadingSpinnerVariants)[number]

export type CubeLoadingSpinnerProps = PropsWithClassName & {
  variant: CubeLoadingSpinnerVariant
}
