import { useState } from 'react'
import { CubeDropdown } from '@components/CubeDropdown/CubeDropdown'
import type {
  CubeDropdownSize,
  CubeDropdownVariant,
} from '@components/CubeDropdown/cubeDropdownTypes'
import { mockData, placeholder, type MockDataItem } from './mockData'

export type RadioDropdownProps = {
  size: CubeDropdownSize
  variant: CubeDropdownVariant
  isLoading: boolean
  selected: boolean
  disabled: boolean
  isNoData: boolean
  label?: string
}

export const RadioDropdown = (props: RadioDropdownProps) => {
  const { size, variant, isLoading, selected, disabled, isNoData, label } =
    props

  const [selectedItems, setSelectedItems] = useState<MockDataItem[]>(() =>
    selected ? mockData.slice(0, 1) : [],
  )

  const onItemClick = (item: MockDataItem) => {
    if (disabled) return
    if (selectedItems.includes(item)) {
      setSelectedItems([])
    } else {
      setSelectedItems([item])
    }
  }

  return (
    <CubeDropdown
      size={size}
      type="radio"
      variant={variant}
      selectedItems={selectedItems}
      isLoading={isLoading}
      disabled={disabled}
      label={label}
    >
      <CubeDropdown.Trigger placeholder={placeholder}>
        {selectedItems[0]?.label}
      </CubeDropdown.Trigger>
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
    </CubeDropdown>
  )
}
