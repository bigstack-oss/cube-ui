import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeNagging } from './CubeNagging'

const link = { text: 'Call to action', href: '/action' }

describe('CubeNagging', () => {
  it('renders the title', () => {
    render(<CubeNagging type="error" variant="sidebar" title="Nagging Title" />)

    expect(screen.getByText('Nagging Title')).toBeInTheDocument()
  })

  it.each([
    ['error', 'border-status-negative', 'text-status-negative'],
    ['warning', 'border-status-warning', 'text-status-warning'],
  ] as const)(
    'styles the %s type border and icon',
    (type, borderClass, iconClass) => {
      const { container } = render(
        <CubeNagging type={type} variant="sidebar" title="Nagging Title" />,
      )

      expect(container.firstChild).toHaveClass(borderClass)
      expect(container.querySelector('svg')).toHaveClass(iconClass)
    },
  )

  it('renders a single description as text', () => {
    render(
      <CubeNagging
        type="error"
        variant="sidebar"
        title="Nagging Title"
        description="Text goes here."
      />,
    )

    expect(screen.getByText('Text goes here.')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders a one-item description array as text', () => {
    render(
      <CubeNagging
        type="error"
        variant="sidebar"
        title="Nagging Title"
        description={['Only one']}
      />,
    )

    expect(screen.getByText('Only one')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('renders a multi-item description array as a list', () => {
    render(
      <CubeNagging
        type="error"
        variant="sidebar"
        title="Nagging Title"
        description={['First', 'Second', 'Third']}
      />,
    )

    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('renders the sidebar link below the description', () => {
    render(
      <CubeNagging
        type="error"
        variant="sidebar"
        title="Nagging Title"
        description="Text goes here."
        link={link}
      />,
    )

    const description = screen.getByText('Text goes here.')
    const anchor = screen.getByRole('link', { name: 'Call to action' })
    expect(anchor).toHaveAttribute('href', '/action')
    expect(
      description.compareDocumentPosition(anchor) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
  })

  it('renders the top link next to the title, before the description', () => {
    render(
      <CubeNagging
        type="error"
        variant="top"
        title="Nagging Title"
        description="Text goes here."
        link={link}
      />,
    )

    const description = screen.getByText('Text goes here.')
    const anchor = screen.getByRole('link', { name: 'Call to action' })
    expect(screen.getByText('Nagging Title').parentElement).toContainElement(
      anchor,
    )
    expect(
      description.compareDocumentPosition(anchor) &
        Node.DOCUMENT_POSITION_PRECEDING,
    ).toBeTruthy()
  })

  it('renders no close icon without onClose', () => {
    const { container } = render(
      <CubeNagging type="error" variant="top" title="Nagging Title" />,
    )

    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })

  it('calls onClose when the close icon is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <CubeNagging
        type="error"
        variant="top"
        title="Nagging Title"
        onClose={onClose}
      />,
    )

    const icons = container.querySelectorAll('svg')
    expect(icons).toHaveLength(2)
    await user.click(icons.item(1))

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('merges className and titleClassName', () => {
    const { container } = render(
      <CubeNagging
        type="error"
        variant="sidebar"
        title="Nagging Title"
        className="mt-4"
        titleClassName="line-clamp-2"
      />,
    )

    expect(container.firstChild).toHaveClass('mt-4', 'rounded-md')
    expect(screen.getByText('Nagging Title')).toHaveClass(
      'line-clamp-2',
      'font-semibold',
    )
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeNagging
        type="warning"
        variant="sidebar"
        title="Nagging Title"
        description={['First', 'Second']}
        link={link}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
