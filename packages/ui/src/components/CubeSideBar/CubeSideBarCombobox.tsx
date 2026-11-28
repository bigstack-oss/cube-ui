import { testIdOf } from '@utils/testId'
import { CubeSideBarBlock } from './CubeSideBarBlock'
import { CubeSideBarComboboxOption } from './CubeSideBarComboboxOption'
import { options as optionsStyle } from './cubeSideBarStyles'
import type { CubeSideBarProps } from './cubeSideBarTypes'

type CubeSideBarComboboxProps = Pick<CubeSideBarProps, 'options'> & {
  testId?: string
}

export const CubeSideBarCombobox = (props: CubeSideBarComboboxProps) => {
  const { options, testId } = props

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
          testId={testIdOf(testId, 'option')}
          testKey={option['data-key']}
        />
      ))}
    </CubeSideBarBlock>
  )
}
