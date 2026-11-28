import { useCallback, useEffect, useState, type ComponentProps } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { MonochromeSearch, MonochromeXSmall } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import { useFloating } from '@internals/utils/floating/useFloating'
import { testIdOf } from '@utils/testId'
import { CubeSearchBarTestIdContext } from './cubeSearchBarContext'
import { CubeSearchBarGlobalItem } from './CubeSearchBarGlobalItem'
import {
  clearIcon,
  dropdownMenu,
  globalInput,
  inputIcons,
  searchIcon,
} from './cubeSearchBarStyles'
import type {
  CubeSearchBarGlobalProps,
  CubeSearchBarGlobalVariant,
} from './cubeSearchBarTypes'
import { checkIsDropdownChildValid } from './cubeSearchBarUtils'

type CubeSearchBarGlobalInputProps = ComponentProps<'input'> &
  CubeTestIdProps &
  Pick<CubeSearchBarGlobalProps, 'children' | 'onInputClear'> & {
    variant: CubeSearchBarGlobalVariant
  }

export const CubeSearchBarGlobalInput = (
  props: CubeSearchBarGlobalInputProps,
) => {
  const { t } = useCubeUiTranslation()

  const {
    variant,
    children,
    ref: inputRef,
    value,
    placeholder = t('component.searchBar.global.search'),
    className,
    onChange: onInputChange,
    onInputClear,
    ...restProps
  } = props

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const hasInputValue = typeof value === 'string' && value.trim() !== ''

  const testId = restProps['data-testid'] || undefined

  const hasMenuItems = checkIsDropdownChildValid(
    children,
    CubeSearchBarGlobalItem,
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

  return (
    <div className="w-full">
      <div ref={anchorRef} className="relative flex w-full items-center">
        <input
          {...restProps}
          data-testid={testId}
          ref={inputRef}
          type="text"
          value={value ?? ''}
          onChange={onInputChange}
          placeholder={placeholder}
          autoComplete="off"
          className={twMerge(
            globalInput({ variant, hasInputValue }),
            className,
          )}
        />
        <span className={inputIcons()}>
          {hasInputValue && (
            <MonochromeXSmall
              className={clearIcon()}
              data-testid={testIdOf(testId, 'clear')}
              onClick={onInputClear}
            />
          )}
          <MonochromeSearch className={searchIcon()} />
        </span>
      </div>
      {children &&
        createPortal(
          <div
            ref={elementRef}
            className={dropdownMenu({ variant: 'global' })}
            style={resolvedStyles?.floatingStyle}
            data-testid={testIdOf(testId, 'menu')}
          >
            <CubeSearchBarTestIdContext.Provider value={testId}>
              {children}
            </CubeSearchBarTestIdContext.Provider>
          </div>,
          document.body,
        )}
    </div>
  )
}
