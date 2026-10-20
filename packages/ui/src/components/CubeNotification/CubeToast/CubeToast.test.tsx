import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeToast } from './CubeToast'

const baseToast = {
  id: 'toast-1',
  message: 'Your profile was updated successfully.',
  time: '2026/10/20 09:00',
}

describe('CubeToast', () => {
  it('renders the message and time', () => {
    render(<CubeToast {...baseToast} onToastClose={vi.fn()} />)

    expect(
      screen.getByText('Your profile was updated successfully.'),
    ).toBeInTheDocument()
    expect(screen.getByText('2026/10/20 09:00')).toBeInTheDocument()
  })

  it('renders the title with the type icon', () => {
    const { container } = render(
      <CubeToast
        {...baseToast}
        type="positive"
        title="Success!"
        onToastClose={vi.fn()}
      />,
    )

    expect(screen.getByText('Success!')).toBeInTheDocument()
    // type icon + close icon
    expect(container.querySelectorAll('svg')).toHaveLength(2)
  })

  it('renders no type icon without a title', () => {
    const { container } = render(
      <CubeToast {...baseToast} type="positive" onToastClose={vi.fn()} />,
    )

    // close icon only
    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })

  it.each([
    ['neutral', 'border-primary'],
    ['positive', 'border-status-positive'],
    ['warning', 'border-status-warning'],
    ['error', 'border-status-negative'],
  ] as const)('styles the %s type', (type, borderClass) => {
    const { container } = render(
      <CubeToast {...baseToast} type={type} onToastClose={vi.fn()} />,
    )

    expect(container.firstChild).toHaveClass(borderClass)
  })

  it('renders the link', () => {
    render(
      <CubeToast
        {...baseToast}
        link={{ text: 'View Profile', href: '/profile' }}
        onToastClose={vi.fn()}
      />,
    )

    expect(screen.getByRole('link', { name: 'View Profile' })).toHaveAttribute(
      'href',
      '/profile',
    )
  })

  it('calls onToastClose with its id when the close icon is clicked', async () => {
    const user = userEvent.setup()
    const onToastClose = vi.fn()
    const { container } = render(
      <CubeToast {...baseToast} onToastClose={onToastClose} />,
    )

    await user.click(container.querySelectorAll('svg').item(0))

    expect(onToastClose).toHaveBeenCalledWith('toast-1')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeToast
        {...baseToast}
        type="warning"
        title="Almost there!"
        link={{ text: 'Upgrade Now', href: '/upgrade' }}
        onToastClose={vi.fn()}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
