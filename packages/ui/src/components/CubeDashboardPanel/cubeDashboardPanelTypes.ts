import type { PropsWithChildren, ReactElement, ReactNode } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeButtonProps } from '../CubeButton/cubeButtonTypes'
import type { CubeHyperlinkProps } from '../CubeHyperlink/cubeHyperlinkTypes'

export type CubeDashboardPanelHeaderProps = {
  title: string
  errorCount?: number
  time?: string | null
  /**
   * @default false
   */
  isTimeLoading?: boolean
} & (
  | {
      hyperLinkProps?: never
      HyperLinkContainer?: never
    }
  | {
      hyperLinkProps: Pick<
        CubeHyperlinkProps,
        'href' | 'disabled' | 'target' | 'onClick'
      >
      HyperLinkContainer?: ReactElement<PropsWithChildren>
    }
)

export type CubeDashboardPanelProps = PropsWithChildren &
  PropsWithClassName &
  CubeDashboardPanelHeaderProps & {
    /**
     * @default true
     */
    useContentWrapper?: boolean
  }

export type CubeDashboardPanelRowProps = PropsWithChildren & PropsWithClassName

export type CubeDashboardPanelColProps = PropsWithChildren & PropsWithClassName

export type CubeDashboardPanelItemProps = PropsWithChildren &
  PropsWithClassName & {
    topic?: string
    subtext?: string
    /**
     * @default false
     */
    isSubtextLoading?: boolean
    /**
     * The panel overrides the button size and type for UI consistency.
     */
    button?: ReactElement<CubeButtonProps>
    children: ReactNode
  }
