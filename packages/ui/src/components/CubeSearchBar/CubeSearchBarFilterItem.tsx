import { useContext } from 'react'
import { testIdOf } from '@utils/testId'
import { CubeSearchBarTestIdContext } from './cubeSearchBarContext'
import { filterItem } from './cubeSearchBarStyles'
import type { CubeSearchBarFilterItemProps } from './cubeSearchBarTypes'

export const CubeSearchBarFilterItem = (
  props: CubeSearchBarFilterItemProps,
) => {
  const { children, onClick, 'data-key': keyProp } = props

  const optionTestId = testIdOf(
    useContext(CubeSearchBarTestIdContext),
    'option',
  )
  // Text children identify the option unless the consumer passes its own key.
  const testKey = optionTestId
    ? (keyProp ?? (typeof children === 'string' ? children : undefined))
    : undefined

  return (
    <div
      className={filterItem()}
      data-testid={optionTestId}
      data-key={testKey}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
