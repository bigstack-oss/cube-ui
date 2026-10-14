import {
  cubeStatusNeutralValues,
  cubeStatusSuccessValues,
  cubeStatusWarningValues,
  type CubeStatusType,
} from './cubeStatusTypes'

const neutralStatusSet = new Set<string>(cubeStatusNeutralValues)
const successStatusSet = new Set<string>(cubeStatusSuccessValues)
const warningStatusSet = new Set<string>(cubeStatusWarningValues)

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
