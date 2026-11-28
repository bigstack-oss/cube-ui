import { useContext } from 'react'
import { MonochromeRecently, MonochromeXSmall } from '@icons'
import { testIdOf } from '@utils/testId'
import { CubeSearchBarTestIdContext } from './cubeSearchBarContext'
import {
  globalItem,
  globalItemClearIcon,
  globalItemContent,
  globalItemIcon,
} from './cubeSearchBarStyles'
import type { CubeSearchBarGlobalItemProps } from './cubeSearchBarTypes'

export const CubeSearchBarGlobalItem = (
  props: CubeSearchBarGlobalItemProps,
) => {
  const { type, children, onClick, 'data-key': keyProp } = props

  const optionTestId = testIdOf(
    useContext(CubeSearchBarTestIdContext),
    'option',
  )
  // The text identifies the option unless the consumer passes its own key.
  const testKey = optionTestId ? (keyProp ?? children) : undefined

  const isRecent = type === 'recentSuggestion'

  const renderClearIcon = () => {
    if (props.type !== 'recentSuggestion') return null

    const { onSuggestionClear } = props

    return (
      <MonochromeXSmall
        className={globalItemClearIcon()}
        data-testid={testIdOf(optionTestId, 'clear')}
        onClick={(e) => {
          e.stopPropagation()
          onSuggestionClear()
        }}
      />
    )
  }

  // The legacy item also set `onClick` on the inner element, so a click on
  // the text called it twice; only the outer element handles it now.
  return (
    <div
      className={globalItem({ isRecent })}
      data-testid={optionTestId}
      data-key={testKey}
      onClick={onClick}
    >
      <div className={globalItemContent()}>
        {isRecent && <MonochromeRecently className={globalItemIcon()} />}
        {children}
      </div>
      {renderClearIcon()}
    </div>
  )
}
