import { useCallback, useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { MonochromeSearch, MonochromeXSmall } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { useFloating } from '@internals/utils/floating/useFloating'
import { testIdOf } from '@utils/testId'
import { CubeSearchBarTestIdContext } from './cubeSearchBarContext'
import { CubeSearchBarFilterItem } from './CubeSearchBarFilterItem'
import { CubeSearchBarSkeleton } from './CubeSearchBarSkeleton'
import {
  clearIcon,
  dropdownMenu,
  filterInput,
  filterInputWrapper,
  inputIcons,
  searchIcon,
} from './cubeSearchBarStyles'
import type { CubeSearchBarFilterProps } from './cubeSearchBarTypes'
import { checkIsDropdownChildValid } from './cubeSearchBarUtils'

export const CubeSearchBarFilter = (props: CubeSearchBarFilterProps) => {
  const { t } = useCubeUiTranslation()

  const {
    children,
    ref: inputRef,
    isLoading,
    onInputClear,
    value,
    onChange: onInputChange,
    className,
    placeholder = t('component.searchBar.filter.search'),
    ...restProps
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const defaultId = useId()

  const inputId = restProps.id || defaultId

  const testId = restProps['data-testid'] || undefined

  const hasInputValue = value !== ''

  const hasMenuItems = checkIsDropdownChildValid(
    children,
    CubeSearchBarFilterItem,
  )

  useEffect(() => {
    setDropdownOpen(hasInputValue)
  }, [hasInputValue])

  const { anchorRef, elementRef, resolvedStyles } = useFloating<
    HTMLDivElement,
    HTMLDivElement
  >({
    isOpen: hasMenuItems && hasInputValue && dropdownOpen,
    placement: 'bottom-left',
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

  if (isLoading) return <CubeSearchBarSkeleton variant="filter" />

  return (
    <>
      <div ref={anchorRef} className={filterInputWrapper()}>
        <input
          {...restProps}
          data-testid={testId}
          id={inputId}
          ref={inputRef}
          type="text"
          value={value}
          onChange={onInputChange}
          placeholder={placeholder}
          autoComplete="off"
          className={twMerge(filterInput({ hasInputValue }), className)}
        />
        <span className={inputIcons()}>
          {hasInputValue && (
            <MonochromeXSmall
              className={clearIcon()}
              data-testid={testIdOf(testId, 'clear')}
              onClick={() => onInputClear?.()}
            />
          )}
          <MonochromeSearch className={searchIcon()} />
        </span>
      </div>
      {createPortal(
        <div
          ref={elementRef}
          className={dropdownMenu({ variant: 'filter' })}
          style={resolvedStyles?.floatingStyle}
          data-testid={testIdOf(testId, 'menu')}
        >
          <CubeSearchBarTestIdContext.Provider value={testId}>
            {children}
          </CubeSearchBarTestIdContext.Provider>
        </div>,
        document.body,
      )}
    </>
  )
}

CubeSearchBarFilter.Item = CubeSearchBarFilterItem
