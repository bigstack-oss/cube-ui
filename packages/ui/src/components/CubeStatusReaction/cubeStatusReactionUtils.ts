const neutralStatuses = ['neutral'] as const

const successStatuses = ['success', 'available', 'done'] as const

const warningStatuses = ['error', 'duplicate', 'failed'] as const

export const cubeStatusReactionStatuses = [
  ...neutralStatuses,
  ...successStatuses,
  ...warningStatuses,
] as const

export type CubeStatusReactionStatus =
  (typeof cubeStatusReactionStatuses)[number]

export type CubeStatusReactionType = 'neutral' | 'success' | 'warning'

const neutralStatusSet = new Set<string>(neutralStatuses)
const successStatusSet = new Set<string>(successStatuses)
const warningStatusSet = new Set<string>(warningStatuses)

export const computeStatusType = (
  status: CubeStatusReactionStatus,
): CubeStatusReactionType => {
  if (neutralStatusSet.has(status)) {
    return 'neutral'
  } else if (successStatusSet.has(status)) {
    return 'success'
  } else if (warningStatusSet.has(status)) {
    return 'warning'
  }
  throw new Error(`Status ${status} is not defined in CubeStatusReaction`)
}
