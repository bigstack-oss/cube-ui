import { useState, type PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeNotificationBaseProps } from '../cubeNotificationTypes'
import {
  renderCloseButton,
  renderIcon,
  renderLink,
  renderTitle,
} from '../cubeNotificationUtils'
import { inlineNotification } from './cubeInlineNotificationStyles'
import { CubeInlineNotificationSkeleton } from './CubeInlineNotificationSkeleton'

export type CubeInlineNotificationProps = PropsWithChildren<
  PropsWithClassName &
    CubeNotificationBaseProps & {
      isLoading?: boolean
      skeletonClassName?: string
      /**
       * @default true
       */
      isClosable?: boolean
    }
>

export const CubeInlineNotification = (props: CubeInlineNotificationProps) => {
  const {
    type = 'neutral',
    title,
    children,
    link,
    onClose: onCloseProp,
    isLoading,
    className: classNameProp,
    skeletonClassName,
    isClosable = true,
  } = props

  const [close, setClose] = useState(false)

  const handleClose = () => {
    onCloseProp?.()
    setClose(true)
  }

  if (isLoading)
    return (
      <CubeInlineNotificationSkeleton
        hasIcon={type !== 'neutral'}
        hasTitle={!!title}
        hasSubtitle={!!children}
        hasLink={!!link}
        className={skeletonClassName}
      />
    )

  return (
    <div
      className={twMerge(
        inlineNotification({ type, isClose: close }),
        classNameProp,
      )}
    >
      <div className="flex flex-1 items-start gap-2">
        {renderIcon(type)}
        {renderTitle(title)}
        {children}
      </div>
      <div className="flex items-center gap-2 self-start">
        {renderLink(link)}
        {isClosable && renderCloseButton(handleClose)}
      </div>
    </div>
  )
}

CubeInlineNotification.Skeleton = CubeInlineNotificationSkeleton
