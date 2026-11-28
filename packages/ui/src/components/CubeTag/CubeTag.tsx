import { twMerge } from 'tailwind-merge'
import { MonochromeX } from '@icons'
import { testIdOf } from '@utils/testId'
import type { CubeTagProps } from './cubeTagTypes'
import { closeButton, tag } from './cubeTagStyles'
import { CubeTagSkeleton } from './CubeTagSkeleton'

export const CubeTag = (props: CubeTagProps) => {
  const {
    className,
    children,
    color = 'default',
    variant,
    disabled = false,
    isLoading = false,
    'data-testid': testIdProp,
    'data-key': testKey,
  } = props

  const testId = testIdProp || undefined

  const hasIcon = 'Icon' in props
  const hasCloseButton = 'showCloseButton' in props && props.showCloseButton

  const renderIcon = () => {
    if (!hasIcon) {
      return undefined
    }

    const { Icon } = props
    return <Icon className="icon-xs" />
  }

  const renderCloseButton = () => {
    if (!hasCloseButton) {
      return undefined
    }

    const { onClose: onCloseProp } = props

    const onClose = () => {
      if (!disabled) {
        onCloseProp?.()
      }
    }

    return (
      <MonochromeX
        className={closeButton({ disabled })}
        data-testid={testIdOf(testId, 'close')}
        onClick={onClose}
      />
    )
  }

  if (isLoading) return <CubeTagSkeleton hasIcon={hasIcon || hasCloseButton} />

  return (
    <span
      className={twMerge(
        tag({
          color,
          variant,
          hasCloseButton,
          hasIcon,
          disabled,
        }),
        className,
      )}
      data-testid={testId}
      data-key={testKey}
    >
      {renderIcon()}
      {children}
      {renderCloseButton()}
    </span>
  )
}

CubeTag.Skeleton = CubeTagSkeleton
