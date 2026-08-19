import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { MonochromeHome01 } from '@icons'
import { CubeHyperlink } from './CubeHyperlink'
import {
  cubeHyperlinkColors,
  cubeHyperlinkSizes,
  type CubeHyperlinkColor,
  type CubeHyperlinkSize,
} from './cubeHyperlinkTypes'

describe('CubeHyperlink', () => {
  it('renders its children as the accessible name', () => {
    render(
      <CubeHyperlink variant="text-only" href="/">
        Call to action
      </CubeHyperlink>,
    )

    expect(
      screen.getByRole('link', { name: 'Call to action' }),
    ).toBeInTheDocument()
  })

  it.each(cubeHyperlinkColors)(
    'renders the %s color without crashing',
    (color: CubeHyperlinkColor) => {
      render(
        <CubeHyperlink variant="text-only" href="/" color={color}>
          Go
        </CubeHyperlink>,
      )

      expect(screen.getByRole('link')).toBeInTheDocument()
    },
  )

  it.each(cubeHyperlinkSizes)(
    'renders the %s size without crashing',
    (size: CubeHyperlinkSize) => {
      render(
        <CubeHyperlink variant="text-only" href="/" size={size}>
          Go
        </CubeHyperlink>,
      )

      expect(screen.getByRole('link')).toBeInTheDocument()
    },
  )

  it('renders an anchor when href is provided', () => {
    render(
      <CubeHyperlink variant="text-only" href="/target">
        Go
      </CubeHyperlink>,
    )

    expect(screen.getByRole('link')).toHaveAttribute('href', '/target')
  })

  it('renders a div, not an anchor, when no href is provided', () => {
    render(
      <CubeHyperlink variant="text-only" onClick={() => {}}>
        Go
      </CubeHyperlink>,
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeHyperlink variant="text-only" href="/" onClick={onClick}>
        Go
      </CubeHyperlink>,
    )

    await user.click(screen.getByRole('link'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick and does not render as a link when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeHyperlink variant="text-only" href="/" disabled onClick={onClick}>
        Go
      </CubeHyperlink>,
    )

    expect(screen.queryByRole('link')).not.toBeInTheDocument()

    await user.click(screen.getByText('Go'))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders the icon for icon-left usage', () => {
    const { container } = render(
      <CubeHyperlink href="/" variant="icon-left" Icon={MonochromeHome01}>
        Go
      </CubeHyperlink>,
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders the icon for icon-right usage', () => {
    const { container } = render(
      <CubeHyperlink href="/" variant="icon-right" Icon={MonochromeHome01}>
        Go
      </CubeHyperlink>,
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeHyperlink variant="text-only" href="/">
        Call to action
      </CubeHyperlink>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
