export const cubeStatusReactionNeutralStatuses = ['neutral'] as const

export const cubeStatusReactionSuccessStatuses = [
  'success',
  'available',
  'done',
] as const

export const cubeStatusReactionWarningStatuses = [
  'error',
  'duplicate',
  'failed',
] as const

export const cubeStatusReactionStatuses = [
  ...cubeStatusReactionNeutralStatuses,
  ...cubeStatusReactionSuccessStatuses,
  ...cubeStatusReactionWarningStatuses,
] as const

export const cubeStatusReactionTypes = [
  'neutral',
  'success',
  'warning',
] as const

export type CubeStatusReactionStatus =
  (typeof cubeStatusReactionStatuses)[number]

export type CubeStatusReactionType = (typeof cubeStatusReactionTypes)[number]

export type CubeStatusReactionProps = {
  status: CubeStatusReactionStatus
  message?: string
}
