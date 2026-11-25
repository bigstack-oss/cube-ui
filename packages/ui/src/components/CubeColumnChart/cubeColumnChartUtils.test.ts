import type { ChartOptions } from 'chart.js'
import { getChartData, getChartOptions } from './cubeColumnChartUtils'

const colors = {
  bar: '#647dff',
  label: '#3f4453',
  axis: '#858a9a',
  tooltipBackground: '#262932',
  tooltipBody: '#ffffff',
  tooltipTitle: '#b4c0fd',
}

const items = [
  { id: 'a', label: 'A', value: 1 },
  { id: 'b', label: 'B', value: 0 },
]

describe('getChartData', () => {
  it('returns undefined without items', () => {
    expect(getChartData([], undefined, colors)).toBeUndefined()
  })

  it('builds one dataset with the bar styles', () => {
    const data = getChartData(items, undefined, colors)!

    expect(data.labels).toEqual(['A', 'B'])
    expect(data.datasets[0]).toMatchObject({
      data: [1, 0],
      hoverBackgroundColor: '#647dff',
      barThickness: 9,
      borderRadius: 2,
    })
    expect(data.items.map((i) => i.labelColor)).toEqual(['#3f4453', '#3f4453'])
  })

  it('dims every item except the target', () => {
    const data = getChartData(items, items[0], colors)!

    expect(data.items.map((i) => i.barColor)).toEqual([
      '#647dff',
      'rgba(100, 125, 255, 0.3)',
    ])
  })
})

describe('getChartOptions', () => {
  const handlers = {
    onBarClick: vi.fn(),
    onBarHover: vi.fn(),
    onEmptyHover: vi.fn(),
  }

  it('returns empty options without data', () => {
    expect(
      getChartOptions({
        yAxisTitle: 'Y',
        chartData: undefined,
        colors,
        ...handlers,
      }),
    ).toEqual({})
  })

  it('hides the legend and the x grid, and keeps the aspect ratio free', () => {
    const options: ChartOptions<'bar'> = getChartOptions({
      yAxisTitle: 'Y',
      chartData: getChartData(items, undefined, colors),
      colors,
      ...handlers,
    })

    expect(options.maintainAspectRatio).toBe(false)
    expect(options.plugins!.legend!.display).toBe(false)
    expect(options.scales!.x!.grid!.display).toBe(false)
    expect(options.layout!.padding).toEqual({ top: 20 })
  })

  it('warns when clicking outside the bars', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const options = getChartOptions({
      yAxisTitle: 'Y',
      chartData: getChartData(items, undefined, colors),
      colors,
      ...handlers,
    })

    options.onClick!.call(undefined as never, {} as never, [], {} as never)

    expect(warn).toHaveBeenCalledWith('No available data')
    expect(handlers.onBarClick).not.toHaveBeenCalled()
    warn.mockRestore()
  })
})
