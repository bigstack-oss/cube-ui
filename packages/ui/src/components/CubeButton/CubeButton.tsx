import { omit } from 'lodash'
import { twMerge } from 'tailwind-merge'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'
import type { CubeButtonProps } from './cubeButtonTypes'
import { button, iconContainer } from './cubeButtonStyles'
import { getIconSizeByButtonSize } from './cubeButtonUtils'
import { CubeButtonLoadingSpinner } from './CubeButtonLoadingSpinner'

export const CubeButton = (props: CubeButtonProps) => {
  const {
    htmlType = 'button',
    type = 'primary',
    size = 'md',
    usage = 'text-only',
    disabled: disabledProp = false,
    loading = false,
    onClick,
    className,
    ...restProps
  } = props

  const disabled = disabledProp || loading

  const renderIcon = (Icon: SvgComponent) => {
    return (
      <div className={twMerge(iconContainer({ size }))}>
        {loading ? (
          <CubeButtonLoadingSpinner type={type} usage={usage} />
        ) : (
          <Icon className={getIconSizeByButtonSize(size)} />
        )}
      </div>
    )
  }

  const renderButtonContent = () => {
    switch (props.usage) {
      case 'icon-only':
        return renderIcon(props.Icon)
      case 'icon-left':
        return (
          <>
            {renderIcon(props.Icon)}
            {props.children}
          </>
        )
      case 'icon-right':
        return (
          <>
            {props.children}
            {renderIcon(props.Icon)}
          </>
        )
      case 'text-only':
      default:
        return (
          <>
            {props.children}
            {loading && <CubeButtonLoadingSpinner type={type} usage={usage} />}
          </>
        )
    }
  }

  return (
    <button
      type={htmlType}
      className={twMerge(
        button({ type, size, usage, loading, disabled }),
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...omit(restProps, 'Icon')}
    >
      {renderButtonContent()}
    </button>
  )
}
