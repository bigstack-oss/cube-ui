import enUS from './resources/en-US.json'

/**
 * The exact set of valid @bigstack/cube-ui translation keys, derived from the
 * shipped English dictionary. Used to type-check consumer-supplied
 * translations - passing an unknown/misspelled key is a compile error.
 */
export type CubeUiTranslationResource = typeof enUS

/**
 * Autocompletes the locales @bigstack/cube-ui ships out of the box, while still
 * allowing a consumer to pass an arbitrary additional locale code.
 */
export type CubeUiLocale = 'en-US' | 'zh-TW' | (string & {})
