import { useState, type PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
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
    CubeNotificationBaseProps &
    CubeTestIdProps & {
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
    'data-testid': testIdProp,
  } = props

  const testId = testIdProp || undefined

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
      data-testid={testId}
    >
      <div className="flex flex-1 items-start gap-2">
        {renderIcon(type)}
        {renderTitle(title, testIdOf(testId, 'title'))}
        {children}
      </div>
      <div className="flex items-center gap-2 self-start">
        {renderLink(link)}
        {isClosable &&
          renderCloseButton(handleClose, testIdOf(testId, 'close'))}
      </div>
    </div>
  )
}

CubeInlineNotification.Skeleton = CubeInlineNotificationSkeleton
