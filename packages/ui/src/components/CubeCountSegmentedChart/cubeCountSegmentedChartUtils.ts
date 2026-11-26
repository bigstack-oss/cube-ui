import type { Segment } from '../CubeSegmentedBar/cubeSegmentedBarUtils'
import type { CubeCountSegmentedChartCountInfo } from './cubeCountSegmentedChartTypes'

export const mapToSegment = (
  countInfo: CubeCountSegmentedChartCountInfo,
): Segment => {
  return {
    colCount: countInfo.count,
    color: countInfo.color,
  }
}
