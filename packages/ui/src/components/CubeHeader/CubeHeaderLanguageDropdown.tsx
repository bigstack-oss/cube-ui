import { CubeDropdown } from '../CubeDropdown/CubeDropdown'
import type { CubeHeaderProps } from './cubeHeaderTypes'

type CubeHeaderLanguageDropdownProps = Pick<
  CubeHeaderProps,
  'currentLanguage' | 'languageOptions'
>

export const CubeHeaderLanguageDropdown = (
  props: CubeHeaderLanguageDropdownProps,
) => {
  const { currentLanguage, languageOptions } = props

  return (
    <CubeDropdown type="radio" selectedItems={[currentLanguage]}>
      <CubeDropdown.Trigger placeholder="Select an Item">
        {languageOptions.find((i) => i.value === currentLanguage)?.label}
      </CubeDropdown.Trigger>
      <CubeDropdown.Menu>
        {languageOptions.map(({ label, value, onClick }) => (
          <CubeDropdown.Item
            key={value}
            item={value}
            onClick={() => onClick(value)}
          >
            {label}
          </CubeDropdown.Item>
        ))}
      </CubeDropdown.Menu>
    </CubeDropdown>
  )
}
