import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeToggle } from './CubeToggle'

describe('CubeToggle', () => {
  it('exposes a switch role with the label as its accessible name', () => {
    render(
      <CubeToggle
        checked={false}
        label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    const toggle = screen.getByRole('switch', { name: 'Enable notifications' })
    expect(toggle).toBeInTheDocument()
    expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  it('exposes aria-label as the accessible name when there is no visible label', () => {
    render(
      <CubeToggle
        checked={false}
        aria-label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('switch', { name: 'Enable notifications' }),
    ).toBeInTheDocument()
  })

  it('renders the off track styles when checked is false', () => {
    render(
      <CubeToggle
        checked={false}
        label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    expect(
      screen.getByRole('switch', { name: 'Enable notifications' }),
    ).toHaveClass('bg-functional-disable-text')
  })

  it('renders the on track styles when checked is true', () => {
    render(
      <CubeToggle
        checked={true}
        label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    const toggle = screen.getByRole('switch', { name: 'Enable notifications' })
    expect(toggle).toHaveClass('bg-status-positive')
    expect(toggle).toHaveAttribute('aria-checked', 'true')
  })

  it('calls onCheckedChange with the toggled value when clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <CubeToggle
        checked={false}
        label="Enable notifications"
        onCheckedChange={onCheckedChange}
      />,
    )

    await user.click(
      screen.getByRole('switch', { name: 'Enable notifications' }),
    )

    expect(onCheckedChange).toHaveBeenCalledWith(true)
  })

  it('does not update its own UI until the caller changes checked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <CubeToggle
        checked={false}
        label="Enable notifications"
        onCheckedChange={onCheckedChange}
      />,
    )

    const toggle = screen.getByRole('switch', { name: 'Enable notifications' })
    await user.click(toggle)

    expect(onCheckedChange).toHaveBeenCalledOnce()
    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(toggle).toHaveClass('bg-functional-disable-text')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  it('calls onCheckedChange when the label text is clicked', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <CubeToggle
        checked={true}
        label="Enable notifications"
        onCheckedChange={onCheckedChange}
      />,
    )

    await user.click(screen.getByText('Enable notifications'))

    expect(onCheckedChange).toHaveBeenCalledWith(false)
  })

  it('does not call onCheckedChange when disabled', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <CubeToggle
        checked={false}
        label="Enable notifications"
        onCheckedChange={onCheckedChange}
        disabled
      />,
    )

    await user.click(
      screen.getByRole('switch', { name: 'Enable notifications' }),
    )
    await user.click(screen.getByText('Enable notifications'))

    expect(onCheckedChange).not.toHaveBeenCalled()
    expect(
      screen.getByRole('switch', { name: 'Enable notifications' }),
    ).toBeDisabled()
  })

  it('does not render a label element when no label is provided', () => {
    render(
      <CubeToggle
        checked={false}
        aria-label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    expect(screen.queryByText('Enable notifications')).not.toBeInTheDocument()
  })

  it('has no accessibility violations when a visible label is provided', async () => {
    const { container } = render(
      <CubeToggle
        checked={false}
        label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })

  it('has no accessibility violations when only aria-label is provided', async () => {
    const { container } = render(
      <CubeToggle
        checked={true}
        aria-label="Enable notifications"
        onCheckedChange={vi.fn()}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
