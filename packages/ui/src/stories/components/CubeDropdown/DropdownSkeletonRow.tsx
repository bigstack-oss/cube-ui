import type { CubeDropdownSize } from '@components/CubeDropdown/cubeDropdownTypes'
import { SubHeading } from '@internals/components/SubHeading'
import { RadioDropdown } from './RadioDropdown'

export type DropdownSkeletonRowProps = {
  size: CubeDropdownSize
}

const rowClassName = 'grid grid-cols-5 items-center gap-12'

/**
 * One Skeleton row: the loading skeleton at the given size, without and with
 * a label. `type` and `variant` don't change the skeleton, so they aren't
 * columns here.
 */
export const DropdownSkeletonRow = (props: DropdownSkeletonRowProps) => {
  const { size } = props

  const dropdownProps = {
    size,
    variant: 'regular',
    isLoading: true,
    selected: false,
    disabled: false,
    isNoData: false,
  } as const

  return (
    <div className={rowClassName}>
      <SubHeading className="col-span-1">{size}</SubHeading>
      <RadioDropdown {...dropdownProps} />
      <RadioDropdown {...dropdownProps} label="Label" />
    </div>
  )
}

const DropdownSkeletonRowHeader = () => {
  return (
    <div className={rowClassName}>
      <span />
      <SubHeading>Basic</SubHeading>
      <SubHeading>w/Label</SubHeading>
    </div>
  )
}

DropdownSkeletonRow.Header = DropdownSkeletonRowHeader
