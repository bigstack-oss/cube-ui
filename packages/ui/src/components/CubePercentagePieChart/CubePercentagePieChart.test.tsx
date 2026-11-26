import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import i18n from '@i18n/i18n'
import { CubePercentagePieChart } from './CubePercentagePieChart'

const circumference = 2 * Math.PI * 68

// Track, main ring, and the over-limit ring when present.
const getRings = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('circle'))

const drawnRatio = (circle: SVGCircleElement | undefined) =>
  1 - Number(circle!.getAttribute('stroke-dashoffset')) / circumference

describe('CubePercentagePieChart', () => {
  it('shows the title, percentage, total and usage', () => {
    render(
      <CubePercentagePieChart
        title="Memory"
        unit="GB"
        used={380}
        total={755.1}
      />,
    )

    expect(screen.getByText('Memory')).toHaveClass('text-functional-title')
    // 380 / 755.1 = 50.3%, rounded down.
    expect(screen.getByText('50%')).toHaveClass('primary-h3')
    expect(screen.getByText('755.1 GB')).toBeInTheDocument()
    expect(screen.getByText('380/755.1 GB Used')).toBeInTheDocument()
    expect(screen.queryByText('Over Limit')).not.toBeInTheDocument()
  })

  it('draws the ring for the percentage', () => {
    const { container } = render(
      <CubePercentagePieChart
        title="Storage"
        unit="GB"
        used={25}
        total={100}
      />,
    )

    const [track, main, over] = getRings(container)
    expect(track).toHaveClass('stroke-functional-border-divider')
    expect(drawnRatio(main)).toBeCloseTo(0.25)
    expect(main).toHaveAttribute('stroke-linecap', 'round')
    expect(over).toBeUndefined()
  })

  it.each([
    [40, 'stroke-chart-1'],
    [70, 'stroke-status-warning'],
    [90, 'stroke-status-negative'],
  ])('colors %s%% as %s', (used, color) => {
    const { container } = render(
      <CubePercentagePieChart
        title="Storage"
        unit="GB"
        used={used}
        total={100}
      />,
    )

    expect(getRings(container)[1]).toHaveClass(color)
  })

  it('shows at least 1% for a tiny usage', () => {
    render(
      <CubePercentagePieChart
        title="Memory"
        unit="GB"
        used={0.01}
        total={755.1}
      />,
    )

    expect(screen.getByText('1%')).toBeInTheDocument()
  })

  it('shows 0% when used and total are 0', () => {
    render(
      <CubePercentagePieChart title="Memory" unit="GB" used={0} total={0} />,
    )

    expect(screen.getByText('0%')).toBeInTheDocument()
  })

  it('shows Infinity% for a used amount over a zero total (legacy)', () => {
    render(
      <CubePercentagePieChart title="Memory" unit="GB" used={5} total={0} />,
    )

    expect(screen.getByText('Infinity%')).toBeInTheDocument()
    expect(screen.getByText('Over Limit')).toBeInTheDocument()
  })

  it('adds the over-limit ring and text above the threshold', () => {
    const { container } = render(
      <CubePercentagePieChart
        title="Storage"
        unit="GB"
        used={150}
        total={100}
      />,
    )

    const [, main, over] = getRings(container)
    expect(drawnRatio(main)).toBeCloseTo(1)
    expect(over).toHaveClass('stroke-status-over-limit')
    expect(drawnRatio(over)).toBeCloseTo(0.5)
    expect(screen.getByText('Over Limit')).toHaveClass('text-status-negative')
  })

  it('uses a custom color, formatter, threshold and over-limit text', () => {
    const { container } = render(
      <CubePercentagePieChart
        title="vCPU"
        unit="vCPU"
        color="stroke-chart-2"
        percentageFormatter={(value) => `${value / 100}x`}
        thresholdPercentage={400}
        overThresholdText="Overcommitted"
        used={600}
        total={100}
      />,
    )

    const [, main, over] = getRings(container)
    expect(main).toHaveClass('stroke-chart-2')
    expect(screen.getByText('6x')).toBeInTheDocument()
    // 600% of a 400% threshold: a full ring plus half an over-limit ring.
    expect(drawnRatio(over)).toBeCloseTo(0.5)
    expect(screen.getByText('Overcommitted')).toBeInTheDocument()
  })

  it('uses the percentage prop over used / total', () => {
    render(
      <CubePercentagePieChart
        title="Memory"
        unit="GB"
        used={1}
        total={100}
        percentage={42.9}
      />,
    )

    expect(screen.getByText('42%')).toBeInTheDocument()
  })

  it('shows skeletons with the title while loading', () => {
    const { container } = render(
      <CubePercentagePieChart
        isLoading
        title="Memory"
        unit="GB"
        used={0}
        total={0}
      />,
    )

    expect(screen.getByText('Memory')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(4)
    expect(container.querySelector('.cube-skeleton')).toHaveClass(
      'size-[144px]',
      'rounded-full',
    )
  })

  it('translates the labels in zh-TW', async () => {
    await act(() => i18n.changeLanguage('zh-TW'))
    render(
      <CubePercentagePieChart
        title="Storage"
        unit="GB"
        used={150}
        total={100}
      />,
    )

    expect(screen.getByText('超出限制')).toBeInTheDocument()
    expect(screen.getByText('150/100 GB 已使用')).toBeInTheDocument()

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubePercentagePieChart
        title="Storage"
        unit="GB"
        used={150}
        total={100}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
