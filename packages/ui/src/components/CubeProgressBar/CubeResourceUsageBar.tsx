import { useRef, type CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'
import type { BackgroundColorClass } from '@theme/tokens/cubeTheme'
import { CubeProgressBar } from './CubeProgressBar'
import type {
  CubeProgressBarRef,
  CubeResourceUsageBarProps,
} from './cubeProgressBarTypes'
import { CubeProgressBarSkeleton } from './CubeProgressBarSkeleton'
import { progressFill } from './cubeProgressBarStyles'
import { useOverThreshold } from './useOverThreshold'

const getProgressColor = (progress: number): BackgroundColorClass => {
  if (progress <= 50) {
    return 'bg-chart-1'
  } else if (progress > 50 && progress <= 80) {
    return 'bg-status-warning'
  }
  return 'bg-status-negative'
}

export const CubeResourceUsageBar = (props: CubeResourceUsageBarProps) => {
  const { className, progress } = props

  const cubeProgressBarRef = useRef<CubeProgressBarRef | null>(null)

  const { overThresholdFillWidthPercentage, overThresholdProgress } =
    useOverThreshold(cubeProgressBarRef.current?.barWidth ?? 0, progress)

  const overThresholdProgressWidthStyle: CSSProperties = {
    width: `${overThresholdFillWidthPercentage}%`,
  }

  const color = getProgressColor(progress)

  return (
    <CubeProgressBar
      ref={cubeProgressBarRef}
      className={className}
      progress={progress}
      color={color}
    >
      {overThresholdFillWidthPercentage > 0 && (
        <div
          className={twMerge(
            progressFill({
              isFull: overThresholdProgress >= 100,
            }),
            'bg-status-over-limit',
          )}
          style={overThresholdProgressWidthStyle}
        />
      )}
    </CubeProgressBar>
  )
}

CubeResourceUsageBar.Skeleton = CubeProgressBarSkeleton
