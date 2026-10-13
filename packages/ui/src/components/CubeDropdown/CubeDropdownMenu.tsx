import {
  Children,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { ItemCheckbox } from './_components/ItemCheckbox'
import { ItemNoData } from './_components/ItemNoData'
import { CubeDropdownFilter } from './CubeDropdownFilter'
import { CubeDropdownContext } from './cubeDropdownContext'
import { menu } from './cubeDropdownStyles'
import { checkIsCubeDropdownItemElement } from './cubeDropdownUtils'

export type CubeDropdownMenuProps = {
  children: ReactNode
  className?: string
}

export const CubeDropdownMenu = (props: CubeDropdownMenuProps) => {
  const { children, className } = props

  const {
    floatingProps,
    dropdownOpen,
    size,
    variant,
    type,
    onAllCheckChange,
    selectedItems,
    enabledItemCount,
    searchValue,
  } = useContext(CubeDropdownContext)

  const { t } = useCubeUiTranslation()

  const { elementRef, resolvedStyles } = floatingProps

  const isAllSelected = useMemo(() => {
    return selectedItems.length === enabledItemCount
  }, [selectedItems.length, enabledItemCount])

  const onAllClick = useCallback(() => {
    onAllCheckChange?.(!isAllSelected)
  }, [isAllSelected, onAllCheckChange])

  const renderFilter = () => {
    if (variant === 'regular') return null
    return <CubeDropdownFilter />
  }

  const renderSelectAllCheckbox = () => {
    if (type === 'radio' || searchValue || !children) return null

    return (
      <ItemCheckbox
        isDark={true}
        size={size}
        variant={variant}
        label={t('component.dropdown.all')}
        onClick={onAllClick}
        isSelected={isAllSelected}
        disabled={false}
      />
    )
  }

  const renderMenuItems = () => {
    const allItems = Children.toArray(children).filter(
      checkIsCubeDropdownItemElement,
    )

    const visibleItems =
      variant !== 'withFilter' || !searchValue
        ? allItems
        : allItems.filter((child) =>
            child.props.children
              .toLowerCase()
              .includes(searchValue.toLowerCase()),
          )

    if (visibleItems.length === 0) {
      return <ItemNoData size={size} type={type} />
    }

    return visibleItems
  }

  return createPortal(
    <div
      ref={elementRef}
      className={twMerge(menu({ size, dropdownOpen }), className)}
      style={resolvedStyles?.floatingStyle}
    >
      {renderFilter()}
      {renderSelectAllCheckbox()}
      {renderMenuItems()}
    </div>,
    document.body,
  )
}
