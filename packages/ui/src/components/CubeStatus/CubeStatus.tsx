import { twMerge } from 'tailwind-merge'
import {
  computeStatusType,
  formatOtherStatusText,
  type CubeStatusValue,
} from './cubeStatusUtils'
import { status as statusStyles } from './cubeStatusStyles'
import { useCubeStatusTranslation } from './useCubeStatusTranslation'
import { CubeStatusSkeleton } from './CubeStatusSkeleton'

export type CubeStatusProps = {
  status: CubeStatusValue
  /**
   * Custom display text for the status text.
   * If not specified, the text will be automatically generated
   * based on the built-in logic and i18n translations.
   */
  message?: string
}

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
