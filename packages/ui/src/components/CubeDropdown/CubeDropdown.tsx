import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { useFloating } from '@internals/utils/floating/useFloating'
import { CubeDropdownTrigger } from './CubeDropdownTrigger'
import { CubeDropdownMenu } from './CubeDropdownMenu'
import { CubeDropdownItem } from './CubeDropdownItem'
import { CubeDropdownSkeleton } from './CubeDropdownSkeleton'
import type { CubeDropdownProps } from './cubeDropdownTypes'
import { CubeDropdownContext } from './cubeDropdownContext'
import { getOptionalProps } from './cubeDropdownUtils'
import { parseNodes } from './parseNodes'
import { label as labelStyle } from './cubeDropdownStyles'

export const CubeDropdown = <Item,>(props: CubeDropdownProps<Item>) => {
  const {
    size = 'md',
    type,
    variant = 'regular',
    selectedItems,
    isLoading = false,
    disabled = false,
    label,
    skeletonClassName,
    children,
  } = props

  const optionalProps = getOptionalProps(props)

  const [dropdownOpen, setDropdownOpen] = useState(false)

  const [searchValue, setSearchValue] = useState<string>('')

  const toggleDropdownOpen = () => {
    setDropdownOpen((prev) => !prev)
  }

  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const floatingProps = useFloating<HTMLButtonElement, HTMLDivElement>({
    isOpen: dropdownOpen,
    placement: 'bottom-left',
    offsets: {
      y: 8,
    },
  })

  const { anchorRef, elementRef } = floatingProps

  const { triggerNode, menuNode, enabledItemCount } = parseNodes(children)

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

  const renderLabel = () => {
    if (!label) return null
    return <p className={twMerge(labelStyle({ size }))}>{label}</p>
  }

  if (isLoading) {
    return (
      <CubeDropdownSkeleton
        className={skeletonClassName}
        size={size}
        hasLabel={!!label}
      />
    )
  }

  return (
    <CubeDropdownContext.Provider
      value={{
        floatingProps,
        dropdownOpen,
        toggleDropdownOpen,
        size,
        type,
        variant,
        disabled,
        selectedItems,
        enabledItemCount,

        onAllCheckChange: optionalProps.onAllCheckChange,
        onClearSelection: optionalProps.onClearSelection,

        searchValue,
        handleSearchValueChange,
      }}
    >
      <div>
        {renderLabel()}
        {triggerNode}
        {menuNode}
      </div>
    </CubeDropdownContext.Provider>
  )
}

CubeDropdown.Trigger = CubeDropdownTrigger
CubeDropdown.Menu = CubeDropdownMenu
CubeDropdown.Item = CubeDropdownItem
