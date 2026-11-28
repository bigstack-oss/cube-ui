import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeCheckbox } from './CubeCheckbox'

describe('CubeCheckbox', () => {
  it('renders unchecked by default', () => {
    render(<CubeCheckbox label="Accept terms" />)

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).not.toBeChecked()
  })

  it('renders checked when defaultChecked is true', () => {
    render(<CubeCheckbox label="Accept terms" defaultChecked />)

    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeChecked()
  })

  it('toggles its own state when uncontrolled', async () => {
    const user = userEvent.setup()
    render(<CubeCheckbox label="Accept terms" />)

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('respects the controlled checked prop instead of toggling itself', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CubeCheckbox label="Accept terms" checked={false} onChange={onChange} />,
    )

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    await user.click(checkbox)

    expect(onChange).toHaveBeenCalledOnce()
    expect(checkbox).not.toBeChecked()
  })

  it('renders as unchecked, not indeterminate, when checked is null', () => {
    render(
      <CubeCheckbox label="Accept terms" checked={null} onChange={vi.fn()} />,
    )

    expect(
      screen.getByRole('checkbox', { name: 'Accept terms' }),
    ).not.toBeChecked()
  })

  it('does not call onChange when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CubeCheckbox label="Accept terms" onChange={onChange} disabled />)

    const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' })
    await user.click(checkbox)

    expect(onChange).not.toHaveBeenCalled()
    expect(checkbox).toBeDisabled()
  })

  it('renders its skeleton instead of the real checkbox while loading', () => {
    render(<CubeCheckbox label="Accept terms" isLoading />)

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeCheckbox label="Accept terms" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeCheckbox test IDs', () => {
  it('puts data-testid on the visible label, which a test can click', async () => {
    const user = userEvent.setup()
    render(
      <CubeCheckbox
        label="Accept the terms"
        name="group"
        data-testid="terms"
      />,
    )

    const target = screen.getByTestId('terms')
    expect(target.tagName).toBe('LABEL')
    expect(screen.getByRole('checkbox', { hidden: true })).not.toHaveAttribute(
      'data-testid',
    )
    await user.click(target)
    expect(screen.getByRole('checkbox', { hidden: true })).toBeChecked()
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      const { container } = render(
        <CubeCheckbox
          label="Accept the terms"
          name="group"
          data-testid={testId}
        />,
      )

      expect(container.querySelector('[data-testid]')).toBeNull()
    },
  )
})

describe('CubeCheckbox data-key', () => {
  it('puts data-key on the label next to its test ID', () => {
    render(<CubeCheckbox label="web-net" data-testid="net" data-key="n-1" />)

    expect(screen.getByTestId('net')).toHaveAttribute('data-key', 'n-1')
    expect(screen.getByRole('checkbox', { hidden: true })).not.toHaveAttribute(
      'data-key',
    )
  })
})
