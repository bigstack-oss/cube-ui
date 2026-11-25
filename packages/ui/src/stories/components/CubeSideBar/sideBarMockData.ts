import { noop } from 'lodash'
import {
  MonochromeEvent,
  MonochromeHome01,
  MonochromeIntegration,
  MonochromeMaintenance,
  MonochromeNode,
  MonochromeSettings,
} from '@icons'
import type { CubeSideBarProps } from '@components/CubeSideBar/cubeSideBarTypes'

// The required props.
export const mockRequiredProps: CubeSideBarProps = {
  dataCenter: { name: 'KS', version: 'Cube Appliance 2.3.3' },
  username: 'Admin',
  options: [
    {
      Icon: MonochromeHome01,
      label: 'Home',
      notificationCount: 1,
      isSelected: true,
      onClick: noop,
    },
    {
      Icon: MonochromeNode,
      label: 'Nodes',
      notificationCount: 99,
      onClick: noop,
    },
    {
      Icon: MonochromeIntegration,
      label: 'Integrations',
      notificationCount: 100,
      onClick: noop,
    },
    {
      Icon: MonochromeMaintenance,
      label: 'Maintenance',
      notificationCount: 0,
      onClick: noop,
    },
    { Icon: MonochromeEvent, label: 'Events', onClick: noop },
    { Icon: MonochromeSettings, label: 'Settings', onClick: noop },
  ],
  utcTimeZone: '+08:00',
}

export const mockNaggingProps: CubeSideBarProps['naggingProps'] = {
  type: 'error',
  title: '3 host licenses verification failed.',
  link: { text: 'Go to License', onClick: noop },
}

export const mockLinks: CubeSideBarProps['links'] = [
  { text: 'CubeCMP', href: '/' },
  { text: 'Help', href: '/' },
]
