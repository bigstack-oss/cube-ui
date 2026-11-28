import type { MouseEvent, ReactNode } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type {
  CubeTestIdProps,
  CubeTestKeyProps,
} from '@shared-types/test-id-types'

export const cubeContentSwitcherVariants = ['default', 'radius'] as const

export const cubeContentSwitcherSizes = ['sm', 'md'] as const

export type CubeContentSwitcherVariant =
  (typeof cubeContentSwitcherVariants)[number]

export type CubeContentSwitcherSize = (typeof cubeContentSwitcherSizes)[number]

export type CubeContentSwitcherProps = PropsWithClassName &
  CubeTestIdProps & {
    /**
     * @default 'default'
     */
    variant: CubeContentSwitcherVariant
    children: ReactNode
  } & (
    | {
        variant: 'default'
        /**
         * @default 'md'
         */
        size?: CubeContentSwitcherSize
      }
    | {
        variant: 'radius'
      }
  )

export type CubeContentSwitcherItemProps = {
  isActive: boolean
  disabled?: boolean
  children: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
} & CubeTestKeyProps
