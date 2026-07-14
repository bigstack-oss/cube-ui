import i18n from './i18n'
import type { CubeUiLocale, CubeUiTranslationResource } from './types'

/**
 * Registers additional or overriding translations for @cube/ui's own
 * strings. Use this to add a locale @cube/ui doesn't ship by default, or to
 * override specific default strings for a locale it does ship.
 *
 * `resources` is checked against @cube/ui's real key set - an unknown or
 * misspelled key is a TypeScript error. Omitted keys for a new locale fall
 * back to the English (`en-US`) text.
 *
 * **Mutation warning:** i18next stores the resource objects passed to `init`
 * by reference and deep-merges overrides into them in place. Any imported
 * JSON module used as a default will reflect overrides after this is called.
 * Take a `structuredClone` snapshot of your defaults before calling this if
 * you need to restore them later.
 */
export function addCubeUiTranslations(
  locale: CubeUiLocale,
  resources: Partial<CubeUiTranslationResource>,
): void {
  i18n.addResourceBundle(locale, 'translation', resources, true, true)
  // addResourceBundle only emits 'added' on the resource store, which some
  // versions of react-i18next do not watch. Re-emitting 'languageChanged'
  // guarantees every useTranslation hook re-renders with the updated bundle.
  if (i18n.isInitialized) {
    i18n.emit('languageChanged', i18n.language)
  }
}
