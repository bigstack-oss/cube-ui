import type { ReactNode, RefObject } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeButtonProps } from '../CubeButton/cubeButtonTypes'

export const cubeModalSizes = ['sm', 'md'] as const

export type CubeModalSize = (typeof cubeModalSizes)[number]

export type CubeModalProps = {
  children: ReactNode
  /**
   * @default 'md'
   */
  size?: CubeModalSize
  isOpen: boolean
  title: string
  footerMessage?: ReactNode
  /**
   * @default true
   */
  isActionButtonVisible?: boolean
  /**
   * @default 'Action'
   */
  actionText?: string
  actionButtonProps?: Pick<CubeButtonProps, 'loading' | 'disabled'>
  /**
   * @default true
   */
  isCancelButtonVisible?: boolean
  cancelButtonProps?: Pick<CubeButtonProps, 'disabled'>
  bodyRef?: RefObject<HTMLDivElement | null>
  onActionClick?: () => void
  onCloseClick: () => void
} & PropsWithClassName
