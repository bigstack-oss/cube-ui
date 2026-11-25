import { twMerge } from 'tailwind-merge'
import { NumberSpan } from '../CubeTabs/NumberSpan/NumberSpan'
import { option, optionIcon, optionLabel } from './cubeSideBarStyles'
import type { CubeSideBarComboboxOptionProps } from './cubeSideBarTypes'

export const CubeSideBarComboboxOption = (
  props: CubeSideBarComboboxOptionProps,
) => {
  const {
    label,
    Icon,
    isSelected = false,
    notificationCount = 0,
    onClick,
  } = props

  return (
    // TODO: change this to hyperlink.
    // `twMerge` drops the base `bg-transparent` when selected.
    <div className={twMerge(option({ isSelected }))} onClick={onClick}>
      <div className={optionLabel()}>
        <Icon className={optionIcon()} />
        <span>{label}</span>
      </div>
      {notificationCount !== 0 && <NumberSpan number={notificationCount} />}
    </div>
  )
}
