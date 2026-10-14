export const cubeStatusNeutralValues = [
  'neutral',
  'in-use',
  'finished',
] as const

export const cubeStatusSuccessValues = [
  'ok',
  'success',
  'active',
  'available',
  'powering on',
] as const

export const cubeStatusWarningValues = [
  'warning',
  'error',
  'fail',
  'failed',
  'stopped',
  'powering off',
] as const

export const cubeStatusKnownValues = [
  ...cubeStatusNeutralValues,
  ...cubeStatusSuccessValues,
  ...cubeStatusWarningValues,
] as const

export const cubeStatusTypes = [
  'neutral',
  'success',
  'warning',
  'others',
] as const

export type CubeStatusKnownValue = (typeof cubeStatusKnownValues)[number]

// Use `string & {}` alongside the known literals to allow those specific
// strings to autocomplete while still accepting any string.
// Reference: https://stackoverflow.com/a/61048124/19772349
export type CubeStatusValue = (string & {}) | CubeStatusKnownValue

export type CubeStatusType = (typeof cubeStatusTypes)[number]

export type CubeStatusProps = {
  status: CubeStatusValue
  /**
   * Custom display text for the status text.
   * If not specified, the text will be automatically generated
   * based on the built-in logic and i18n translations.
   */
  message?: string
}
