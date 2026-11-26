import type { CubeCountSegmentedChartCountInfo } from '@components/CubeCountSegmentedChart/cubeCountSegmentedChartTypes'

export const vmSummary: CubeCountSegmentedChartCountInfo[] = [
  { name: 'Running', color: 'fill-chart-2', count: 51 },
  { name: 'Stopped', color: 'fill-chart-4', count: 1 },
  { name: 'Suspended', color: 'fill-chart-3', count: 1 },
  { name: 'Paused', color: 'fill-chart-6', count: 1 },
  { name: 'Error', color: 'fill-status-negative', count: 1 },
]

export const vmTotalCount = vmSummary.reduce(
  (total, countInfo) => total + countInfo.count,
  0,
)

export const roleSummary: CubeCountSegmentedChartCountInfo[] = [
  { name: 'Control', color: 'fill-chart-1', count: 1 },
  { name: 'Compute', color: 'fill-chart-2', count: 1 },
  { name: 'Storage', color: 'fill-chart-3', count: 1 },
]
