import type { StrokeColorClass } from '@theme/tokens/cubeTheme'

export type CubePercentagePieChartProps = {
  title: string
  unit: string
  total: number
  used: number
  /**
   * If not provided, the percentage will be calculated based on used and total.
   */
  percentage?: number
  /**
   * The percentage that fills the ring; anything above it is drawn as an
   * over-limit ring.
   * @default 100
   */
  thresholdPercentage?: number
  /**
   * If not provided, the color will be determined based on the percentage.
   */
  color?: StrokeColorClass
  percentageFormatter?: (value: number) => string
  /**
   * Shown below the total when over the threshold.
   * @default "Over Limit" (translated)
   */
  overThresholdText?: string
  /**
   * @default false
   */
  isLoading?: boolean
}
