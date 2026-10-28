import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeProgressBarChart } from './CubeProgressBarChart'

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

// The bar fill is the bar's first child.
const getFill = (container: HTMLElement) =>
  container.querySelector('.relative > div')

describe('CubeProgressBarChart', () => {
  it('renders the title, the bar and its percentage', () => {
    const { container } = render(
      <CubeProgressBarChart title="Chart Title" progress={34} />,
    )

    expect(screen.getByText('Chart Title')).toBeInTheDocument()
    expect(screen.getByText('34%')).toBeInTheDocument()
    expect(getFill(container)).toHaveStyle({ width: '34%' })
  })

  it('renders the subtext next to the title', () => {
    render(
      <CubeProgressBarChart
        title="Chart Title"
        subtext="Subtext"
        progress={50}
      />,
    )

    expect(
      screen.getByText('Subtext').previousElementSibling,
    ).toHaveTextContent('Chart Title')
  })

  it.each([
    [50, 'bg-chart-1'],
    [79, 'bg-status-warning'],
    [85, 'bg-status-negative'],
  ])('colors %i%% like the resource usage bar (%s)', (progress, colorClass) => {
    const { container } = render(
      <CubeProgressBarChart title="Chart Title" progress={progress} />,
    )

    expect(getFill(container)).toHaveClass(colorClass)
  })

  it('passes className to the bar, not the chart', () => {
    const { container } = render(
      <CubeProgressBarChart
        title="Chart Title"
        progress={50}
        className="w-[180px]"
      />,
    )

    expect(container.firstChild).not.toHaveClass('w-[180px]')
    expect(container.querySelector('.inline-flex')).toHaveClass('w-[180px]')
  })

  it('renders the skeleton instead of the bar while loading, keeping the title', () => {
    const { container } = render(
      <CubeProgressBarChart
        title="Chart Title"
        progress={50}
        isLoading
        skeletonClassName="w-[180px]"
      />,
    )

    expect(screen.getByText('Chart Title')).toBeInTheDocument()
    expect(screen.queryByText('50%')).not.toBeInTheDocument()
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(2)
    expect(
      container.querySelector('.cube-skeleton')?.parentElement,
    ).toHaveClass('w-[180px]')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeProgressBarChart
        title="Chart Title"
        subtext="Subtext"
        progress={50}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
