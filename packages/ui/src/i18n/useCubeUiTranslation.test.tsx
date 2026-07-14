import { render, screen } from '@testing-library/react'
import { useCubeUiTranslation } from './useCubeUiTranslation'
import i18n from './i18n'

afterEach(async () => {
  await i18n.changeLanguage('en-US')
})

const LoadingLabel = () => {
  const { t } = useCubeUiTranslation()
  return <span>{t('component.common.loading')}</span>
}

describe('useCubeUiTranslation', () => {
  it('resolves a known key to its default English text', () => {
    render(<LoadingLabel />)

    expect(screen.getByText('Loading')).toBeInTheDocument()
  })

  it('resolves the same key in Traditional Chinese once the language changes', async () => {
    await i18n.changeLanguage('zh-TW')
    render(<LoadingLabel />)

    expect(screen.getByText('載入中')).toBeInTheDocument()
  })
})
