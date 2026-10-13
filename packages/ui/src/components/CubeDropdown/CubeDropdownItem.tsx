import { useContext } from 'react'
import { ItemCheckbox } from './_components/ItemCheckbox'
import { ItemRadio } from './_components/ItemRadio'
import { CubeDropdownContext } from './cubeDropdownContext'

export type CubeDropdownItemProps<Item> = {
  children: string
  item: Item
  /**
   * @default false
   */
  disabled?: boolean
  onClick: () => void
}

export const CubeDropdownItem = <Item,>(props: CubeDropdownItemProps<Item>) => {
  const {
    children: label,
    item,
    disabled = false,
    onClick: onClickProp,
  } = props

  const { size, type, variant, selectedItems, toggleDropdownOpen } =
    useContext(CubeDropdownContext)

  const isSelected = selectedItems.includes(item)

  const onClick = () => {
    if (disabled) return

    onClickProp()
    if (type === 'radio') toggleDropdownOpen()
  }

  if (type === 'checkbox')
    return (
      <ItemCheckbox
        size={size}
        variant={variant}
        label={label}
        isSelected={isSelected}
        disabled={disabled}
        onClick={onClick}
      />
    )

  return (
    <ItemRadio
      size={size}
      variant={variant}
      label={label}
      isSelected={isSelected}
      disabled={disabled}
      onClick={onClick}
    />
  )
}
