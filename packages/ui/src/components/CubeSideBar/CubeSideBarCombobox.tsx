import { CubeSideBarBlock } from './CubeSideBarBlock'
import { CubeSideBarComboboxOption } from './CubeSideBarComboboxOption'
import { options as optionsStyle } from './cubeSideBarStyles'
import type { CubeSideBarProps } from './cubeSideBarTypes'

type CubeSideBarComboboxProps = Pick<CubeSideBarProps, 'options'>

export const CubeSideBarCombobox = (props: CubeSideBarComboboxProps) => {
  const { options } = props

  return (
    <CubeSideBarBlock className={optionsStyle()}>
      {options.map((option) => (
        <CubeSideBarComboboxOption
          key={option.label}
          label={option.label}
          Icon={option.Icon}
          isSelected={option.isSelected}
          notificationCount={option.notificationCount}
          onClick={option.onClick}
        />
      ))}
    </CubeSideBarBlock>
  )
}
