import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { MonochromeSettings } from '@icons'
import { CubeButton } from './CubeButton'
import {
  cubeButtonTypes,
  cubeButtonSizes,
  type CubeButtonType,
  type CubeButtonSize,
} from './cubeButtonTypes'

describe('CubeButton', () => {
  it('renders its children as the accessible name', () => {
    render(<CubeButton>Call to action</CubeButton>)

    expect(
      screen.getByRole('button', { name: 'Call to action' }),
    ).toBeInTheDocument()
  })

  it.each(cubeButtonTypes)(
    'renders the %s type without crashing',
    (type: CubeButtonType) => {
      render(<CubeButton type={type}>Go</CubeButton>)

      expect(screen.getByRole('button')).toBeInTheDocument()
    },
  )

  it.each(cubeButtonSizes)(
    'renders the %s size without crashing',
    (size: CubeButtonSize) => {
      render(<CubeButton size={size}>Go</CubeButton>)

      expect(screen.getByRole('button')).toBeInTheDocument()
    },
  )

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<CubeButton onClick={onClick}>Go</CubeButton>)

    await user.click(screen.getByRole('button'))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeButton disabled onClick={onClick}>
        Go
      </CubeButton>,
    )

    await user.click(screen.getByRole('button'))

    expect(onClick).not.toHaveBeenCalled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables the button and hides children while loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeButton loading onClick={onClick}>
        Go
      </CubeButton>,
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders the icon for icon-only usage', () => {
    const { container } = render(
      <CubeButton usage="icon-only" Icon={MonochromeSettings} aria-label="Settings" />,
    )

    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders the icon alongside children for icon-left usage', () => {
    render(
      <CubeButton usage="icon-left" Icon={MonochromeSettings}>
        Settings
      </CubeButton>,
    )

    expect(screen.getByRole('button')).toHaveTextContent('Settings')
  })

  it('has no accessibility violations', async () => {
    const { container } = render(<CubeButton>Call to action</CubeButton>)

    expect(await axe(container)).toHaveNoViolations()
  })
})
