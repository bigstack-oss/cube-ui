import { twMerge } from 'tailwind-merge'
import type { CubeStatusProps } from './cubeStatusTypes'
import { computeStatusType, formatOtherStatusText } from './cubeStatusUtils'
import { status as statusStyles } from './cubeStatusStyles'
import { useCubeStatusTranslation } from './useCubeStatusTranslation'
import { CubeStatusSkeleton } from './CubeStatusSkeleton'

export const CubeStatus = (props: CubeStatusProps) => {
  const { status, message, 'data-testid': testIdProp } = props

  const testId = testIdProp || undefined

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

  return (
    <span
      className={twMerge(statusStyles({ type }))}
      data-testid={testId}
      // The untranslated value, so a test does not depend on the language.
      data-status={testId ? status : undefined}
    >
      {getMessage()}
    </span>
  )
}

CubeStatus.Skeleton = CubeStatusSkeleton
