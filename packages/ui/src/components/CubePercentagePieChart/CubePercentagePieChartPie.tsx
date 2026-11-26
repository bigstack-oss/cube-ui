import { twJoin } from 'tailwind-merge'
import type { StrokeColorClass } from '@theme/tokens/cubeTheme'
import { ring, track } from './cubePercentagePieChartStyles'
import {
  getOverThresholdSvgPercentage,
  getSvgPercentage,
} from './cubePercentagePieChartUtils'

type CubePercentagePieChartPieProps = {
  color: StrokeColorClass
  percentage: number
  thresholdPercentage: number
}

const WIDTH = 144
const STROKE_WIDTH = 8

const halfWidth = WIDTH / 2
const radius = (WIDTH - STROKE_WIDTH) / 2
const circumference = 2 * Math.PI * radius

export const CubePercentagePieChartPie = (
  props: CubePercentagePieChartPieProps,
) => {
  const { color, percentage, thresholdPercentage } = props

  const mainSvgPercentage = getSvgPercentage(percentage, thresholdPercentage)
  const mainSvgOffset =
    circumference - (mainSvgPercentage / 100) * circumference

  const overThresholdSvgPercentage = getOverThresholdSvgPercentage(
    percentage,
    thresholdPercentage,
  )
  const overThresholdSvgOffset =
    circumference - (overThresholdSvgPercentage / 100) * circumference

  return (
    <svg width={WIDTH} height={WIDTH} className={ring()}>
      <circle
        className={track()}
        cx={halfWidth}
        cy={halfWidth}
        r={radius}
        strokeWidth={STROKE_WIDTH}
      />
      <circle
        className={twJoin('fill-transparent', color)}
        cx={halfWidth}
        cy={halfWidth}
        r={radius}
        fill="transparent"
        strokeWidth={STROKE_WIDTH}
        strokeDasharray={circumference}
        strokeDashoffset={mainSvgOffset}
        strokeLinecap="round"
      />
      {overThresholdSvgPercentage > 0 && (
        <circle
          className="fill-transparent stroke-status-over-limit"
          cx={halfWidth}
          cy={halfWidth}
          r={radius}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={circumference}
          strokeDashoffset={overThresholdSvgOffset}
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}
