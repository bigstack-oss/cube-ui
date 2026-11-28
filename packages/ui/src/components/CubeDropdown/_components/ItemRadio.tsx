import { twMerge } from 'tailwind-merge'
import type {
  CubeDropdownSize,
  CubeDropdownVariant,
} from '../cubeDropdownTypes'
import { itemRadio } from '../cubeDropdownStyles'

type ItemRadioProps = {
  size: CubeDropdownSize
  variant: CubeDropdownVariant
  label: string
  onClick: () => void
  isSelected: boolean
  disabled: boolean
  testId?: string
  testKey?: string
}

export const ItemRadio = (props: ItemRadioProps) => {
  const {
    size,
    variant,
    label,
    onClick,
    isSelected,
    disabled,
    testId,
    testKey,
  } = props
  return (
    <div
      className={twMerge(itemRadio({ size, variant, isSelected, disabled }))}
      data-testid={testId}
      data-key={testKey}
      onClick={onClick}
    >
      {label}
    </div>
  )
}
