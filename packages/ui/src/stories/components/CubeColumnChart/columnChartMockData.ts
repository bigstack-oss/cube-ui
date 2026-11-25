import type { TooltipCallbacks, TooltipItem } from 'chart.js'
import type { CubeColumnChartBaseData } from '@components/CubeColumnChart/cubeColumnChartTypes'

export const mockData: CubeColumnChartBaseData[] = [
  { id: '1', label: 'Event 1', value: 100 },
  { id: '2', label: 'Event 2', value: 200 },
  { id: '3', label: 'Event 3', value: 300 },
]

// The legacy story's custom tooltip.
export const mockTooltipCallbackFn = () =>
  ({
    title: (tooltipItems: TooltipItem<'bar'>[]) =>
      tooltipItems?.[0]?.label.split('(')[0],
    label: (tooltipItem: TooltipItem<'bar'>) => [
      `Custom Tooltip Label: ${tooltipItem.label}`,
      `Custom Tooltip Counting: ${tooltipItem.formattedValue}`,
    ],
  }) as TooltipCallbacks<'bar'>
