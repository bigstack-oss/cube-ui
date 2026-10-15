import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeIconText } from './CubeIconText'
import { cubeIconTextTypes } from './cubeIconTextTypes'

describe('CubeIconText', () => {
  it('renders its text', () => {
    render(<CubeIconText type="primary">Tag</CubeIconText>)

    expect(screen.getByText('Tag')).toBeInTheDocument()
  })

  it.each(cubeIconTextTypes)('renders the %s type', (type) => {
    render(<CubeIconText type={type}>Tag</CubeIconText>)

    expect(screen.getByText('Tag')).toHaveClass('rounded', 'whitespace-nowrap')
  })

  it('applies the filled background for the primary type', () => {
    render(<CubeIconText type="primary">Tag</CubeIconText>)

    expect(screen.getByText('Tag')).toHaveClass(
      'bg-cosmos-primary',
      'text-grey-0',
    )
  })

  it('applies the outline styles for the primary-outline type', () => {
    render(<CubeIconText type="primary-outline">Tag</CubeIconText>)

    expect(screen.getByText('Tag')).toHaveClass(
      'border-cosmos-primary',
      'bg-grey-0',
      'text-cosmos-primary',
    )
  })

  it('merges className onto the element', () => {
    render(
      <CubeIconText type="primary" className="mt-4">
        Tag
      </CubeIconText>,
    )

    expect(screen.getByText('Tag')).toHaveClass('mt-4', 'rounded')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeIconText type="primary">Tag</CubeIconText>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
