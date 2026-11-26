import { clamp } from 'lodash'
import type { StrokeColorClass } from '@theme/tokens/cubeTheme'

export const defaultPercentageFormatter = (value: number) => {
  return `${value}%`
}

export const calculatePercentage = (used: number, total: number) => {
  // Default to 0 to avoid NaN when total is 0.
  return (used / total) * 100 || 0
}

export const getPercentageColor = (percentage: number): StrokeColorClass => {
  if (percentage <= 50) {
    return 'stroke-chart-1'
  } else if (percentage > 50 && percentage <= 80) {
    return 'stroke-status-warning'
  }
  return 'stroke-status-negative'
}

/**
 * UX Enhancement: Show at least 1% when the percentage is above 0, and whole
 * numbers otherwise (rounded down).
 */
export const getChartPercentage = (percentage: number) => {
  if (percentage === 0) return 0

  return Math.max(Math.floor(percentage), 1)
}

export const getSvgPercentage = (
  percentage: number,
  thresholdPercentage: number,
) => {
  const svgPercentageRatio = thresholdPercentage / 100
  let svgPercentage = clamp(percentage / svgPercentageRatio, 0, 100)

  /**
   * Workaround:
   *
   * Since we are using strokeLinecap="round", the circle gets additional length.
   * This causes the circle to appear identical to a full circle when the percentage is 99.
   *
   * To avoid this, we set the percentage to 98 when it is between 98 and 100.
   */
  if (svgPercentage > 98 && svgPercentage < 100) {
    svgPercentage = 98
  }

  return svgPercentage
}

export const getOverThresholdSvgPercentage = (
  percentage: number,
  thresholdPercentage: number,
) => getSvgPercentage(percentage - thresholdPercentage, thresholdPercentage)
