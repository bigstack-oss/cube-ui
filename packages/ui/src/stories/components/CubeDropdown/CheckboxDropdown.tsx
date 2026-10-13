import { useState } from 'react'
import { CubeDropdown } from '@components/CubeDropdown/CubeDropdown'
import type {
  CubeDropdownSize,
  CubeDropdownVariant,
} from '@components/CubeDropdown/cubeDropdownTypes'
import { mockData, placeholder, type MockDataItem } from './mockData'

export type CheckboxDropdownProps = {
  size: CubeDropdownSize
  variant: CubeDropdownVariant
  isLoading: boolean
  selected: boolean
  disabled: boolean
  isNoData: boolean
  label?: string
}

export const CheckboxDropdown = (props: CheckboxDropdownProps) => {
  const { size, variant, isLoading, selected, disabled, isNoData, label } =
    props

  const [selectedItems, setSelectedItems] = useState<MockDataItem[]>(() =>
    selected ? mockData.slice(0, 1) : [],
  )

  const onItemClick = (item: MockDataItem) => {
    if (disabled) return
    if (selectedItems.includes(item)) {
      setSelectedItems((prev) => prev.filter((i) => i !== item))
    } else {
      setSelectedItems((prev) => [...prev, item])
    }
  }

  const onAllCheckChange = (checked: boolean) => {
    if (disabled) return
    const enabledItems = mockData.filter((item) => !item.disabled)
    if (checked) {
      setSelectedItems(enabledItems)
    } else {
      setSelectedItems([])
    }
  }

  const onClearSelection = () => {
    onAllCheckChange(false)
  }

  const trigger = (
    <CubeDropdown.Trigger placeholder={placeholder}>
      {selectedItems.length > 0
        ? selectedItems.map((item) => item.label).join(', ')
        : undefined}
    </CubeDropdown.Trigger>
  )

  const menu = (
    <CubeDropdown.Menu>
      {isNoData
        ? null
        : mockData.map((item) => (
            <CubeDropdown.Item
              key={item.value}
              item={item}
              disabled={item.disabled}
              onClick={() => onItemClick(item)}
            >
              {item.label}
            </CubeDropdown.Item>
          ))}
    </CubeDropdown.Menu>
  )

  if (variant === 'regular')
    return (
      <CubeDropdown
        size={size}
        type="checkbox"
        variant="regular"
        selectedItems={selectedItems}
        isLoading={isLoading}
        disabled={disabled}
        label={label}
        onAllCheckChange={onAllCheckChange}
      >
        {trigger}
        {menu}
      </CubeDropdown>
    )

  return (
    <CubeDropdown
      size={size}
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedItems}
      isLoading={isLoading}
      disabled={disabled}
      label={label}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      {trigger}
      {menu}
    </CubeDropdown>
  )
}
