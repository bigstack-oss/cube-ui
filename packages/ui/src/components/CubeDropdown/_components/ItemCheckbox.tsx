import { twMerge } from 'tailwind-merge'
import { CubeCheckbox } from '../../CubeCheckbox/CubeCheckbox'
import type {
  CubeCheckboxColor,
  CubeCheckboxLabelSize,
} from '../../CubeCheckbox/cubeCheckboxTypes'
import type {
  CubeDropdownSize,
  CubeDropdownVariant,
} from '../cubeDropdownTypes'
import { itemCheckbox } from '../cubeDropdownStyles'

type ItemCheckboxProps = {
  /**
   * @default false
   */
  isDark?: boolean
  size: CubeDropdownSize
  variant: CubeDropdownVariant
  label: string
  onClick: () => void
  isSelected: boolean
  disabled: boolean
}

export const ItemCheckbox = (props: ItemCheckboxProps) => {
  const {
    isDark = false,
    size,
    variant,
    label,
    onClick,
    isSelected,
    disabled,
  } = props

  const getColor = (): CubeCheckboxColor => {
    if (variant === 'regular') {
      return isDark ? 'primary-dark' : 'primary'
    } else {
      return isDark ? 'secondary-dark' : 'secondary'
    }
  }

  const getLabelSize = (): CubeCheckboxLabelSize => {
    return size === 'md' ? 'sm' : 'xs'
  }

  return (
    <div
      className={twMerge(itemCheckbox({ size, variant, isSelected, disabled }))}
    >
      <CubeCheckbox
        label={label}
        labelClassName="truncate"
        disabled={disabled}
        checked={isSelected}
        onChange={onClick}
        color={getColor()}
        labelSize={getLabelSize()}
      />
    </div>
  )
}
