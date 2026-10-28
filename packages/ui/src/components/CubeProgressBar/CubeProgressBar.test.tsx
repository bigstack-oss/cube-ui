import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeProgressBar } from './CubeProgressBar'
import type { CubeProgressBarRef } from './cubeProgressBarTypes'

// jsdom has no ResizeObserver. This stub reports a fixed bar width as soon as
// the bar is observed, like the browser does on first observe.
let barWidth = 200
class ResizeObserverStub {
  constructor(private callback: ResizeObserverCallback) {}
  observe() {
    this.callback(
      [{ contentRect: { width: barWidth } } as ResizeObserverEntry],
      this as unknown as ResizeObserver,
    )
  }
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

// The fill is the bar's first child.
const getFill = (container: HTMLElement) =>
  container.querySelector('.relative > div') as HTMLElement

describe('CubeProgressBar', () => {
  beforeEach(() => {
    barWidth = 200
  })

  it.each([
    [0, '0%'],
    [0.4, '1%'],
    [49.6, '50%'],
    [120, '120%'],
  ])('shows %s as %s', (progress, text) => {
    render(<CubeProgressBar progress={progress} color="bg-chart-1" />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('sizes the fill from the progress and applies the color', () => {
    const { container } = render(
      <CubeProgressBar progress={50} color="bg-chart-3" />,
    )

    const fill = getFill(container)
    expect(fill).toHaveStyle({ width: '50%' })
    expect(fill).toHaveClass('bg-chart-3', 'rounded-l-full')
  })

  it('widens a fill too narrow to show its rounded end', () => {
    barWidth = 100
    const { container } = render(
      <CubeProgressBar progress={1} color="bg-chart-1" />,
    )

    expect(getFill(container)).toHaveStyle({ width: '4%' })
  })

  it('rounds both ends of a full bar', () => {
    const { container } = render(
      <CubeProgressBar progress={100} color="bg-chart-1" />,
    )

    expect(getFill(container)).toHaveClass('rounded-full')
    expect(getFill(container)).toHaveStyle({ width: '100%' })
  })

  it('warns about a negative progress', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<CubeProgressBar progress={-1} color="bg-chart-1" />)

    expect(warn).toHaveBeenCalledWith(
      'progress value should not be less than 0',
    )
    warn.mockRestore()
  })

  it('exposes the bar width through its ref', () => {
    const ref = createRef<CubeProgressBarRef>()
    render(<CubeProgressBar ref={ref} progress={50} color="bg-chart-1" />)

    expect(ref.current?.barWidth).toBe(200)
  })

  it('renders children inside the bar', () => {
    const { container } = render(
      <CubeProgressBar progress={50} color="bg-chart-1">
        <span data-testid="extra" />
      </CubeProgressBar>,
    )

    expect(container.querySelector('.relative')).toContainElement(
      screen.getByTestId('extra'),
    )
  })

  it('merges className onto the container', () => {
    const { container } = render(
      <CubeProgressBar progress={50} color="bg-chart-1" className="w-[90px]" />,
    )

    expect(container.firstChild).toHaveClass('w-[90px]', 'inline-flex')
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(
      <CubeProgressBar.Skeleton className="w-[90px]" />,
    )

    expect(container.firstChild).toHaveClass('w-[90px]')
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(2)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeProgressBar progress={50} color="bg-chart-1" />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
