import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { MonochromeChevronDown } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { useFloating } from '@internals/utils/floating/useFloating'
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
  props: CubeSearchBarGlobalCategoryProps,
) => {
  const {
    categories,
    selectedCategory,
    onCategoryClick: onCategoryClickProp,
  } = props

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
        <div className={categoryItem({ hasData })}>
          {t('component.searchBar.global.noCategory')}
        </div>
      )
    }

    return categories.map((category) => (
      <div
        key={category}
        className={categoryItem({ hasData })}
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
        >
          {renderItems()}
        </div>,
        document.body,
      )}
    </>
  )
}
