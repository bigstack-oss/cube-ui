import { cloneElement } from 'react'
import {
  MonochromeCheckmarkCircleFill,
  MonochromeWarningAltFilled,
  MonochromeWarningFilled,
  MonochromeXSmall,
} from '@icons'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import type {
  CubeNotificationBaseProps,
  CubeNotificationType,
} from './cubeNotificationTypes'

export const renderIcon = (type: CubeNotificationType) => {
  switch (type) {
    case 'positive':
      return (
        <MonochromeCheckmarkCircleFill className="icon-md shrink-0 text-status-positive" />
      )
    case 'warning':
      return (
        <MonochromeWarningAltFilled className="icon-md shrink-0 text-status-warning" />
      )
    case 'error':
      return (
        <MonochromeWarningFilled className="icon-md shrink-0 text-status-negative" />
      )
    default:
      return null
  }
}

export const renderTitle = (title?: string) => {
  if (!title) {
    return null
  }
  return <div className="font-semibold text-functional-title">{title}</div>
}

export const renderLink = (link?: CubeNotificationBaseProps['link']) => {
  if (!link) {
    return null
  }

  const { className, href, onClick, Container, text } = link

  const cubeHyperlink = (
    <CubeHyperlink
      size="sm"
      variant="text-inline"
      className={className}
      href={href}
      onClick={onClick}
    >
      {text}
    </CubeHyperlink>
  )

  if (Container) {
    return cloneElement(Container, {
      children: cubeHyperlink,
    })
  }

  return cubeHyperlink
}

export const renderCloseButton = (handleClose: () => void) => {
  return (
    <MonochromeXSmall
      className="icon-md shrink-0 cursor-pointer text-functional-text hover:text-functional-text-light"
      onClick={handleClose}
    />
  )
}
