import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { testIdOf } from '@utils/testId'
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
  const {
    isActive,
    disabled = false,
    children,
    onClick,
    'data-key': keyProp,
  } = props

  const { variant, size, testId } = useContext(CubeContentSwitcherContext)

  const itemTestId = testIdOf(testId, 'item')
  // The label identifies the item unless the consumer passes its own key.
  const testKey = itemTestId ? (keyProp ?? children) : undefined

  const className =
    variant === 'default'
      ? twMerge(defaultItem({ size, isActive, disabled }))
      : twMerge(radiusItem({ isActive, disabled }))

  const switcherButton = (
    <button
      type="button"
      disabled={disabled}
      className={className}
      data-testid={itemTestId}
      data-key={testKey}
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
