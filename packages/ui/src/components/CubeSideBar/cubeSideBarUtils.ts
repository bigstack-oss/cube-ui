const TIMEZONE_REGEX = /^([+-])(\d\d):(\d\d)$/

/**
 * `"+08:00"` → `"+8"`. Only the hours are shown.
 */
export const utcTimeZoneToDisplay = (
  utcTimeZone: string | undefined,
): string => {
  if (!utcTimeZone) return '-'

  const match = utcTimeZone.match(TIMEZONE_REGEX)
  if (!match) {
    console.warn(`Invalid timezone ${utcTimeZone}`)
    return utcTimeZone
  }

  const [, sign, hour] = match
  return `${sign}${parseInt(hour!)}`
}
