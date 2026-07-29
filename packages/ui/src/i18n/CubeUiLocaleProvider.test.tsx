import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CubeUiLocaleProvider } from './CubeUiLocaleProvider'
import { useCubeUiTranslation } from './useCubeUiTranslation'
import i18n from './i18n'
import type { CubeUiLocale } from './types'

afterEach(async () => {
  await i18n.changeLanguage('en-US')
})

const LoadingLabel = () => {
  const { t } = useCubeUiTranslation()
  return <span>{t('component.common.loading')}</span>
}

const LocaleSwitcher = () => {
  const [locale, setLocale] = useState<CubeUiLocale>('en-US')

  return (
    <CubeUiLocaleProvider locale={locale}>
      <button onClick={() => setLocale('zh-TW')}>Switch to zh-TW</button>
      <LoadingLabel />
    </CubeUiLocaleProvider>
  )
}

describe('CubeUiLocaleProvider', () => {
  it('syncs the provided locale into @bigstack/cube-ui translated output', async () => {
    const user = userEvent.setup()
    render(<LocaleSwitcher />)

    expect(screen.getByText('Loading')).toBeInTheDocument()

    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('載入中')).toBeInTheDocument()
    })
  })
})
