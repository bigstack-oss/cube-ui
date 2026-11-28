import { testIdOf } from '@utils/testId'
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
    'data-testid': testIdProp,
  } = props

  const testId = testIdProp || undefined

  return (
    <div className={header()} data-testid={testId}>
      <CubeHeaderQuickAccessBar
        isLoading={isLoading}
        quickAccesses={quickAccesses}
        testId={testId}
      />
      <div className={divider()} />
      <CubeHeaderLanguageDropdown
        currentLanguage={currentLanguage}
        languageOptions={languageOptions}
        testId={testIdOf(testId, 'language')}
      />
      <CubeHeaderFunctionBar items={functionBarItems} testId={testId} />
      <div className={bottomStroke()}>
        <CubeStroke />
      </div>
    </div>
  )
}
