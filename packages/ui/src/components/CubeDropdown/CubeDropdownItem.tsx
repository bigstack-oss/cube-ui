import { useContext } from 'react'
import type { CubeTestKeyProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
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
} & CubeTestKeyProps

export const CubeDropdownItem = <Item,>(props: CubeDropdownItemProps<Item>) => {
  const {
    children: label,
    item,
    disabled = false,
    onClick: onClickProp,
    'data-key': keyProp,
  } = props

  const { size, type, variant, selectedItems, toggleDropdownOpen, testId } =
    useContext(CubeDropdownContext)

  const optionTestId = testIdOf(testId, 'option')
  // The label identifies the option unless the consumer passes its own key.
  const testKey = optionTestId ? (keyProp ?? label) : undefined

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
        testId={optionTestId}
        testKey={testKey}
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
      testId={optionTestId}
      testKey={testKey}
    />
  )
}
