import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeStackCard } from './CubeStackCard'

describe('CubeStackCard', () => {
  it('renders the title as a heading and the content below it', () => {
    render(<CubeStackCard title="Topic Name">Content Text</CubeStackCard>)

    expect(
      screen.getByRole('heading', { level: 5, name: 'Topic Name' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Content Text')).toHaveClass(
      'primary-body5',
      'text-functional-text-light',
    )
  })

  it('shows the subtext next to the title only when set', () => {
    const { rerender } = render(
      <CubeStackCard title="Topic Name">Content Text</CubeStackCard>,
    )
    expect(screen.queryByText('Subtext')).not.toBeInTheDocument()

    rerender(
      <CubeStackCard title="Topic Name" subtext="Subtext">
        Content Text
      </CubeStackCard>,
    )
    expect(
      screen.getByText('Subtext').previousElementSibling,
    ).toHaveTextContent('Topic Name')
  })

  it('renders any content as children', () => {
    render(
      <CubeStackCard title="Topic Name">
        <button type="button">Edit</button>
      </CubeStackCard>,
    )

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument()
  })

  it('draws the card with a secondary left border', () => {
    const { container } = render(
      <CubeStackCard title="Topic Name">Content Text</CubeStackCard>,
    )

    expect(container.firstChild).toHaveClass(
      'border-l-[5px]',
      'border-l-cosmos-secondary',
      'bg-scene-background',
    )
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeStackCard title="Topic Name" subtext="Subtext">
        Content Text
      </CubeStackCard>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
