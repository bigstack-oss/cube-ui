import type { PropsWithChildren } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeInlineNotification } from './CubeInlineNotification'

const link = { text: 'Go to the page', href: '/page' }

const LinkContainer = (props: PropsWithChildren) => (
  <span data-testid="link-container">{props.children}</span>
)

describe('CubeInlineNotification', () => {
  it('renders the title and content', () => {
    render(
      <CubeInlineNotification title="Notification title">
        Content text goes here.
      </CubeInlineNotification>,
    )

    expect(screen.getByText('Notification title')).toBeInTheDocument()
    expect(screen.getByText('Content text goes here.')).toBeInTheDocument()
  })

  it.each([
    ['neutral', 'border-primary', 0],
    ['positive', 'border-status-positive', 1],
    ['warning', 'border-status-warning', 1],
    ['error', 'border-status-negative', 1],
  ] as const)(
    'styles the %s type and shows its icon (neutral has none)',
    (type, borderClass, iconCount) => {
      const { container } = render(
        <CubeInlineNotification type={type} isClosable={false}>
          Content
        </CubeInlineNotification>,
      )

      expect(container.firstChild).toHaveClass(borderClass)
      expect(container.querySelectorAll('svg')).toHaveLength(iconCount)
    },
  )

  it('renders the link', () => {
    render(<CubeInlineNotification link={link}>Content</CubeInlineNotification>)

    expect(
      screen.getByRole('link', { name: 'Go to the page' }),
    ).toHaveAttribute('href', '/page')
  })

  it('wraps the link in its Container', () => {
    render(
      <CubeInlineNotification link={{ ...link, Container: <LinkContainer /> }}>
        Content
      </CubeInlineNotification>,
    )

    expect(screen.getByTestId('link-container')).toContainElement(
      screen.getByRole('link', { name: 'Go to the page' }),
    )
  })

  it('calls onClose and hides itself when the close icon is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <CubeInlineNotification onClose={onClose}>
        Content
      </CubeInlineNotification>,
    )

    await user.click(container.querySelectorAll('svg').item(0))

    expect(onClose).toHaveBeenCalledOnce()
    expect(container.firstChild).toHaveClass('hidden')
  })

  it('renders no close icon when isClosable is false', () => {
    const { container } = render(
      <CubeInlineNotification isClosable={false}>
        Content
      </CubeInlineNotification>,
    )

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders the skeleton instead of the content while loading', () => {
    const { container } = render(
      <CubeInlineNotification
        type="positive"
        title="Notification title"
        link={link}
        isLoading
        skeletonClassName="mt-4"
      >
        Content
      </CubeInlineNotification>,
    )

    expect(screen.queryByText('Notification title')).not.toBeInTheDocument()
    expect(container.firstChild).toHaveClass('mt-4')
    // icon, title, content, link, close
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(5)
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(<CubeInlineNotification.Skeleton />)

    // the close placeholder is always shown
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(1)
  })

  it('merges className onto the container', () => {
    const { container } = render(
      <CubeInlineNotification className="mt-4">Content</CubeInlineNotification>,
    )

    expect(container.firstChild).toHaveClass('mt-4', 'rounded-[5px]')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeInlineNotification
        type="warning"
        title="Notification title"
        link={link}
      >
        Content text goes here.
      </CubeInlineNotification>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
