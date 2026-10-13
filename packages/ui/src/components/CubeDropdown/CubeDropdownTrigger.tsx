import { type ButtonHTMLAttributes, type MouseEvent, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeChevronDown, MonochromeXSmall } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeDropdownContext } from './cubeDropdownContext'
import {
  triggerClearButton,
  triggerContainer,
  triggerCount,
  triggerIcon,
} from './cubeDropdownStyles'

export type CubeDropdownTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'disabled'
> & {
  children?: string
  placeholder?: string
}

export const CubeDropdownTrigger = (props: CubeDropdownTriggerProps) => {
  const { children, placeholder, className } = props

  const {
    dropdownOpen,
    toggleDropdownOpen,
    floatingProps,
    size,
    type,
    variant,
    selectedItems,
    disabled,
    onClearSelection,
  } = useContext(CubeDropdownContext)

  const { t } = useCubeUiTranslation()

  const isSelected = selectedItems.length > 0

  const placeholderText = placeholder ?? t('component.dropdown.choose')

  const displayText = isSelected ? children : placeholderText

  const renderSelectedItemCount = () => {
    if (type === 'radio' || !isSelected) return null
    return (
      <p className={triggerCount({ variant, disabled })}>
        {`(${selectedItems.length})`}
      </p>
    )
  }

  const renderClearButton = () => {
    const handleClearClick = (e: MouseEvent<SVGSVGElement>) => {
      e.stopPropagation()
      onClearSelection?.()
    }

    if (type === 'checkbox' && variant === 'withFilter' && isSelected)
      return (
        <MonochromeXSmall
          className={twMerge(triggerClearButton({ disabled }))}
          onClick={(e) => handleClearClick(e)}
        />
      )

    return null
  }

  return (
    <button
      ref={floatingProps.anchorRef}
      type="button"
      disabled={disabled}
      onClick={toggleDropdownOpen}
      className={twMerge(
        triggerContainer({
          size,
          variant,
          dropdownOpen,
          isSelected,
          disabled,
        }),
        className,
      )}
    >
      <span className="w-full truncate text-left">{displayText}</span>
      <span className="flex shrink-0 items-center gap-2">
        {renderSelectedItemCount()}
        {renderClearButton()}
        <MonochromeChevronDown
          className={twMerge(triggerIcon({ dropdownOpen, disabled }))}
        />
      </span>
    </button>
  )
}
