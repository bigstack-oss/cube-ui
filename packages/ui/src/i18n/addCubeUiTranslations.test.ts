import { addCubeUiTranslations } from './addCubeUiTranslations'
import i18n from './i18n'

afterEach(async () => {
  i18n.removeResourceBundle('en-US', 'translation')
  i18n.addResourceBundle(
    'en-US',
    'translation',
    {
      'component.common.loading': 'Loading',
      'component.common.noData': 'No Data',
    },
    true,
    true,
  )
  i18n.removeResourceBundle('fr-FR', 'translation')
  await i18n.changeLanguage('en-US')
})

describe('addCubeUiTranslations', () => {
  it('overrides an existing key for a locale @bigstack/cube-ui already ships', () => {
    addCubeUiTranslations('en-US', {
      'component.common.loading': 'Please wait',
    })

    expect(i18n.t('component.common.loading')).toBe('Please wait')
  })

  it('adds a brand-new locale using a subset of keys, falling back to en-US for the rest', async () => {
    addCubeUiTranslations('fr-FR', { 'component.common.loading': 'Chargement' })
    await i18n.changeLanguage('fr-FR')

    expect(i18n.t('component.common.loading')).toBe('Chargement')
    // 'common.noData' was never provided for fr-FR, so it falls back to English.
    expect(i18n.t('component.common.noData')).toBe('No Data')
  })

  it('rejects an unknown/misspelled key at compile time', () => {
    // @ts-expect-error - 'component.common.laoding' is not a valid @bigstack/cube-ui translation key.
    addCubeUiTranslations('en-US', { 'component.common.laoding': 'Loading' })
  })
})
