import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CubeContentSwitcherContext } from './cubeContentSwitcherContext'
import {
  defaultItem,
  radiusItem,
  radiusItemWrapper,
} from './cubeContentSwitcherStyles'
import type { CubeContentSwitcherItemProps } from './cubeContentSwitcherTypes'

export const CubeContentSwitcherItem = (
  props: CubeContentSwitcherItemProps,
) => {
  const { isActive, disabled = false, children, onClick } = props

  const { variant, size } = useContext(CubeContentSwitcherContext)

  const className =
    variant === 'default'
      ? twMerge(defaultItem({ size, isActive, disabled }))
      : twMerge(radiusItem({ isActive, disabled }))

  const switcherButton = (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )

  if (variant === 'default') {
    return switcherButton
  }

  return <div className={radiusItemWrapper()}>{switcherButton}</div>
}
