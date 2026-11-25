import { noop } from 'lodash'
import {
  ColoredCeph,
  ColoredKeycloak,
  ColoredOpenstack,
  ColoredRancher,
  MonochromeLogout,
  MonochromeNotification,
} from '@icons'
import type {
  CubeHeaderFunctionBarItem,
  CubeHeaderLanguageOption,
  CubeHeaderQuickAccess,
} from '@components/CubeHeader/cubeHeaderTypes'
import { NotificationLink } from './NotificationLink'

export const mockQuickAccesses: CubeHeaderQuickAccess[] = [
  { Icon: ColoredKeycloak, href: '/', hoverMessage: 'Keycloak' },
  { Icon: ColoredCeph, href: '/', hoverMessage: 'Ceph' },
  { Icon: ColoredOpenstack, href: '/', hoverMessage: 'OpenStack' },
  { Icon: ColoredRancher, href: '/', hoverMessage: 'Rancher' },
]

export const mockFunctionBarItems: CubeHeaderFunctionBarItem[] = [
  { Icon: MonochromeNotification, hoverMessage: 'Events' },
  { Icon: MonochromeLogout, hoverMessage: 'Logout', onClick: noop },
]

// A notification button wrapped in a link, with an unread dot.
export const mockNotificationLinkItems: CubeHeaderFunctionBarItem[] = [
  {
    Icon: MonochromeNotification,
    hoverMessage: 'Notifications',
    container: { Component: NotificationLink, props: {} },
    additionalElements: [
      <span
        key="unread"
        className="absolute right-[10px] top-[11px] size-1.5 rounded-full bg-status-negative"
      />,
    ],
  },
  { Icon: MonochromeLogout, hoverMessage: 'Logout', onClick: noop },
]

export const makeLanguageOptions = (
  onClick: (value: string) => void,
): CubeHeaderLanguageOption[] => [
  { label: 'English', value: 'en-US', onClick },
  { label: '繁體中文', value: 'zh-TW', onClick },
]
