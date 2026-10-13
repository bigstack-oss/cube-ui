import type { CubeDropdownSize } from '@components/CubeDropdown/cubeDropdownTypes'
import { SubHeading } from '@internals/components/SubHeading'
import { CheckboxDropdown } from './CheckboxDropdown'

export type DropdownSizeRowProps = {
  size: CubeDropdownSize
}

/**
 * One Sizes row: a labelled multi-select with a filter and a selection, so the
 * label gap, trigger height / padding, selected count and clear button all
 * show at the given size.
 */
export const DropdownSizeRow = (props: DropdownSizeRowProps) => {
  const { size } = props

  return (
    <div className="grid grid-cols-5 items-center gap-12">
      <SubHeading className="col-span-1">{size}</SubHeading>
      <CheckboxDropdown
        size={size}
        variant="withFilter"
        isLoading={false}
        selected
        disabled={false}
        isNoData={false}
        label="Label"
      />
    </div>
  )
}
