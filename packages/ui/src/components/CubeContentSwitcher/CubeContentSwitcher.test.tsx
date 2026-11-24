import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeContentSwitcher } from './CubeContentSwitcher'
import {
  cubeContentSwitcherSizes,
  type CubeContentSwitcherProps,
  type CubeContentSwitcherSize,
} from './cubeContentSwitcherTypes'

// The props minus `children`, kept as a union (`Omit` would drop `size`).
type SwitcherConfig = { className?: string } & (
  | { variant: 'default'; size?: CubeContentSwitcherSize }
  | { variant: 'radius' }
)

const renderSwitcher = (
  config: SwitcherConfig,
  options: { onClick?: () => void; disabled?: boolean } = {},
) =>
  render(
    <CubeContentSwitcher {...(config as CubeContentSwitcherProps)}>
      <CubeContentSwitcher.Item isActive onClick={options.onClick}>
        Item 1
      </CubeContentSwitcher.Item>
      <CubeContentSwitcher.Item
        isActive={false}
        disabled={options.disabled}
        onClick={options.onClick}
      >
        Item 2
      </CubeContentSwitcher.Item>
    </CubeContentSwitcher>,
  )

const getItem = (name: string) => screen.getByRole('button', { name })

describe('CubeContentSwitcher', () => {
  it('renders each item as a button and marks the active one', () => {
    renderSwitcher({ variant: 'default' })

    expect(screen.getAllByRole('button')).toHaveLength(2)
    expect(getItem('Item 1')).toHaveClass(
      'bg-primary-200',
      'text-functional-text',
    )
    expect(getItem('Item 2')).toHaveClass(
      'bg-grey-0',
      'text-functional-text-light',
      'hover:bg-functional-hover-secondary',
    )
  })

  it.each(cubeContentSwitcherSizes)('applies the %s size', (size) => {
    renderSwitcher({ variant: 'default', size })

    expect(getItem('Item 1')).toHaveClass(size === 'sm' ? 'h-6' : 'h-8')
  })

  it('uses the md size by default', () => {
    renderSwitcher({ variant: 'default' })

    expect(getItem('Item 1')).toHaveClass('h-8', 'min-w-[100px]')
  })

  it('wraps each item in a pill border in the radius variant', () => {
    renderSwitcher({ variant: 'radius' })

    const item = getItem('Item 1')
    expect(item).toHaveClass('rounded-full', 'bg-secondary-300')
    expect(item.parentElement).toHaveClass('border-secondary-200', 'p-[2px]')
    expect(getItem('Item 2')).toHaveClass('hover:bg-secondary-50')
  })

  it('calls onClick when an item is clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderSwitcher({ variant: 'default' }, { onClick })

    await user.click(getItem('Item 2'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick on a disabled item', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderSwitcher({ variant: 'default' }, { onClick, disabled: true })

    const item = getItem('Item 2')
    expect(item).toBeDisabled()
    expect(item).toHaveClass('text-functional-disable-text')

    await user.click(item)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('merges className onto the container', () => {
    const { container } = renderSwitcher({
      variant: 'radius',
      className: 'rounded-full bg-white',
    })

    expect(container.firstChild).toHaveClass(
      'flex',
      'w-fit',
      'rounded-full',
      'bg-white',
    )
  })

  it.each<[string, SwitcherConfig, string]>([
    ['default md', { variant: 'default' }, 'h-[32px]'],
    ['default sm', { variant: 'default', size: 'sm' }, 'h-[24px]'],
    ['radius', { variant: 'radius' }, 'h-[34px]'],
  ])('sizes the %s skeleton to match its items', (_, config, height) => {
    const { container } = render(
      <CubeContentSwitcher {...(config as CubeContentSwitcherProps)}>
        <CubeContentSwitcher.Skeleton />
        <CubeContentSwitcher.Skeleton />
      </CubeContentSwitcher>,
    )

    const placeholders = (container.firstChild as HTMLElement).children
    expect(placeholders).toHaveLength(2)
    expect(placeholders[0]).toHaveClass(height)
    expect(placeholders[0]?.querySelector('.cube-skeleton')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = renderSwitcher(
      { variant: 'default' },
      { disabled: true },
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
