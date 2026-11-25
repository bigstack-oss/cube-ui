import { useMemo, useState } from 'react'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type Plugin,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { MonochromeChart } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { hexToRGBA } from '@internals/utils/theme/hexToRGBA'
import { useCubeColorTokens } from '@internals/utils/theme/useCubeColorTokens'
import { getTypography } from '@theme/tokens/utils/typography/typography'
import { CubeColumnChartSkeleton } from './CubeColumnChartSkeleton'
import {
  canvas,
  chart,
  empty,
  emptyIcon,
  emptyText,
} from './cubeColumnChartStyles'
import type {
  CubeColumnChartBaseData,
  CubeColumnChartColors,
  CubeColumnChartProps,
} from './cubeColumnChartTypes'
import { useCubeColumnChart } from './useCubeColumnChart'

// Same registrations as the legacy chart (`ArcElement` included), since
// Chart.js registration is global and other charts may rely on it.
ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
)

const colorTokens = [
  'chart-2',
  'functional-text',
  'functional-text-light',
  'dark-700',
  'grey-0',
  'primary-200',
] as const

export const CubeColumnChart = <T extends CubeColumnChartBaseData>(
  props: CubeColumnChartProps<T>,
) => {
  const {
    isLoading = false,
    data,
    yAxisTitle,
    tooltipCallbackFn,
    onBarClick: onBarClickProp,
    onBarHover,
    onEmptyHover,
  } = props

  const { t } = useCubeUiTranslation()

  // The canvas can't use `var(--cube-color-*)`; read the current theme's
  // values from the chart's own element, so an ancestor theme applies too.
  const [element, setElement] = useState<HTMLDivElement | null>(null)
  const tokens = useCubeColorTokens(element, colorTokens)
  const colors = useMemo<CubeColumnChartColors>(
    () => ({
      bar: tokens['chart-2'],
      label: tokens['functional-text'],
      axis: tokens['functional-text-light'],
      tooltipBackground: tokens['dark-700'],
      tooltipBody: tokens['grey-0'],
      tooltipTitle: tokens['primary-200'],
    }),
    [tokens],
  )

  const { hoveredDataIndexRef, chartOptions, chartData } = useCubeColumnChart({
    dataSet: data,
    yAxisTitle,
    colors,
    tooltipCallbackFn,
    onBarClick: onBarClickProp,
    onBarHover,
    onEmptyHover,
  })

  if (isLoading) return <CubeColumnChartSkeleton />

  if (!chartData) {
    return (
      <div className={empty()}>
        <MonochromeChart className={emptyIcon()} />
        <p className={emptyText()}>{t('component.common.noData')}</p>
      </div>
    )
  }

  const drawValuePlugin: Plugin<'bar'> = {
    id: 'drawValuePlugin',
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx
      const typography = getTypography('primary-body5')

      ctx.font = `${typography.fontSize} ${typography.fontFamily}`
      ctx.textAlign = 'center'

      chart.data.datasets.forEach((dataset, i) => {
        const meta = chart.getDatasetMeta(i)

        meta.data.forEach((bar, index) => {
          if (!bar) return

          const value = dataset.data[index] as number

          ctx.fillStyle =
            hoveredDataIndexRef.current === null ||
            hoveredDataIndexRef.current === index
              ? colors.label
              : hexToRGBA(colors.label, 0.3)
          ctx.fillText(value.toString(), bar.x, bar.y - 8)
        })
      })
    },
  }

  return (
    <div ref={setElement} className={chart()}>
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[drawValuePlugin]}
        className={canvas()}
      />
    </div>
  )
}
