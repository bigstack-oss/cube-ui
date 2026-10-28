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
