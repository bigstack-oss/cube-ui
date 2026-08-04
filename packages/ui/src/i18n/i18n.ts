import i18next, { type i18n as I18nInstance } from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUS from './resources/en-US.json'
import zhTW from './resources/zh-TW.json'

/**
 * @bigstack-oss/cube-ui keeps its own i18next instance, separate from whatever i18n setup
 * the consuming app uses, so the library works standalone regardless of the
 * consumer's own i18n choices (or lack thereof).
 */
// eslint-disable-next-line import/no-named-as-default-member
const i18n: I18nInstance = i18next.createInstance()

i18n.use(initReactI18next).init({
  resources: {
    'en-US': { translation: enUS },
    'zh-TW': { translation: zhTW },
  },
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false, // react already escapes from xss
  },
})

export default i18n
