import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeMessage } from './CubeMessage'

describe('CubeMessage', () => {
  it('renders the title and message content', () => {
    render(<CubeMessage title="%Variable%">Message content</CubeMessage>)

    expect(screen.getByText('%Variable%')).toBeInTheDocument()
    expect(screen.getByText('Message content')).toBeInTheDocument()
  })

  it('renders no header without label or time', () => {
    const { container } = render(
      <CubeMessage title="%Variable%">Message content</CubeMessage>,
    )

    expect(container.firstChild?.childNodes).toHaveLength(1)
  })

  it('renders the label in the header', () => {
    render(
      <CubeMessage label="Label" title="%Variable%">
        Message content
      </CubeMessage>,
    )

    expect(screen.getByText('Label')).toBeInTheDocument()
    expect(screen.queryByText(/^Time:/)).not.toBeInTheDocument()
  })

  it('renders the time in the header', () => {
    render(
      <CubeMessage time="2026/10/15 09:00:00" title="%Variable%">
        Message content
      </CubeMessage>,
    )

    expect(screen.getByText('Time: 2026/10/15 09:00:00')).toBeInTheDocument()
  })

  it('renders the tag as a primary CubeIconText', () => {
    render(
      <CubeMessage title="%Variable%" tag="Tag">
        Message content
      </CubeMessage>,
    )

    expect(screen.getByText('Tag')).toHaveClass('bg-cosmos-primary')
  })

  it('renders no tag when tag is omitted', () => {
    const { container } = render(
      <CubeMessage title="%Variable%">Message content</CubeMessage>,
    )

    expect(container.querySelector('span')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeMessage
        label="Label"
        time="2026/10/15 09:00:00"
        title="%Variable%"
        tag="Tag"
      >
        Message content
      </CubeMessage>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
