const neutralStatuses = ['neutral', 'in-use', 'finished'] as const

const successStatuses = [
  'ok',
  'success',
  'active',
  'available',
  'powering on',
] as const

const warningStatuses = [
  'warning',
  'error',
  'fail',
  'failed',
  'stopped',
  'powering off',
] as const

export const cubeStatusKnownValues = [
  ...neutralStatuses,
  ...successStatuses,
  ...warningStatuses,
] as const

type CubeStatusKnownValue = (typeof cubeStatusKnownValues)[number]

// Use `string & {}` alongside the known literals to allow those specific
// strings to autocomplete while still accepting any string.
// Reference: https://stackoverflow.com/a/61048124/19772349
export type CubeStatusValue = (string & {}) | CubeStatusKnownValue

export type CubeStatusType = 'neutral' | 'success' | 'warning' | 'others'

const neutralStatusSet = new Set<string>(neutralStatuses)
const successStatusSet = new Set<string>(successStatuses)
const warningStatusSet = new Set<string>(warningStatuses)

export const computeStatusType = (status: string): CubeStatusType => {
  if (neutralStatusSet.has(status)) {
    return 'neutral'
  } else if (successStatusSet.has(status)) {
    return 'success'
  } else if (warningStatusSet.has(status)) {
    return 'warning'
  }
  return 'others'
}

/**
 * Split a string using the `-` character and capitalize the first substring.
 */
export const formatOtherStatusText = (status: string): string => {
  const substrings = status.split('-').filter((text) => !!text)
  if (!substrings.length) {
    // This should not happen.
    return status
  }

  // Capitalize the first substring. `substrings.length` is checked above, so
  // the first element is always defined here.
  const [firstSubstring = '', ...otherSubstrings] = substrings
  const capitalizedFirstSubstring =
    firstSubstring.charAt(0).toUpperCase() + firstSubstring.substring(1)

  return [capitalizedFirstSubstring, ...otherSubstrings].join('-')
}
