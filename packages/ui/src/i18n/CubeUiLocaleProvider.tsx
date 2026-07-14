import { useEffect, type PropsWithChildren } from 'react'
import i18n from './i18n'
import type { CubeUiLocale } from './types'

export type CubeUiLocaleProviderProps = PropsWithChildren<{
  /** The consumer app's active locale, kept in sync with @cube/ui's own i18n instance. */
  locale: CubeUiLocale
}>

/**
 * Wrap the app (or the part of it that renders @cube/ui components) in this
 * to sync your app's active locale into @cube/ui's own i18next instance.
 *
 * If you only need @cube/ui's shipped `en-US`/`zh-TW` translations, this is
 * the entire integration - no `addCubeUiTranslations` call required.
 */
export const CubeUiLocaleProvider = (props: CubeUiLocaleProviderProps) => {
  const { locale, children } = props

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return children
}
