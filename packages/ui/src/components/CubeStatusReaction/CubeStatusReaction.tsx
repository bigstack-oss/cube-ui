import { upperFirst } from 'lodash'
import { twMerge } from 'tailwind-merge'
import {
  MonochromeCheckmarkBold,
  MonochromeCheckmarkCircleFill,
  MonochromeCrossFill,
} from '@icons'
import type { SvgComponent } from '../CubeIcon/cubeIconTypes'
import type {
  CubeStatusReactionStatus,
  CubeStatusReactionType,
} from './cubeStatusReactionUtils'
import { computeStatusType } from './cubeStatusReactionUtils'
import { statusReaction } from './cubeStatusReactionStyles'
import { useCubeStatusReactionTranslation } from './useCubeStatusReactionTranslation'
import { CubeStatusReactionSkeleton } from './CubeStatusReactionSkeleton'

const iconMap: Record<CubeStatusReactionType, SvgComponent> = {
  neutral: MonochromeCheckmarkBold,
  success: MonochromeCheckmarkCircleFill,
  warning: MonochromeCrossFill,
}

export type CubeStatusReactionProps = {
  status: CubeStatusReactionStatus
  message?: string
}

export const CubeStatusReaction = (props: CubeStatusReactionProps) => {
  const { status, message } = props

  const type = computeStatusType(status)
  const Icon = iconMap[type]

  const translationMap = useCubeStatusReactionTranslation()

  const getMessage = () => {
    if (message) {
      return message
    }

    if (status in translationMap) {
      return translationMap[status]
    }

    return upperFirst(status)
  }

  return (
    <div className={twMerge(statusReaction({ type }))}>
      <Icon className="icon-md-sm shrink-0" />
      <span>{getMessage()}</span>
    </div>
  )
}

CubeStatusReaction.Skeleton = CubeStatusReactionSkeleton
