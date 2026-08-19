import { createElement, type MouseEvent } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import type { CubeTabProps } from './cubeTabsTypes'
import { tab, innerContainer } from './cubeTabsStyles'
import { NumberSpan } from './NumberSpan/NumberSpan'
import { DotSpan } from './DotSpan/DotSpan'

export const CubeTab = (props: CubeTabProps) => {
  const {
    children,
    href,
    isActive,
    disabled = false,
    number,
    dot,
    onClick: onClickProp,
  } = props

  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (!disabled) {
      onClickProp?.(e)
    }
  }

  const renderLabel = () => (
    <span
      data-label={children}
      className={twJoin(
        'inline-flex flex-col items-center',
        // Use pseudo element to avoid slight layout shift caused by the font weight changes between inactive and active states.
        'before:secondary-body2 before:pointer-events-none before:invisible before:h-0 before:select-none before:font-semibold before:content-[attr(data-label)]',
      )}
    >
      {children}
    </span>
  )

  const renderDecoration = () => {
    if (number !== undefined) {
      return <NumberSpan number={number} disabled={disabled} />
    } else if (dot) {
      return <DotSpan disabled={disabled} />
    } else {
      return undefined
    }
  }

  const renderTab = () => {
    const tagType: 'a' | 'span' = href && !disabled ? 'a' : 'span'

    const hrefAttribute = tagType === 'a' ? href : undefined

    return createElement(
      tagType,
      {
        className: twMerge(
          tab({
            isActive,
            disabled,
          }),
        ),
        href: hrefAttribute,
        onClick,
      },
      <div
        className={twMerge(
          innerContainer({
            isActive,
            disabled,
          }),
        )}
      >
        {renderLabel()}
        {renderDecoration()}
      </div>,
    )
  }

  return renderTab()
}
