import { CubeDropdown } from '../CubeDropdown/CubeDropdown'
import type { CubeHeaderProps } from './cubeHeaderTypes'

type CubeHeaderLanguageDropdownProps = Pick<
  CubeHeaderProps,
  'currentLanguage' | 'languageOptions'
> & {
  /** Already derived by the header: `<test-id>-language`. */
  testId?: string
}

export const CubeHeaderLanguageDropdown = (
  props: CubeHeaderLanguageDropdownProps,
) => {
  const { currentLanguage, languageOptions, testId } = props

  return (
    <CubeDropdown
      type="radio"
      selectedItems={[currentLanguage]}
      data-testid={testId}
    >
      <CubeDropdown.Trigger placeholder="Select an Item">
        {languageOptions.find((i) => i.value === currentLanguage)?.label}
      </CubeDropdown.Trigger>
      <CubeDropdown.Menu>
        {languageOptions.map(({ label, value, onClick }) => (
          <CubeDropdown.Item
            key={value}
            item={value}
            // The value is stable across languages; the label is not.
            data-key={value}
            onClick={() => onClick(value)}
          >
            {label}
          </CubeDropdown.Item>
        ))}
      </CubeDropdown.Menu>
    </CubeDropdown>
  )
}
