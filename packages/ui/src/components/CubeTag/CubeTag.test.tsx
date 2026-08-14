import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { MonochromeTag } from '@icons'
import { CubeTag } from './CubeTag'

describe('CubeTag', () => {
  it('renders its children', () => {
    render(<CubeTag variant="filled">Text only</CubeTag>)

    expect(screen.getByText('Text only')).toBeInTheDocument()
  })

  it('renders the icon when Icon is provided', () => {
    const { container } = render(
      <CubeTag variant="filled" Icon={MonochromeTag}>
        With icon
      </CubeTag>,
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <CubeTag variant="filled" showCloseButton onClose={onClose}>
        Closable
      </CubeTag>,
    )

    await user.click(container.querySelector('svg') as SVGSVGElement)

    expect(onClose).toHaveBeenCalledOnce()
  })

  it('does not call onClose when disabled', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const { container } = render(
      <CubeTag variant="filled" showCloseButton onClose={onClose} disabled>
        Closable
      </CubeTag>,
    )

    await user.click(container.querySelector('svg') as SVGSVGElement)

    expect(onClose).not.toHaveBeenCalled()
  })

  it('renders its skeleton instead of the real tag while loading', () => {
    render(
      <CubeTag variant="filled" isLoading>
        Text only
      </CubeTag>,
    )

    expect(screen.queryByText('Text only')).not.toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeTag variant="filled">Text only</CubeTag>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
