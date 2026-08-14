import type { PropsWithClassName } from '@shared-types/react-types'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'

export const cubeTagColors = [
  'default',
  'primary-blue',
  'blue',
  'cyan',
  'dark',
] as const

export const cubeTagVariants = ['filled', 'stroke'] as const

export type CubeTagColor = (typeof cubeTagColors)[number]

export type CubeTagVariant = (typeof cubeTagVariants)[number]

export type CubeTagProps = PropsWithClassName & {
  children?: string
  /**
   * @default "default"
   */
  color?: CubeTagColor
  variant: CubeTagVariant
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  isLoading?: boolean
} & (
    | // The props for the close button and icon are both optional.
    // To allow this, we need to add an empty object to the union type.
    // `NonNullable<unknown>` is used to avoid `{}`.
    NonNullable<unknown>
    | {
        showCloseButton: boolean
        onClose?: () => void
      }
    | { Icon: SvgComponent }
  )
