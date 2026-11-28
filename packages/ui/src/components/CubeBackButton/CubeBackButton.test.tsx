import type { PropsWithChildren } from 'react'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import i18n from '@i18n/i18n'
import { CubeBackButton } from './CubeBackButton'

// jsdom has no ResizeObserver; `.BarChart`'s usage bar observes its width.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

const getBackButton = () => screen.getByRole('button', { name: 'Back' })

const countSkeletons = (container: HTMLElement) =>
  container.querySelectorAll('.cube-skeleton').length

const FullBackButton = (props: { isLoading?: boolean }) => (
  <CubeBackButton
    isLoading={props.isLoading}
    href="/list"
    titleRightContent={
      <>
        <CubeBackButton.Details>Detail text</CubeBackButton.Details>
        <CubeBackButton.Divider />
        <CubeBackButton.Link href="/monitor">Monitor</CubeBackButton.Link>
      </>
    }
    titleBottomContent={
      <>
        <CubeBackButton.BarChart label="CPU" progress={12} />
        <CubeBackButton.Divider />
        <CubeBackButton.BarChart label="RAM" progress={34} />
      </>
    }
  >
    Page Title
  </CubeBackButton>
)

describe('CubeBackButton', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the title and a named back button inside a link', () => {
    render(<CubeBackButton href="/list">Page Title</CubeBackButton>)

    expect(screen.getByText('Page Title')).toHaveClass(
      'primary-h3',
      'text-functional-title',
    )
    expect(getBackButton().closest('a')).toHaveAttribute('href', '/list')
  })

  it('calls onClick when the back button is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CubeBackButton onClick={onClick}>Page Title</CubeBackButton>)

    await user.click(getBackButton())

    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('warns when there is no href, onClick or container', () => {
    render(<CubeBackButton>Page Title</CubeBackButton>)

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('CubeBackButton'),
    )
  })

  it('renders the button inside a custom container', () => {
    const Container = (props: PropsWithChildren<{ to: string }>) => (
      <a href={props.to} data-testid="container">
        {props.children}
      </a>
    )
    render(
      <CubeBackButton
        backButtonContainer={{ Component: Container, props: { to: '/home' } }}
      >
        Page Title
      </CubeBackButton>,
    )

    const container = screen.getByTestId('container')
    expect(container).toHaveAttribute('href', '/home')
    expect(container).toContainElement(getBackButton())
    expect(console.warn).not.toHaveBeenCalled()
  })

  it('renders the right and bottom content with its members', () => {
    const { container } = render(<FullBackButton />)

    expect(screen.getByText('Detail text')).toHaveClass(
      'primary-body1',
      'text-functional-text-light',
    )
    expect(screen.getByRole('link', { name: 'Monitor' })).toHaveAttribute(
      'href',
      '/monitor',
    )
    expect(screen.getByText('CPU')).toBeInTheDocument()
    expect(screen.getByText('RAM')).toBeInTheDocument()
    expect(
      container.querySelectorAll('.bg-functional-border-darker'),
    ).toHaveLength(2)
  })

  it('aligns to the top only when there is bottom content', () => {
    const { container, rerender } = render(
      <CubeBackButton href="#">Page Title</CubeBackButton>,
    )
    expect(container.firstChild).toHaveClass('items-center')
    expect(container.firstChild).not.toHaveClass('items-start')

    rerender(<FullBackButton />)
    expect(container.firstChild).toHaveClass('items-start')
    expect(container.firstChild).not.toHaveClass('items-center')
  })

  it('shows skeletons for every part while loading', () => {
    const { container } = render(<FullBackButton isLoading />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    expect(screen.queryByText('Page Title')).not.toBeInTheDocument()
    expect(screen.queryByText('Detail text')).not.toBeInTheDocument()
    expect(screen.queryByText('Monitor')).not.toBeInTheDocument()
    expect(screen.queryByText('CPU')).not.toBeInTheDocument()
    // Back button, title, details, link, and 3 per bar chart.
    expect(countSkeletons(container)).toBe(4 + 2 * 3)
    // Dividers stay visible while loading.
    expect(
      container.querySelectorAll('.bg-functional-border-darker'),
    ).toHaveLength(2)
  })

  it('translates the back button label in zh-TW', async () => {
    await act(() => i18n.changeLanguage('zh-TW'))
    render(<CubeBackButton href="#">Page Title</CubeBackButton>)

    expect(screen.getByRole('button', { name: '返回' })).toBeInTheDocument()

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const { container } = render(<FullBackButton />)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeBackButton test IDs', () => {
  const renderHeader = (testId?: string) => {
    const onBack = vi.fn()
    render(
      <CubeBackButton
        data-testid={testId}
        onClick={onBack}
        titleRightContent={
          <>
            <CubeBackButton.Details>3 subnets</CubeBackButton.Details>
            <CubeBackButton.Link href="/docs">Docs</CubeBackButton.Link>
          </>
        }
      >
        web-net
      </CubeBackButton>,
    )
    return onBack
  }

  it('tags the header, the back button, the title, the details and the link', async () => {
    const user = userEvent.setup()
    const onBack = renderHeader('net-header')

    expect(screen.getByTestId('net-header')).toBeInTheDocument()
    expect(screen.getByTestId('net-header-title')).toHaveTextContent('web-net')
    expect(screen.getByTestId('net-header-details')).toHaveTextContent(
      '3 subnets',
    )
    expect(screen.getByTestId('net-header-link')).toBe(
      screen.getByRole('link', { name: 'Docs' }),
    )
    const back = screen.getByTestId('net-header-back')
    expect(back.tagName).toBe('BUTTON')
    await user.click(back)
    expect(onBack).toHaveBeenCalledOnce()
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      renderHeader(testId)

      expect(document.body.querySelector('[data-testid]')).toBeNull()
    },
  )
})
