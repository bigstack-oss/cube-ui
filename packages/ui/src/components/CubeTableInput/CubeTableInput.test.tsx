import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeTableInput } from './CubeTableInput'

describe('CubeTableInput', () => {
  it('renders an input with native props', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <CubeTableInput
        aria-label="Page"
        placeholder="Page"
        onChange={onChange}
      />,
    )

    const input = screen.getByRole('textbox', { name: 'Page' })
    expect(input).toHaveAttribute('placeholder', 'Page')
    await user.type(input, '3')
    expect(onChange).toHaveBeenCalled()
  })

  it('forwards its ref to the input', () => {
    const ref = createRef<HTMLInputElement>()
    render(<CubeTableInput aria-label="Page" ref={ref} />)

    expect(ref.current).toBe(screen.getByRole('textbox'))
  })

  it('uses the given id, or a generated one', () => {
    const { rerender } = render(<CubeTableInput aria-label="Page" id="page" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'page')

    rerender(<CubeTableInput aria-label="Page" />)
    expect(screen.getByRole('textbox').id).not.toBe('')
  })

  it('shows the error border and icon when errorMessage is set', () => {
    const { container } = render(
      <CubeTableInput aria-label="Page" errorMessage="Out of range" />,
    )

    expect(screen.getByRole('textbox')).toHaveClass('border-status-negative')
    expect(container.querySelector('svg')).toHaveClass('text-status-negative')
  })

  it('keeps an empty icon slot without an error', () => {
    const { container } = render(<CubeTableInput aria-label="Page" />)

    expect(container.querySelector('.size-4')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders no icon slot when hideErrorIcon is true', () => {
    const { container } = render(
      <CubeTableInput
        aria-label="Page"
        errorMessage="Out of range"
        hideErrorIcon
      />,
    )

    expect(screen.getByRole('textbox')).toHaveClass('border-status-negative')
    expect(container.querySelector('.size-4')).not.toBeInTheDocument()
  })

  it('disables the input', () => {
    render(<CubeTableInput aria-label="Page" disabled />)

    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('renders the skeleton instead of the input while loading', () => {
    const { container } = render(<CubeTableInput aria-label="Page" isLoading />)

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(container.querySelector('.cube-skeleton')).toBeInTheDocument()
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(<CubeTableInput.Skeleton />)

    expect(container.querySelector('.cube-skeleton')).toBeInTheDocument()
  })

  it('merges className onto the input', () => {
    render(<CubeTableInput aria-label="Page" className="w-[59px]" />)

    expect(screen.getByRole('textbox')).toHaveClass('w-[59px]', 'rounded-[6px]')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeTableInput aria-label="Page" errorMessage="Out of range" />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeTableInput test IDs', () => {
  it('puts data-testid on the input itself', () => {
    render(<CubeTableInput data-testid="qty" />)

    expect(screen.getByTestId('qty')).toBe(screen.getByRole('textbox'))
  })

  it('tags the error icon, and the tooltip it shows on hover', async () => {
    const user = userEvent.setup()
    render(<CubeTableInput data-testid="qty" errorMessage="Too large" />)

    await user.hover(screen.getByTestId('qty-error'))

    expect(screen.getByTestId('qty-tooltip')).toHaveTextContent('Too large')
  })

  it('has no error icon without an error, or when it is hidden', () => {
    const { rerender } = render(<CubeTableInput data-testid="qty" />)
    expect(screen.queryByTestId('qty-error')).not.toBeInTheDocument()

    rerender(
      <CubeTableInput data-testid="qty" errorMessage="Bad" hideErrorIcon />,
    )
    expect(screen.queryByTestId('qty-error')).not.toBeInTheDocument()
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      const { container } = render(
        <CubeTableInput data-testid={testId} errorMessage="Too large" />,
      )

      expect(container.querySelector('[data-testid]')).toBeNull()
    },
  )
})
