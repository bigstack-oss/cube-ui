import type { AriaAttributes, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { CubePaginationItemWrap } from './CubePaginationItemWrap'
import { paginationItemButton } from './cubePaginationStyles'

type CubePaginationItemButtonProps = PropsWithChildren<{
  isMinimal: boolean
  onClick: () => void
}> &
  Pick<AriaAttributes, 'aria-label' | 'aria-current'> &
  (
    | {
        type: 'number'
        isActive: boolean
      }
    | {
        type: 'icon'
        disabled: boolean
      }
  )

export const CubePaginationItemButton = (
  props: CubePaginationItemButtonProps,
) => {
  const {
    isMinimal,
    type,
    children,
    onClick,
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent,
  } = props

  const isActive =
    type === 'number'
      ? ((props as Extract<CubePaginationItemButtonProps, { type: 'number' }>)
          .isActive ?? false)
      : false

  const disabled =
    type === 'icon'
      ? ((props as Extract<CubePaginationItemButtonProps, { type: 'icon' }>)
          .disabled ?? false)
      : false

  return (
    <CubePaginationItemWrap isMinimal={isMinimal}>
      <button
        type="button"
        className={twMerge(paginationItemButton({ isActive, disabled }))}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-current={ariaCurrent}
      >
        {children}
      </button>
    </CubePaginationItemWrap>
  )
}
