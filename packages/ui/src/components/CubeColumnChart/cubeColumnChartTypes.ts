import type { ChartData, TooltipCallbacks } from 'chart.js'

export type CubeColumnChartBaseData = {
  id: string
  label: string
  value: number
}

export type CubeColumnChartData<T extends CubeColumnChartBaseData> = T & {
  barColor: string
  labelColor: string
}

export type CubeColumnChartReturnData<T extends CubeColumnChartBaseData> =
  ChartData<'bar', number[], string> & {
    items: CubeColumnChartData<T>[]
  }

export type CubeColumnChartProps<T extends CubeColumnChartBaseData> = {
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * One bar per item. An empty array shows "No Data".
   */
  data: T[]
  yAxisTitle: string
  /**
   * Returns Chart.js tooltip callbacks, for example a custom title or label.
   */
  tooltipCallbackFn?: () => TooltipCallbacks<'bar'>
  onBarClick?: (bar: T) => void
  /**
   * Called on every pointer move over a bar; the other bars are dimmed.
   */
  onBarHover?: (data: T) => void
  /**
   * Called on every pointer move outside the bars.
   */
  onEmptyHover?: () => void
}

/**
 * Theme colors resolved from the `--cube-color-*` CSS variables, because the
 * chart draws on a canvas.
 */
export type CubeColumnChartColors = {
  bar: string
  label: string
  axis: string
  tooltipBackground: string
  tooltipBody: string
  tooltipTitle: string
}
