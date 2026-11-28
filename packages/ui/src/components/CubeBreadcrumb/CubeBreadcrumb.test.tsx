import type { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeBreadcrumb } from './CubeBreadcrumb'

const Wrapper = (props: PropsWithChildren<{ testId: string }>) => (
  <span data-testid={props.testId}>{props.children}</span>
)

describe('CubeBreadcrumb', () => {
  it('renders each item label', () => {
    render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item label="Home" href="/" />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Current Page')).toBeInTheDocument()
  })

  it('renders an item with href as a link', () => {
    render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item label="Home" href="/home" />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/home',
    )
  })

  it('renders an item without href, onClick or itemContainer as plain text', () => {
    render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item label="Home" href="/home" />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    expect(
      screen.queryByRole('link', { name: 'Current Page' }),
    ).not.toBeInTheDocument()
    expect(screen.getByText('Current Page')).toHaveClass('text-functional-text')
  })

  it('calls onClick when a clickable item is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item label="Home" onClick={onClick} />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    await user.click(screen.getByText('Home'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('wraps the item link in its itemContainer', () => {
    render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item
          label="Home"
          onClick={vi.fn()}
          itemContainer={{ Component: Wrapper, props: { testId: 'wrapper' } }}
        />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    expect(screen.getByTestId('wrapper')).toContainElement(
      screen.getByText('Home'),
    )
  })

  it('hides the separator after the last item', () => {
    const { container } = render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item label="Home" href="/" />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    const separators = container.querySelectorAll('svg')
    expect(separators).toHaveLength(2)
    separators.forEach((separator) =>
      expect(separator).toHaveClass('group-last:hidden'),
    )
  })

  it('merges className onto the container', () => {
    const { container } = render(
      <CubeBreadcrumb className="mt-4">
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    expect(container.firstChild).toHaveClass('mt-4', 'flex')
  })

  it('warns when there are more than 5 items', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(
      <CubeBreadcrumb>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <CubeBreadcrumb.Item key={n} label={`Item ${n}`} />
        ))}
      </CubeBreadcrumb>,
    )

    expect(warn).toHaveBeenCalledWith(
      'CubeBreadcrumb: The number of items in the breadcrumb should not exceed 5.',
    )
    warn.mockRestore()
  })

  it.each([
    [2, 2],
    [7, 5],
  ])(
    'renders a skeleton for %i items with %i placeholders while loading',
    (itemCount, expected) => {
      vi.spyOn(console, 'warn').mockImplementation(() => {})
      const { container } = render(
        <CubeBreadcrumb isLoading>
          {Array.from({ length: itemCount }, (_, i) => (
            <CubeBreadcrumb.Item key={i} label={`Item ${i}`} />
          ))}
        </CubeBreadcrumb>,
      )

      expect(screen.queryByText('Item 0')).not.toBeInTheDocument()
      expect(container.querySelectorAll('.group')).toHaveLength(expected)
      vi.restoreAllMocks()
    },
  )

  it('renders 5 skeleton placeholders for a single child while loading', () => {
    const { container } = render(
      <CubeBreadcrumb isLoading>
        <CubeBreadcrumb.Item label="Only" />
      </CubeBreadcrumb>,
    )

    expect(container.querySelectorAll('.group')).toHaveLength(5)
  })

  it('renders the skeleton on its own with a custom length', () => {
    const { container } = render(<CubeBreadcrumb.Skeleton length={3} />)

    expect(container.querySelectorAll('.group')).toHaveLength(3)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeBreadcrumb>
        <CubeBreadcrumb.Item label="Home" href="/home" />
        <CubeBreadcrumb.Item label="Section" href="/section" />
        <CubeBreadcrumb.Item label="Current Page" />
      </CubeBreadcrumb>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeBreadcrumb test IDs', () => {
  it('tags the bar and each item, keyed by its label unless it passes data-key', async () => {
    const user = userEvent.setup()
    const onNetwork = vi.fn()
    render(
      <CubeBreadcrumb data-testid="crumbs">
        <CubeBreadcrumb.Item label="Projects" href="/projects" />
        <CubeBreadcrumb.Item
          label="web-net"
          data-key="n-1"
          onClick={onNetwork}
        />
        <CubeBreadcrumb.Item label="Details" />
      </CubeBreadcrumb>,
    )

    expect(screen.getByTestId('crumbs')).toBeInTheDocument()
    const items = screen.getAllByTestId('crumbs-item')
    expect(items.map((i) => i.getAttribute('data-key'))).toEqual([
      'Projects',
      'n-1',
      'Details',
    ])
    expect(items[0]).toBe(screen.getByRole('link', { name: 'Projects' }))
    expect(items[2]).toHaveTextContent('Details')
    const network = items[1]
    if (!network) throw new Error('network item not found')
    await user.click(network)
    expect(onNetwork).toHaveBeenCalledOnce()
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      const { container } = render(
        <CubeBreadcrumb data-testid={testId}>
          <CubeBreadcrumb.Item label="Projects" href="/projects" />
          <CubeBreadcrumb.Item label="Details" />
        </CubeBreadcrumb>,
      )

      expect(container.querySelector('[data-testid]')).toBeNull()
      expect(container.querySelector('[data-key]')).toBeNull()
    },
  )
})
