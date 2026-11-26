import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeCountSegmentedChart } from './CubeCountSegmentedChart'
import type { CubeCountSegmentedChartCountInfo } from './cubeCountSegmentedChartTypes'

// The segmented bar measures its parent's width.
class ResizeObserverStub {
  constructor(private callback: ResizeObserverCallback) {}
  observe() {
    this.callback(
      [{ contentRect: { width: 300 } } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    )
  }
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

const countInfos: CubeCountSegmentedChartCountInfo[] = [
  { name: 'Running', color: 'fill-chart-2', count: 51 },
  { name: 'Stopped', color: 'fill-chart-4', count: 1 },
  { name: 'Error', color: 'fill-status-negative', count: 0 },
]

const getCountBlocks = (container: HTMLElement) =>
  Array.from(
    container.querySelectorAll<HTMLElement>(
      '.justify-between.gap-x-2 > .flex-col',
    ),
  )

describe('CubeCountSegmentedChart', () => {
  it('renders the title, subtext, bar and counts', () => {
    const { container } = render(
      <CubeCountSegmentedChart
        title="VM Status"
        subtext="53 Instances"
        countInfos={countInfos}
      />,
    )

    expect(screen.getByText('VM Status')).toHaveClass(
      'primary-body2',
      'text-functional-title',
    )
    expect(screen.getByText('53 Instances')).toHaveClass('primary-body3')
    expect(getCountBlocks(container).map((block) => block.textContent)).toEqual(
      ['Running51', 'Stopped1', 'Error0'],
    )
  })

  it('draws a rounded bar from the counts, without zero-count segments', () => {
    const { container } = render(
      <CubeCountSegmentedChart countInfos={countInfos} />,
    )

    // Segments are rects; the color dots are circles.
    const rects = Array.from(container.querySelectorAll('rect'))
    expect(rects.map((rect) => rect.getAttribute('class'))).toEqual([
      'fill-chart-2',
      'fill-chart-4',
    ])
    expect(rects[0]!.getAttribute('rx')).not.toBeNull()
  })

  it('shows a color dot for each count', () => {
    const { container } = render(
      <CubeCountSegmentedChart countInfos={countInfos} />,
    )

    expect(
      Array.from(container.querySelectorAll('circle')).map((c) =>
        c.getAttribute('class'),
      ),
    ).toEqual(['fill-chart-2', 'fill-chart-4', 'fill-status-negative'])
  })

  it('shows the overview first, without a dot', () => {
    const { container } = render(
      <CubeCountSegmentedChart
        overview={{ name: 'Total VM', count: 52 }}
        countInfos={countInfos}
      />,
    )

    const [overview] = getCountBlocks(container)
    expect(overview).toHaveTextContent('Total VM52')
    expect(overview!.querySelector('circle')).not.toBeInTheDocument()
  })

  it('has no header without a title or subtext', () => {
    render(<CubeCountSegmentedChart countInfos={countInfos} />)

    expect(
      document.querySelector('.text-functional-title'),
    ).not.toBeInTheDocument()
  })

  it.each([
    [undefined, 5],
    [3, 3],
  ])(
    'shows skeletons while loading (skeletonCount %s)',
    (skeletonCount, expected) => {
      const { container } = render(
        <CubeCountSegmentedChart
          title="VM Status"
          subtext="53 Instances"
          isLoading
          skeletonCount={skeletonCount}
          countInfos={countInfos}
        />,
      )

      expect(screen.getByText('VM Status')).toBeInTheDocument()
      expect(screen.queryByText('53 Instances')).not.toBeInTheDocument()
      expect(container.querySelector('rect')).not.toBeInTheDocument()
      // Subtext, bar, and two per count.
      expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(
        2 + expected * 2,
      )
    },
  )

  it('shows no subtext skeleton without a subtext', () => {
    const { container } = render(
      <CubeCountSegmentedChart isLoading skeletonCount={3} countInfos={[]} />,
    )

    // Bar and two per count.
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(1 + 6)
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeCountSegmentedChart
        title="VM Status"
        subtext="53 Instances"
        overview={{ name: 'Total VM', count: 52 }}
        countInfos={countInfos}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
