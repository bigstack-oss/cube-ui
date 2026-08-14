import { twMerge } from 'tailwind-merge'
import { MonochromeX } from '@icons'
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
  } = props

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
      <MonochromeX className={closeButton({ disabled })} onClick={onClose} />
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
    >
      {renderIcon()}
      {children}
      {renderCloseButton()}
    </span>
  )
}

CubeTag.Skeleton = CubeTagSkeleton
