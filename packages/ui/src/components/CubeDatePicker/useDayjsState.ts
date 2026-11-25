import { useEffect, useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import zhTw from 'dayjs/locale/zh-tw'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'

/**
 * Register the zh-TW locale (English is built in) without changing the
 * consumer's global dayjs locale; the legacy library did this in its
 * LocaleProvider, which cube-ui does not have.
 */
dayjs.locale(zhTw, undefined, true)

/**
 * Changing the global dayjs locale doesn't affect existing dayjs instances.
 * Therefore, we have to synchronize the updated locale with the current i18n language.
 *
 * reference: https://day.js.org/docs/en/i18n/changing-locale
 */
export const useDayjsState = (initialFn: () => Dayjs) => {
  const [date, setDate] = useState<Dayjs>(initialFn)

  const { i18n } = useCubeUiTranslation()

  useEffect(() => {
    setDate((d) => d.locale(i18n.language))
  }, [i18n.language])

  return [date, setDate] as const
}
