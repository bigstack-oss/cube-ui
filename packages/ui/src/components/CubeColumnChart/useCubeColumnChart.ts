import { useCallback, useMemo, useRef, useState, type RefObject } from 'react'
import type { ChartOptions, TooltipCallbacks } from 'chart.js'
import type {
  CubeColumnChartBaseData,
  CubeColumnChartColors,
  CubeColumnChartData,
  CubeColumnChartReturnData,
} from './cubeColumnChartTypes'
import { getChartData, getChartOptions } from './cubeColumnChartUtils'

type UseCubeColumnChartOption<T extends CubeColumnChartBaseData> = {
  dataSet: T[]
  yAxisTitle: string
  colors: CubeColumnChartColors
  tooltipCallbackFn?: () => TooltipCallbacks<'bar'>
  onBarClick?: (bar: T) => void
  onBarHover?: (data: T) => void
  onEmptyHover?: () => void
}

type UseCubeColumnChart<T extends CubeColumnChartBaseData> = {
  hoveredDataIndexRef: RefObject<number | null>
  chartOptions: ChartOptions<'bar'>
  targetData: T | undefined
  chartData: CubeColumnChartReturnData<T> | undefined
}

export const useCubeColumnChart = <T extends CubeColumnChartBaseData>(
  options: UseCubeColumnChartOption<T>,
): UseCubeColumnChart<T> => {
  const {
    dataSet,
    yAxisTitle,
    colors,
    tooltipCallbackFn,
    onBarClick: onBarClickProp,
    onBarHover: onBarHoverProp,
    onEmptyHover: onEmptyHoverProp,
  } = options

  const hoveredDataIndexRef = useRef<number | null>(null)

  const [targetData, setTargetData] = useState<T | undefined>(undefined)

  const chartData = useMemo(
    () => getChartData(dataSet, targetData, colors),
    [dataSet, targetData, colors],
  )

  const onBarClick = useCallback(
    (bar: T) => {
      onBarClickProp?.(bar)
    },
    [onBarClickProp],
  )

  const onBarHover = useCallback(
    (data: T) => {
      onBarHoverProp?.(data)
      if (data.id !== targetData?.id && chartData) {
        const index = chartData.items.findIndex(
          (item: CubeColumnChartData<T>) => item.id === data.id,
        )

        if (index !== -1) {
          hoveredDataIndexRef.current = index
        }

        setTargetData(data)
      }
    },
    [onBarHoverProp, targetData?.id, chartData],
  )

  const onEmptyHover = useCallback(() => {
    onEmptyHoverProp?.()
    hoveredDataIndexRef.current = null
    setTargetData(undefined)
  }, [onEmptyHoverProp])

  const chartOptions = useMemo(
    () =>
      getChartOptions({
        yAxisTitle,
        chartData,
        colors,
        tooltipCallbackFn,
        onBarHover,
        onEmptyHover,
        onBarClick,
      }),
    [
      chartData,
      colors,
      onBarClick,
      onBarHover,
      onEmptyHover,
      tooltipCallbackFn,
      yAxisTitle,
    ],
  )

  return {
    hoveredDataIndexRef,
    chartOptions,
    targetData,
    chartData,
  }
}
