import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeResourceUsageBar } from './CubeResourceUsageBar'

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

const getFills = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('.relative > div'))

describe('CubeResourceUsageBar', () => {
  it.each([
    [0, 'bg-chart-1'],
    [50, 'bg-chart-1'],
    [51, 'bg-status-warning'],
    [80, 'bg-status-warning'],
    [81, 'bg-status-negative'],
    [150, 'bg-status-negative'],
  ])('colors %i%% with %s', (progress, colorClass) => {
    const { container } = render(<CubeResourceUsageBar progress={progress} />)

    expect(getFills(container)[0]).toHaveClass(colorClass)
  })

  it('shows no over-limit segment up to 100%', () => {
    const { container } = render(<CubeResourceUsageBar progress={100} />)

    expect(getFills(container)).toHaveLength(1)
  })

  it('adds an over-limit segment above 100%', () => {
    const { container } = render(<CubeResourceUsageBar progress={150} />)

    const [fill, overLimit] = getFills(container)
    expect(fill).toHaveStyle({ width: '100%' })
    expect(overLimit).toHaveClass('bg-status-over-limit', 'rounded-l-full')
    expect(overLimit).toHaveStyle({ width: '50%' })
    expect(screen.getByText('150%')).toBeInTheDocument()
  })

  it('fills the over-limit segment completely at 200% and above', () => {
    const { container } = render(<CubeResourceUsageBar progress={250} />)

    const overLimit = getFills(container)[1]
    expect(overLimit).toHaveClass('rounded-full')
    expect(overLimit).toHaveStyle({ width: '100%' })
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(<CubeResourceUsageBar.Skeleton />)

    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(2)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeResourceUsageBar progress={150} />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
