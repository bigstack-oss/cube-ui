import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeRadioButton } from './CubeRadioButton'

describe('CubeRadioButton', () => {
  it('renders unchecked by default', () => {
    render(<CubeRadioButton label="Option A" />)

    expect(screen.getByRole('radio', { name: 'Option A' })).not.toBeChecked()
  })

  it('renders checked when defaultChecked is true', () => {
    render(<CubeRadioButton label="Option A" defaultChecked />)

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeChecked()
  })

  it('toggles its own state when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<CubeRadioButton label="Option A" />)

    const radio = screen.getByRole('radio', { name: 'Option A' })
    await user.click(radio)

    expect(radio).toBeChecked()
  })

  it('respects the controlled checked prop instead of toggling itself', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CubeRadioButton label="Option A" checked={false} onChange={onChange} />,
    )

    const radio = screen.getByRole('radio', { name: 'Option A' })
    await user.click(radio)

    expect(onChange).toHaveBeenCalledOnce()
    expect(radio).not.toBeChecked()
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CubeRadioButton label="Option A" onChange={onChange} disabled />)

    const radio = screen.getByRole('radio', { name: 'Option A' })
    await user.click(radio)

    expect(onChange).not.toHaveBeenCalled()
    expect(radio).toBeDisabled()
  })

  it('renders its skeleton instead of the real radio button while loading', () => {
    render(<CubeRadioButton label="Option A" isLoading />)

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeRadioButton label="Option A" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
