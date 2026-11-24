import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeInformation } from './CubeInformation'

const message =
  'Information that reminds users to keep something in mind, not a temporary notification.'

describe('CubeInformation', () => {
  it('renders the message in a light blue box', () => {
    const { container } = render(<CubeInformation>{message}</CubeInformation>)

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(container.firstChild).toHaveClass(
      'bg-blue-50',
      'text-dark-400',
      'primary-body3',
    )
  })

  it('shows no icon by default', () => {
    const { container } = render(<CubeInformation>{message}</CubeInformation>)

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('shows the information icon before the message when showIcon is set', () => {
    const { container } = render(
      <CubeInformation showIcon>{message}</CubeInformation>,
    )

    const icon = container.querySelector('svg')
    expect(icon).toHaveClass('icon-md')
    expect(container.firstChild?.firstChild).toContainElement(icon)
  })

  it('renders any content as children', () => {
    render(
      <CubeInformation>
        <a href="/docs">Read the docs</a>
      </CubeInformation>,
    )

    expect(
      screen.getByRole('link', { name: 'Read the docs' }),
    ).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeInformation showIcon>{message}</CubeInformation>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
