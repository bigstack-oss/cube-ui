import {
  cubeStatusReactionNeutralStatuses,
  cubeStatusReactionSuccessStatuses,
  cubeStatusReactionWarningStatuses,
  type CubeStatusReactionStatus,
  type CubeStatusReactionType,
} from './cubeStatusReactionTypes'

const neutralStatusSet = new Set<string>(cubeStatusReactionNeutralStatuses)
const successStatusSet = new Set<string>(cubeStatusReactionSuccessStatuses)
const warningStatusSet = new Set<string>(cubeStatusReactionWarningStatuses)

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
