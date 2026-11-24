import type { PropsWithChildren, ReactNode } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeHyperlinkProps } from '../CubeHyperlink/cubeHyperlinkTypes'

export type CubeGeneralPanelContainerProps = PropsWithChildren &
  PropsWithClassName

export type CubeGeneralPanelTitleBarProps = {
  title?: string
  hyperLinkProps?: Pick<
    CubeHyperlinkProps,
    'href' | 'disabled' | 'target' | 'onClick' | 'children'
  >
  time?: string
  /**
   * @default false
   */
  isTimeLoading?: boolean
  dropdown?: ReactNode
}

export type CubeGeneralPanelProps = PropsWithChildren &
  PropsWithClassName & {
    containerClassName?: string
    topic?: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    subtext?: string
    titleBarProps?: CubeGeneralPanelTitleBarProps
  }
