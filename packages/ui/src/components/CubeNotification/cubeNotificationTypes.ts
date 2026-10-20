import type { PropsWithChildren, ReactElement } from 'react'
import type { CubeHyperlinkProps } from '../CubeHyperlink/cubeHyperlinkTypes'

export const cubeNotificationTypes = [
  'neutral',
  'positive',
  'warning',
  'error',
] as const

export type CubeNotificationType = (typeof cubeNotificationTypes)[number]

export type CubeNotificationLink = Pick<
  CubeHyperlinkProps,
  'className' | 'href' | 'onClick'
> & {
  /**
   * Wraps the link, e.g. a router link. The link becomes its `children`.
   */
  Container?: ReactElement<PropsWithChildren>
  text: string
}

export type CubeNotificationBaseProps = {
  /**
   * @default 'neutral'
   */
  type?: CubeNotificationType
  title?: string
  link?: CubeNotificationLink
  onClose?: () => void
}
