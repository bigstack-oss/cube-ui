import { MonochromeRecently, MonochromeXSmall } from '@icons'
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
  const { type, children, onClick } = props

  const isRecent = type === 'recentSuggestion'

  const renderClearIcon = () => {
    if (props.type !== 'recentSuggestion') return null

    const { onSuggestionClear } = props

    return (
      <MonochromeXSmall
        className={globalItemClearIcon()}
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
    <div className={globalItem({ isRecent })} onClick={onClick}>
      <div className={globalItemContent()}>
        {isRecent && <MonochromeRecently className={globalItemIcon()} />}
        {children}
      </div>
      {renderClearIcon()}
    </div>
  )
}
