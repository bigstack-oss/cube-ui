import { twMerge } from 'tailwind-merge'
import { NumberSpan } from '../CubeTabs/NumberSpan/NumberSpan'
import { option, optionIcon, optionLabel } from './cubeSideBarStyles'
import type { CubeSideBarComboboxOptionProps } from './cubeSideBarTypes'

export const CubeSideBarComboboxOption = (
  props: Omit<CubeSideBarComboboxOptionProps, 'data-key'> & {
    /** The option's own test ID; `testKey` is its `data-key`, its label by default. */
    testId?: string
    testKey?: string
  },
) => {
  const {
    label,
    Icon,
    isSelected = false,
    notificationCount = 0,
    onClick,
    testId,
    testKey,
  } = props

  return (
    // TODO: change this to hyperlink.
    // `twMerge` drops the base `bg-transparent` when selected.
    <div
      className={twMerge(option({ isSelected }))}
      data-testid={testId}
      data-key={testId ? (testKey ?? label) : undefined}
      onClick={onClick}
    >
      <div className={optionLabel()}>
        <Icon className={optionIcon()} />
        <span>{label}</span>
      </div>
      {notificationCount !== 0 && <NumberSpan number={notificationCount} />}
    </div>
  )
}
