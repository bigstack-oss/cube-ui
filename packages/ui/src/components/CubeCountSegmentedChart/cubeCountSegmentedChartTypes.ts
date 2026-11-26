import type { FillColorClass } from '@theme/tokens/cubeTheme'

export type CubeCountSegmentedChartCountInfo = {
  name: string
  count: number
  /**
   * The segment and dot color, a Tailwind fill class such as `fill-chart-2`.
   */
  color: FillColorClass
}

export type CubeCountSegmentedChartOverview = Pick<
  CubeCountSegmentedChartCountInfo,
  'name' | 'count'
>

export type CubeCountSegmentedChartProps = {
  title?: string
  subtext?: string
  /**
   * A total shown first, without a color dot.
   */
  overview?: CubeCountSegmentedChartOverview
  countInfos: CubeCountSegmentedChartCountInfo[]
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * Number of count placeholders while loading.
   * @default 5
   */
  skeletonCount?: number
}
