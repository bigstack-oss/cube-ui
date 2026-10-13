import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { CubeOverflowMenuContext } from './cubeOverflowMenuContext'
import { CubeOverflowMenuItemLeadingContent } from './CubeOverflowMenuItemLeadingContent'
import { CubeOverflowMenuItemTrailingContent } from './CubeOverflowMenuItemTrailingContent'
import { itemContainer } from './cubeOverflowMenuStyles'
import type { CubeOverflowMenuItemProps } from './cubeOverflowMenuTypes'

export const CubeOverflowMenuItem = (props: CubeOverflowMenuItemProps) => {
  const { type, title, boldTitle, subText } = props

  const closeMenu = useContext(CubeOverflowMenuContext)

  const getIsDisabled = (): boolean => {
    return 'disabled' in props && !!props.disabled
  }

  const onClick = () => {
    if (getIsDisabled()) {
      return
    }

    if ('onClick' in props) {
      props.onClick?.()

      if (type !== 'check-mark' && type !== 'toggle') {
        closeMenu()
      }
    }
  }

  return (
    <div
      className={twMerge(
        itemContainer({
          hasOnClickProp: 'onClick' in props,
          withSubtext: !!subText,
          disabled: getIsDisabled(),
        }),
      )}
      onClick={onClick}
    >
      <CubeOverflowMenuItemLeadingContent {...props} />
      <div className="flex grow flex-col gap-y-0.5 overflow-hidden">
        <div
          className={twMerge(
            'primary-body2 truncate text-functional-title group-[.group]:text-functional-disable-text',
            boldTitle && 'font-semibold',
          )}
        >
          {title}
        </div>
        {subText && (
          <div className="primary-body5 truncate text-functional-text-light group-[.group]:text-functional-disable-text">
            {subText}
          </div>
        )}
      </div>
      <CubeOverflowMenuItemTrailingContent {...props} />
    </div>
  )
}
