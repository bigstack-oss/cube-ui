import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeSegmentedBar } from './CubeSegmentedBar'
import type { Segment } from './cubeSegmentedBarUtils'

class ResizeObserverStub {
  constructor(private callback: ResizeObserverCallback) {}
  observe() {
    this.callback(
      [{ contentRect: { width: 200 } } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    )
  }
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

const segments: Segment[] = [
  { color: 'fill-chart-1', colCount: 1 },
  { color: 'fill-chart-2', colCount: 1 },
  { color: 'fill-chart-3', colCount: 2 },
]

const getRects = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('rect'))

const getAttrs = (rect: SVGRectElement | undefined) => ({
  width: rect?.getAttribute('width'),
  x: rect?.getAttribute('x'),
  rx: rect?.getAttribute('rx'),
})

describe('CubeSegmentedBar', () => {
  it("splits the parent's width between segments by column count", () => {
    const { container } = render(<CubeSegmentedBar segments={segments} />)

    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '200')
    expect(svg).toHaveAttribute('height', '9')

    const rects = getRects(container)
    expect(rects.map((rect) => rect.getAttribute('class'))).toEqual([
      'fill-chart-1',
      'fill-chart-2',
      'fill-chart-3',
    ])
    expect(rects.map(getAttrs)).toEqual([
      { width: '50', x: '0', rx: '0' },
      { width: '50', x: '50', rx: '0' },
      { width: '100', x: '100', rx: '0' },
    ])
  })

  it('skips segments with no columns', () => {
    const { container } = render(
      <CubeSegmentedBar
        segments={[
          { color: 'fill-chart-1', colCount: 0 },
          { color: 'fill-chart-2', colCount: 3 },
          { color: 'fill-chart-3', colCount: 0 },
        ]}
      />,
    )

    const rects = getRects(container)
    expect(rects).toHaveLength(1)
    expect(rects[0]).toHaveClass('fill-chart-2')
    expect(getAttrs(rects[0])).toEqual({ width: '200', x: '0', rx: '0' })
  })

  it('rounds only the outer sides when rounded', () => {
    const { container } = render(
      <CubeSegmentedBar segments={segments} rounded />,
    )

    // The radius is half the bar height (9px), rounded up. The outer
    // segments grow by the radius, which is then clipped off.
    expect(getRects(container).map(getAttrs)).toEqual([
      { width: '55', x: '0', rx: '5' },
      { width: '50', x: '50', rx: '0' },
      { width: '105', x: '95', rx: '5' },
    ])
    expect(container.querySelectorAll('style')).toHaveLength(2)
  })

  it('rounds both sides of a single segment', () => {
    const { container } = render(
      <CubeSegmentedBar
        segments={[{ color: 'fill-chart-1', colCount: 1 }]}
        rounded
      />,
    )

    expect(getAttrs(getRects(container)[0])).toEqual({
      width: '200',
      x: '0',
      rx: '5',
    })
    expect(container.querySelector('style')).not.toBeInTheDocument()
  })

  it('uses the width prop instead of the parent width', () => {
    const { container } = render(
      <CubeSegmentedBar segments={segments} width={400} />,
    )

    expect(container.querySelector('svg')).toHaveAttribute('width', '400')
    expect(getAttrs(getRects(container)[2])).toMatchObject({ width: '200' })
  })

  it('throws when the width is not positive', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      render(<CubeSegmentedBar segments={segments} width={0} />),
    ).toThrow('width must be greater than 0')

    vi.restoreAllMocks()
  })

  it('applies paddingX and barMarginTop', () => {
    const { container } = render(
      <CubeSegmentedBar segments={segments} paddingX={10} barMarginTop={4} />,
    )

    expect(container.querySelector('svg')).toHaveAttribute('height', '13')
    const [outer, bar] = Array.from(container.querySelectorAll('g'))
    expect(outer).toHaveAttribute('transform', 'translate(10, 0)')
    expect(bar).toHaveAttribute('transform', 'translate(0, 4)')
    // 200px minus 10px padding on each side.
    expect(getAttrs(getRects(container)[2])).toMatchObject({ width: '90' })
  })

  it('renders children below the bar with the bar width', () => {
    const { container } = render(
      <CubeSegmentedBar
        segments={segments}
        childrenDimensions={{ height: 20, marginTop: 6 }}
      >
        {(barWidth) => <text>Width {barWidth}</text>}
      </CubeSegmentedBar>,
    )

    expect(container.querySelector('svg')).toHaveAttribute('height', '35')
    const label = screen.getByText('Width 200')
    expect(label.parentElement).toHaveAttribute('transform', 'translate(0, 15)')
  })

  it('renders the overlay with the bar width and SVG height', () => {
    render(
      <CubeSegmentedBar
        segments={segments}
        overlay={(barWidth, svgHeight) => (
          <text>
            Overlay {barWidth} x {svgHeight}
          </text>
        )}
      />,
    )

    expect(screen.getByText('Overlay 200 x 9')).toBeInTheDocument()
  })

  it('calls the mouse callbacks with the segment index', async () => {
    const user = userEvent.setup()
    const onMouseEnterSegment = vi.fn()
    const onMouseLeaveSegment = vi.fn()
    const { container } = render(
      <CubeSegmentedBar
        segments={segments}
        onMouseEnterSegment={onMouseEnterSegment}
        onMouseLeaveSegment={onMouseLeaveSegment}
      />,
    )

    const rect = getRects(container)[1]!
    await user.hover(rect)
    expect(onMouseEnterSegment).toHaveBeenCalledWith(1, expect.anything())

    await user.unhover(rect)
    expect(onMouseLeaveSegment).toHaveBeenCalledWith(1, expect.anything())
  })

  it("shows a segment's hover content in a tooltip", async () => {
    const user = userEvent.setup()
    const { container } = render(
      <CubeSegmentedBar
        segments={[
          {
            color: 'fill-chart-1',
            colCount: 1,
            hoverContent: { message: 'Running: 3' },
          },
          { color: 'fill-chart-2', colCount: 1 },
        ]}
      />,
    )

    const rect = getRects(container)[0]!
    await user.hover(rect)
    expect(screen.getAllByText('Running: 3').length).toBeGreaterThan(0)

    await user.unhover(rect)
    expect(screen.queryByText('Running: 3')).not.toBeInTheDocument()
  })

  it('renders the skeleton', () => {
    const { container } = render(<CubeSegmentedBar.Skeleton />)

    expect(container.firstChild).toHaveClass('cube-skeleton', 'h-[9px]')
  })

  it('has no axe violations', async () => {
    const { container } = render(<CubeSegmentedBar segments={segments} />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
