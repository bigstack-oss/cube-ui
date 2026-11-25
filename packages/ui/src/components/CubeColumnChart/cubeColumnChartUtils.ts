import type {
  ActiveElement,
  ChartOptions,
  FontSpec,
  TooltipCallbacks,
} from 'chart.js'
import { hexToRGBA } from '@internals/utils/theme/hexToRGBA'
import { cubeTheme } from '@theme/tokens/cubeTheme'
import { getTypography } from '@theme/tokens/utils/typography/typography'
import type {
  CubeColumnChartBaseData,
  CubeColumnChartColors,
  CubeColumnChartReturnData,
} from './cubeColumnChartTypes'

export const chartFontFamily = cubeTheme.fontFamily.inter[0]

// TODO: make the `getChartXXX` functions as shared utilities
// since they are used in across multiple chart types (e.g., pie, bar, and line).
export const getChartYAxisTitleFont = (): Partial<FontSpec> => {
  const body5 = getTypography('primary-body5')
  const fontSize = Number(body5.fontSize.replace('px', ''))
  const lineHeight = body5.lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}

export const getChartTooltipTitleFont = (): Partial<FontSpec> => {
  const body2 = getTypography('primary-body2')
  const fontSize = Number(body2.fontSize.replace('px', ''))
  const lineHeight = body2.lineHeight
  const fontWeight = Number(cubeTheme.fontWeight.semibold)

  return {
    family: chartFontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  }
}

export const getChartTooltipBodyFont = (): Partial<FontSpec> => {
  const body3 = getTypography('primary-body3')
  const fontSize = Number(body3.fontSize.replace('px', ''))
  const lineHeight = body3.lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}

export const getChartData = <T extends CubeColumnChartBaseData>(
  dataSet: T[],
  targetData: T | undefined,
  colors: CubeColumnChartColors,
): CubeColumnChartReturnData<T> | undefined => {
  if (dataSet.length === 0) return undefined

  const items = dataSet.map((data) => {
    const isBlur = !!targetData && targetData.id !== data.id

    const barColorWithOpacity = isBlur ? hexToRGBA(colors.bar, 0.3) : colors.bar

    const labelColorWithOpacity = isBlur
      ? hexToRGBA(colors.label, 0.3)
      : colors.label

    return {
      ...data,
      barColor: barColorWithOpacity,
      labelColor: labelColorWithOpacity,
    }
  })

  return {
    labels: items.map((item) => item.label),
    datasets: [
      {
        data: items.map((item) => item.value || 0),
        backgroundColor: items.map((item) => item.barColor),
        hoverBackgroundColor: colors.bar,
        barThickness: 9,
        borderRadius: 2,
      },
    ],
    items,
  }
}

type GetChartOptionsProps<T extends CubeColumnChartBaseData> = {
  yAxisTitle: string
  chartData: CubeColumnChartReturnData<T> | undefined
  colors: CubeColumnChartColors
  tooltipCallbackFn?: () => TooltipCallbacks<'bar'>
  onBarClick: (data: T) => void
  onBarHover: (data: T) => void
  onEmptyHover: () => void
}

export const getChartOptions = <T extends CubeColumnChartBaseData>(
  props: GetChartOptionsProps<T>,
): ChartOptions<'bar'> => {
  const {
    yAxisTitle,
    chartData,
    colors,
    tooltipCallbackFn,
    onBarClick,
    onBarHover,
    onEmptyHover,
  } = props

  if (!chartData) return {} as ChartOptions<'bar'>

  return {
    responsive: true,
    maintainAspectRatio: false,
    font: {
      family: chartFontFamily,
    },
    layout: {
      padding: {
        top: 20,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: chartData.items.map((item) => item.labelColor),
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisTitle,
          font: getChartYAxisTitleFont(),
          color: colors.axis,
        },
        ticks: {
          color: colors.axis,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 12,
        displayColors: false,
        backgroundColor: colors.tooltipBackground,
        bodyColor: colors.tooltipBody,
        titleColor: colors.tooltipTitle,
        titleMarginBottom: 2,
        titleFont: getChartTooltipTitleFont(),
        bodyFont: getChartTooltipBodyFont(),
        boxPadding: 4,
        callbacks: tooltipCallbackFn?.(),
      },
    },
    onClick: (_, elements: ActiveElement[]) => {
      if (elements.length > 0) {
        /**
         * Get the index of the selected bar
         * And access the item from the `items` array based on the index
         */
        const index = elements[0]!.index
        const selectedEvent = chartData.items[index]!

        onBarClick?.(selectedEvent)
      } else {
        console.warn('No available data')
      }
    },
    // Chart.js onHover fires on every pointer move, not only on enter/leave.
    onHover: (_, elements: ActiveElement[], chart) => {
      if (elements.length > 0) {
        const index = elements[0]!.index
        onBarHover(chartData.items[index]!)
        chart.canvas.style.setProperty('cursor', 'pointer')
      } else {
        onEmptyHover()
        chart.canvas.style.removeProperty('cursor')
      }
    },
  }
}
