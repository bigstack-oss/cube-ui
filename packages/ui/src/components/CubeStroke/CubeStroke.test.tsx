import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeStroke } from './CubeStroke'

describe('CubeStroke', () => {
  it('renders as a separator', () => {
    render(<CubeStroke />)

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('applies the regular type classes by default', () => {
    render(<CubeStroke />)

    expect(screen.getByRole('separator')).toHaveClass(
      'border-functional-border-divider',
    )
  })

  it('applies the dot type classes', () => {
    render(<CubeStroke type="dot" />)

    expect(screen.getByRole('separator')).toHaveClass(
      'border-t-4',
      'border-dotted',
      'border-primary-50',
    )
  })

  it('applies a custom color class', () => {
    render(<CubeStroke color="border-primary-500" />)

    expect(screen.getByRole('separator')).toHaveClass('border-primary-500')
  })

  it('merges a custom className', () => {
    render(<CubeStroke className="my-4" />)

    expect(screen.getByRole('separator')).toHaveClass('my-4')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeStroke />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
