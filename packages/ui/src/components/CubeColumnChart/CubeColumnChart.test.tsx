import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import type { ActiveElement, Chart, ChartOptions, Plugin } from 'chart.js'
import i18n from '@i18n/i18n'
import { CubeColumnChart } from './CubeColumnChart'
import type { CubeColumnChartReturnData } from './cubeColumnChartTypes'

type Item = { id: string; label: string; value: number }

// jsdom has no canvas, so capture what the chart passes to `<Bar>`.
const barProps = vi.hoisted(() => ({
  current: undefined as
    | {
        data: CubeColumnChartReturnData<Item>
        options: ChartOptions<'bar'>
        plugins: Plugin<'bar'>[]
      }
    | undefined,
}))

vi.mock('react-chartjs-2', () => ({
  Bar: (props: NonNullable<typeof barProps.current>) => {
    barProps.current = props
    return <canvas data-testid="bar-chart" />
  },
}))

const items: Item[] = [
  { id: '1', label: 'Event 1', value: 100 },
  { id: '2', label: 'Event 2', value: 200 },
  { id: '3', label: 'Event 3', value: 300 },
]

const cubeCOS = {
  'chart-2': '#647dff',
  'functional-text': '#3f4453',
  'functional-text-light': '#858a9a',
  'dark-700': '#262932',
  'grey-0': '#ffffff',
  'primary-200': '#b4c0fd',
}

// jsdom doesn't load the theme CSS, so set the variables inline.
const setTheme = (tokens: Record<string, string>) =>
  Object.entries(tokens).forEach(([name, value]) =>
    document.documentElement.style.setProperty(`--cube-color-${name}`, value),
  )

const getBar = () => barProps.current!

const fakeCanvas = () => document.createElement('canvas')

// Chart.js calls `onHover(event, elements, chart)` with the bars under the pointer.
const hover = (index: number | null) => {
  const canvas = fakeCanvas()
  const elements = index === null ? [] : [{ index } as ActiveElement]
  act(() =>
    getBar().options.onHover!.call(undefined as never, {} as never, elements, {
      canvas,
    } as Chart),
  )
  return canvas
}

describe('CubeColumnChart', () => {
  beforeEach(() => {
    barProps.current = undefined
    setTheme(cubeCOS)
  })

  afterEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute('data-cube-theme')
  })

  it('draws one bar per item in the theme colors', () => {
    render(<CubeColumnChart data={items} yAxisTitle="Occurrences" />)

    expect(screen.getByTestId('bar-chart').parentElement).toHaveClass(
      'relative',
      'h-[385px]',
    )
    const { data, options } = getBar()
    expect(data.labels).toEqual(['Event 1', 'Event 2', 'Event 3'])
    expect(data.datasets[0]!.data).toEqual([100, 200, 300])
    expect(data.datasets[0]!.backgroundColor).toEqual([
      '#647dff',
      '#647dff',
      '#647dff',
    ])
    expect(options.scales!.y!.title).toMatchObject({
      text: 'Occurrences',
      color: '#858a9a',
    })
    expect(options.plugins!.tooltip).toMatchObject({
      backgroundColor: '#262932',
      bodyColor: '#ffffff',
      titleColor: '#b4c0fd',
    })
  })

  it('follows the active theme', async () => {
    render(<CubeColumnChart data={items} yAxisTitle="Occurrences" />)

    await act(async () => {
      setTheme({ 'chart-2': '#aa7dff', 'primary-200': '#d0b7ff' })
      document.documentElement.dataset.cubeTheme = 'cubeEMP'
      await Promise.resolve()
    })

    expect(getBar().data.datasets[0]!.hoverBackgroundColor).toBe('#aa7dff')
    expect(getBar().options.plugins!.tooltip!.titleColor).toBe('#d0b7ff')
  })

  it('dims the other bars on hover and restores them', () => {
    const onBarHover = vi.fn()
    const onEmptyHover = vi.fn()
    render(
      <CubeColumnChart
        data={items}
        yAxisTitle="Occurrences"
        onBarHover={onBarHover}
        onEmptyHover={onEmptyHover}
      />,
    )

    const canvas = hover(1)

    // Like the legacy chart, the item comes with its computed colors.
    expect(onBarHover).toHaveBeenCalledWith(expect.objectContaining(items[1]))
    expect(canvas.style.cursor).toBe('pointer')
    expect(getBar().data.datasets[0]!.backgroundColor).toEqual([
      'rgba(100, 125, 255, 0.3)',
      '#647dff',
      'rgba(100, 125, 255, 0.3)',
    ])
    expect(getBar().options.scales!.x!.ticks!.color).toEqual([
      'rgba(63, 68, 83, 0.3)',
      '#3f4453',
      'rgba(63, 68, 83, 0.3)',
    ])

    const emptyCanvas = hover(null)

    expect(onEmptyHover).toHaveBeenCalled()
    expect(emptyCanvas.style.cursor).toBe('')
    expect(getBar().data.datasets[0]!.backgroundColor).toEqual([
      '#647dff',
      '#647dff',
      '#647dff',
    ])
  })

  it('calls onBarClick with the clicked item', () => {
    const onBarClick = vi.fn()
    render(
      <CubeColumnChart
        data={items}
        yAxisTitle="Occurrences"
        onBarClick={onBarClick}
      />,
    )

    act(() =>
      getBar().options.onClick!.call(
        undefined as never,
        {} as never,
        [{ index: 2 } as ActiveElement],
        {} as Chart,
      ),
    )

    expect(onBarClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: '3', value: 300 }),
    )
  })

  it('passes the tooltip callbacks', () => {
    const title = () => 'Custom title'
    render(
      <CubeColumnChart
        data={items}
        yAxisTitle="Occurrences"
        tooltipCallbackFn={() => ({ title }) as never}
      />,
    )

    expect(getBar().options.plugins!.tooltip!.callbacks).toEqual({ title })
  })

  it('draws each value above its bar, dimming the others on hover', () => {
    render(<CubeColumnChart data={items} yAxisTitle="Occurrences" />)
    hover(0)

    const fillText = vi.fn()
    const styles: string[] = []
    const ctx = {
      font: '',
      textAlign: '',
      set fillStyle(value: string) {
        styles.push(value)
      },
      fillText,
    }
    const plugin = getBar().plugins.find((p) => p.id === 'drawValuePlugin')!
    plugin.afterDatasetsDraw!(
      {
        ctx,
        data: getBar().data,
        getDatasetMeta: () => ({
          data: [
            { x: 10, y: 100 },
            { x: 20, y: 80 },
            { x: 30, y: 60 },
          ],
        }),
      } as never,
      {} as never,
      {} as never,
      {} as never,
    )

    expect(ctx.font).toContain('11px')
    expect(fillText.mock.calls).toEqual([
      ['100', 10, 92],
      ['200', 20, 72],
      ['300', 30, 52],
    ])
    expect(styles).toEqual([
      '#3f4453',
      'rgba(63, 68, 83, 0.3)',
      'rgba(63, 68, 83, 0.3)',
    ])
  })

  it('shows "No Data" without items', () => {
    render(<CubeColumnChart data={[]} yAxisTitle="Occurrences" />)

    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument()
    expect(screen.getByText('No Data')).toHaveClass(
      'text-functional-text-light',
    )
  })

  it('translates "No Data" in zh-TW', async () => {
    await act(() => i18n.changeLanguage('zh-TW'))
    render(<CubeColumnChart data={[]} yAxisTitle="Occurrences" />)

    expect(screen.queryByText('No Data')).not.toBeInTheDocument()

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('shows a skeleton while loading', () => {
    const { container } = render(
      <CubeColumnChart isLoading data={items} yAxisTitle="Occurrences" />,
    )

    expect(screen.queryByTestId('bar-chart')).not.toBeInTheDocument()
    // 6 rows of label + line, 10 bars, 10 x-axis labels.
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(
      6 * 2 + 10 + 10,
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeColumnChart data={[]} yAxisTitle="Occurrences" />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
