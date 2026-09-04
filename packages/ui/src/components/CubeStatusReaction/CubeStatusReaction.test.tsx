import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeStatusReaction } from './CubeStatusReaction'
import {
  cubeStatusReactionStatuses,
  type CubeStatusReactionStatus,
} from './cubeStatusReactionUtils'

describe('CubeStatusReaction', () => {
  it.each(cubeStatusReactionStatuses)(
    'renders the %s status without crashing',
    (status: CubeStatusReactionStatus) => {
      const { container } = render(<CubeStatusReaction status={status} />)

      expect(container.querySelector('svg')).toBeInTheDocument()
    },
  )

  it('renders the translated text for a status', () => {
    render(<CubeStatusReaction status="success" />)

    expect(screen.getByText('Success')).toBeInTheDocument()
  })

  it('renders the custom message instead of the translated status text', () => {
    render(<CubeStatusReaction status="success" message="Custom message" />)

    expect(screen.getByText('Custom message')).toBeInTheDocument()
    expect(screen.queryByText('Success')).not.toBeInTheDocument()
  })

  it('renders its skeleton via the compound API', () => {
    const { container } = render(<CubeStatusReaction.Skeleton />)

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeStatusReaction status="success" />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
