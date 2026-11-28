import { createElement } from 'react'
import { testIdOf } from '@utils/testId'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeTooltip } from '../CubeTooltip/CubeTooltip'
import { bar } from './cubeHeaderStyles'
import type { CubeHeaderFunctionBarItem } from './cubeHeaderTypes'

type CubeHeaderFunctionBarProps = {
  items: CubeHeaderFunctionBarItem[]
  testId?: string
}

export const CubeHeaderFunctionBar = (props: CubeHeaderFunctionBarProps) => {
  const { items, testId } = props

  const renderItem = (item: CubeHeaderFunctionBarItem) => {
    const {
      Icon,
      hoverMessage,
      onClick,
      container,
      additionalElements = [],
      'data-key': keyProp,
    } = item

    const button = (
      <CubeButton
        size="md"
        type="ghost"
        usage="icon-only"
        Icon={Icon}
        onClick={onClick}
        aria-label={hoverMessage}
        data-testid={testIdOf(testId, 'action')}
        data-key={testId ? (keyProp ?? hoverMessage) : undefined}
      />
    )

    if (!container) {
      return button
    }

    return createElement(
      container.Component,
      container.props,
      button,
      ...additionalElements,
    )
  }

  return (
    <div className={bar()}>
      {items.map((item, index) => (
        <CubeTooltip
          key={index}
          hoverContent={
            item.hoverMessage ? { message: item.hoverMessage } : undefined
          }
        >
          {renderItem(item)}
        </CubeTooltip>
      ))}
    </div>
  )
}
