import type { PropsWithClassName } from '@shared-types/react-types'

export const cubeIconTextTypes = [
  'primary',
  'warning',
  'error',
  'functional',
  'secondary',
  'positive',
  'primary-outline',
] as const

export type CubeIconTextType = (typeof cubeIconTextTypes)[number]

export type CubeIconTextProps = PropsWithClassName & {
  type: CubeIconTextType
  children: string
}
