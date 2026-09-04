import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeStatus } from './CubeStatus'

describe('CubeStatus', () => {
  it.each([
    ['neutral', 'Neutral'],
    ['success', 'Success'],
    ['warning', 'Warning'],
  ])('renders the translated text for the %s status', (status, text) => {
    render(<CubeStatus status={status} />)

    expect(screen.getByText(text)).toBeInTheDocument()
  })

  it('formats an unrecognized status into display text', () => {
    render(<CubeStatus status="anything-else" />)

    expect(screen.getByText('Anything-else')).toBeInTheDocument()
  })

  it('renders the custom message instead of the translated status text', () => {
    render(<CubeStatus status="success" message="Custom message" />)

    expect(screen.getByText('Custom message')).toBeInTheDocument()
    expect(screen.queryByText('Success')).not.toBeInTheDocument()
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(<CubeStatus.Skeleton />)

    expect(container.querySelector('span')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeStatus status="success" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
