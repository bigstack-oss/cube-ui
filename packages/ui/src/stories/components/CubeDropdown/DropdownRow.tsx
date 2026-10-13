import type { CubeDropdownSize } from '@components/CubeDropdown/cubeDropdownTypes'
import { SubHeading } from '@internals/components/SubHeading'
import { CheckboxDropdown } from './CheckboxDropdown'
import { RadioDropdown } from './RadioDropdown'

export type DropdownRowProps = {
  title: string
  size?: CubeDropdownSize
  isLoading?: boolean
  selected?: boolean
  disabled?: boolean
  isNoData?: boolean
  label?: string
}

const rowClassName = 'grid grid-cols-5 items-center gap-12'

/**
 * One Gallery row: the same state rendered as each of the four
 * type × variant combinations.
 */
export const DropdownRow = (props: DropdownRowProps) => {
  const {
    title,
    size = 'md',
    isLoading = false,
    selected = false,
    disabled = false,
    isNoData = false,
    label,
  } = props

  const dropdownProps = { size, isLoading, selected, disabled, isNoData, label }

  return (
    <div className={rowClassName}>
      <SubHeading className="col-span-1">{title}</SubHeading>
      <RadioDropdown {...dropdownProps} variant="regular" />
      <RadioDropdown {...dropdownProps} variant="withFilter" />
      <CheckboxDropdown {...dropdownProps} variant="regular" />
      <CheckboxDropdown {...dropdownProps} variant="withFilter" />
    </div>
  )
}

const DropdownRowHeader = () => {
  return (
    <div className={rowClassName}>
      <span />
      <SubHeading>Single Select</SubHeading>
      <SubHeading>Single Select w/Filter</SubHeading>
      <SubHeading>Multi Select</SubHeading>
      <SubHeading>Multi Select w/Filter</SubHeading>
    </div>
  )
}

DropdownRow.Header = DropdownRowHeader
