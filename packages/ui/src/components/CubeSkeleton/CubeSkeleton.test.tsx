import { render } from '@testing-library/react'
import { CubeSkeleton } from './CubeSkeleton'

describe('CubeSkeleton', () => {
  it('renders a placeholder element with the skeleton animation class', () => {
    const { container } = render(<CubeSkeleton />)

    expect(container.firstChild).toHaveClass('animate-cos-skeleton')
  })

  it('merges a custom className', () => {
    const { container } = render(<CubeSkeleton className="w-10" />)

    expect(container.firstChild).toHaveClass('animate-cos-skeleton', 'w-10')
  })

  it('applies an inline style when provided', () => {
    const { container } = render(<CubeSkeleton style={{ width: 40 }} />)

    expect(container.firstChild).toHaveStyle({ width: '40px' })
  })
})
