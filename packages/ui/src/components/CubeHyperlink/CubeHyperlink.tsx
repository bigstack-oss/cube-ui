import { createElement, type MouseEvent } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import type { CubeIconSize } from '../CubeIcon/cubeIconTypes'
import { getIconSizeClass } from '../CubeIcon/cubeIconUtils'
import type {
  CubeHyperlinkProps,
  CubeHyperlinkSize,
} from './cubeHyperlinkTypes'
import { hyperlink } from './cubeHyperlinkStyles'

export const CubeHyperlink = (props: CubeHyperlinkProps) => {
  const {
    className: classNameProps,
    color = 'primary',
    size = 'md',
    variant = 'text-only',
    disabled = false,
    children,
    href,
    target,
    onClick,
  } = props

  if (!href && !onClick) {
    console.warn(
      'CubeHyperlink: href or onClick must be provided to make the hyperlink interactive',
    )
  }

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return
    onClick?.(e)
  }

  const renderIcon = (iconVariant: 'icon-left' | 'icon-right') => {
    if (props.variant !== iconVariant) {
      return null
    }

    const { Icon } = props

    const sizeMapping: Record<
      CubeHyperlinkSize,
      { iconSize: CubeIconSize; iconFrameSize: string }
    > = {
      sm: { iconSize: 'sm', iconFrameSize: twJoin('size-[15px]') },
      md: { iconSize: 'md-sm', iconFrameSize: twJoin('size-[17px]') },
    }
    const { iconSize, iconFrameSize } = sizeMapping[size]
    const iconSizeClass = getIconSizeClass(iconSize)

    return (
      <div
        className={twMerge('flex items-center justify-center', iconFrameSize)}
      >
        <Icon className={iconSizeClass} />
      </div>
    )
  }

  const renderHyperlink = () => {
    const hyperlinkType = !disabled && href ? 'a' : 'div'

    const hrefAttribute = hyperlinkType === 'a' ? href : undefined

    const targetAttribute = hyperlinkType === 'a' ? target : undefined

    return createElement(
      hyperlinkType,
      {
        className: twMerge(
          hyperlink({ color, size, variant, disabled }),
          classNameProps,
        ),
        href: hrefAttribute,
        target: targetAttribute,
        onClick: handleClick,
      },
      renderIcon('icon-left'),
      children,
      renderIcon('icon-right'),
    )
  }

  return renderHyperlink()
}
