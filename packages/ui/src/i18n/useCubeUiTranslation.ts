import { useTranslation } from 'react-i18next'
import i18n from './i18n'

/**
 * Components should use this instead of react-i18next's `useTranslation`
 * directly, to stay pinned to @cube/ui's own i18next instance rather than
 * being affected by an outer i18n provider the consumer app may have.
 */
export const useCubeUiTranslation: typeof useTranslation = (ns, options) => {
  return useTranslation(ns, { ...options, i18n })
}
