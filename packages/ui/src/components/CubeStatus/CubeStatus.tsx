import { twMerge } from 'tailwind-merge'
import type { CubeStatusProps } from './cubeStatusTypes'
import { computeStatusType, formatOtherStatusText } from './cubeStatusUtils'
import { status as statusStyles } from './cubeStatusStyles'
import { useCubeStatusTranslation } from './useCubeStatusTranslation'
import { CubeStatusSkeleton } from './CubeStatusSkeleton'

export const CubeStatus = (props: CubeStatusProps) => {
  const { status, message } = props

  const type = computeStatusType(status)

  const translationMap = useCubeStatusTranslation()

  const getMessage = () => {
    if (message) {
      return message
    }

    if (status in translationMap) {
      return translationMap[status]
    }

    return formatOtherStatusText(status)
  }

  return <span className={twMerge(statusStyles({ type }))}>{getMessage()}</span>
}

CubeStatus.Skeleton = CubeStatusSkeleton
