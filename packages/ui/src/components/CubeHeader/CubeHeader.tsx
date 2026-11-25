import { CubeStroke } from '../CubeStroke/CubeStroke'
import { CubeHeaderFunctionBar } from './CubeHeaderFunctionBar'
import { CubeHeaderLanguageDropdown } from './CubeHeaderLanguageDropdown'
import { CubeHeaderQuickAccessBar } from './CubeHeaderQuickAccessBar'
import { bottomStroke, divider, header } from './cubeHeaderStyles'
import type { CubeHeaderProps } from './cubeHeaderTypes'

export const CubeHeader = (props: CubeHeaderProps) => {
  const {
    isLoading,
    quickAccesses,
    functionBarItems,
    languageOptions,
    currentLanguage,
  } = props

  return (
    <div className={header()}>
      <CubeHeaderQuickAccessBar
        isLoading={isLoading}
        quickAccesses={quickAccesses}
      />
      <div className={divider()} />
      <CubeHeaderLanguageDropdown
        currentLanguage={currentLanguage}
        languageOptions={languageOptions}
      />
      <CubeHeaderFunctionBar items={functionBarItems} />
      <div className={bottomStroke()}>
        <CubeStroke />
      </div>
    </div>
  )
}
