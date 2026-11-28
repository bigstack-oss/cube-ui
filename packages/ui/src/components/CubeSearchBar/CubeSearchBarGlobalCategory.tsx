import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MonochromeChevronDown } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { useFloating } from '@internals/utils/floating/useFloating'
import { testIdOf } from '@utils/testId'
import {
  categoryDivider,
  categoryItem,
  categoryTrigger,
  categoryTriggerIcon,
  categoryTriggerLabel,
  dropdownMenu,
} from './cubeSearchBarStyles'
import type { CubeSearchBarGlobalCategoryProps } from './cubeSearchBarTypes'

export const CubeSearchBarGlobalCategory = (
  props: CubeSearchBarGlobalCategoryProps & {
    /** The search bar's test ID; the picker's parts are `<test-id>-category-*`. */
    testId?: string
  },
) => {
  const {
    categories,
    selectedCategory,
    onCategoryClick: onCategoryClickProp,
    testId,
  } = props

  const categoryTestId = testIdOf(testId, 'category')

  const { t } = useCubeUiTranslation()

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const onCategoryClick = (category: string) => {
    onCategoryClickProp(category)
    setDropdownOpen(false)
  }

  const { anchorRef, elementRef, resolvedStyles } = useFloating<
    HTMLDivElement,
    HTMLDivElement
  >({
    isOpen: dropdownOpen,
    placement: 'bottom-right',
    offsets: {
      y: 8,
    },
  })

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as HTMLElement

      const isTrigger = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isTrigger && !isMenu) {
        setDropdownOpen(false)
      }
    },
    [anchorRef, elementRef],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  const renderItems = () => {
    const hasData = categories.length !== 0

    if (!hasData) {
      return (
        <div
          className={categoryItem({ hasData })}
          data-testid={testIdOf(categoryTestId, 'empty')}
        >
          {t('component.searchBar.global.noCategory')}
        </div>
      )
    }

    return categories.map((category) => (
      <div
        key={category}
        className={categoryItem({ hasData })}
        data-testid={testIdOf(categoryTestId, 'option')}
        data-key={categoryTestId ? category : undefined}
        onClick={() => onCategoryClick(category)}
      >
        {category}
      </div>
    ))
  }

  return (
    <>
      <div className={categoryDivider()} />
      <div ref={anchorRef}>
        <div
          className={categoryTrigger()}
          data-testid={testIdOf(categoryTestId, 'trigger')}
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <div className={categoryTriggerLabel()}>
            {selectedCategory ?? t('component.searchBar.global.category')}
          </div>
          <MonochromeChevronDown
            className={categoryTriggerIcon({ isOpen: dropdownOpen })}
          />
        </div>
      </div>
      {createPortal(
        <div
          ref={elementRef}
          className={dropdownMenu({ variant: 'global' })}
          style={resolvedStyles?.floatingStyle}
          data-testid={testIdOf(categoryTestId, 'menu')}
        >
          {renderItems()}
        </div>,
        document.body,
      )}
    </>
  )
}
