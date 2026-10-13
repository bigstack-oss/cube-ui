import { createRef, type ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { MonochromeHome01, MonochromePower } from '@icons'
import { CubeOverflowMenu } from './CubeOverflowMenu'
import type { CubeOverflowMenuItemProps } from './cubeOverflowMenuTypes'

// The menu is always portaled into document.body; `useFloating` hides it with
// `visibility: hidden` while closed.
const getMenu = () =>
  document.body.querySelector<HTMLDivElement>('body > .rounded-\\[5px\\]')!

const isMenuOpen = () => getMenu().style.visibility !== 'hidden'

const renderMenu = (
  children: ReactNode,
  trigger = <button>Open menu</button>,
) =>
  render(
    <CubeOverflowMenu triggerElement={trigger}>{children}</CubeOverflowMenu>,
  )

describe('CubeOverflowMenu', () => {
  it('renders the trigger with the menu closed', () => {
    renderMenu(<CubeOverflowMenu.Item type="plain" title="Rename" />)

    expect(
      screen.getByRole('button', { name: 'Open menu' }),
    ).toBeInTheDocument()
    expect(isMenuOpen()).toBe(false)
  })

  it('toggles the menu when the trigger is clicked', async () => {
    const user = userEvent.setup()
    renderMenu(<CubeOverflowMenu.Item type="plain" title="Rename" />)

    const trigger = screen.getByRole('button', { name: 'Open menu' })

    await user.click(trigger)
    expect(isMenuOpen()).toBe(true)

    await user.click(trigger)
    expect(isMenuOpen()).toBe(false)
  })

  it("still calls the trigger's own onClick and ref", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const ref = createRef<HTMLButtonElement>()
    renderMenu(
      <CubeOverflowMenu.Item type="plain" title="Rename" />,
      <button ref={ref} onClick={onClick}>
        Open menu
      </button>,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    expect(onClick).toHaveBeenCalledOnce()
    expect(ref.current).toBe(screen.getByRole('button', { name: 'Open menu' }))
  })

  it('closes the menu on an outside click', async () => {
    const user = userEvent.setup()
    render(
      <>
        <CubeOverflowMenu triggerElement={<button>Open menu</button>}>
          <CubeOverflowMenu.Item type="plain" title="Rename" />
        </CubeOverflowMenu>
        <p>Outside</p>
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(isMenuOpen()).toBe(true)

    await user.click(screen.getByText('Outside'))
    expect(isMenuOpen()).toBe(false)
  })

  it('calls an item onClick and closes the menu', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderMenu(
      <CubeOverflowMenu.Item type="plain" title="Rename" onClick={onClick} />,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(screen.getByText('Rename'))

    expect(onClick).toHaveBeenCalledOnce()
    expect(isMenuOpen()).toBe(false)
  })

  it('keeps the menu open after clicking a check-mark item', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderMenu(
      <CubeOverflowMenu.Item
        type="check-mark"
        title="Admin"
        isChecked={false}
        onClick={onClick}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(screen.getByText('Admin'))

    expect(onClick).toHaveBeenCalledOnce()
    expect(isMenuOpen()).toBe(true)
  })

  it('switches a toggle item and keeps the menu open', async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    renderMenu(
      <CubeOverflowMenu.Item
        type="toggle"
        title="Notifications"
        checked={false}
        onCheckedChange={onCheckedChange}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(screen.getByRole('switch', { name: 'Notifications' }))

    expect(onCheckedChange).toHaveBeenCalledWith(true)
    expect(isMenuOpen()).toBe(true)
  })

  it('does not call onClick on a disabled item', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    renderMenu(
      <CubeOverflowMenu.Item
        type="plain"
        title="Delete"
        disabled
        onClick={onClick}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    await user.click(screen.getByText('Delete'))

    expect(onClick).not.toHaveBeenCalled()
    expect(isMenuOpen()).toBe(true)
  })

  it('disables the toggle of a disabled toggle item', async () => {
    const user = userEvent.setup()
    renderMenu(
      <CubeOverflowMenu.Item
        type="toggle"
        title="Notifications"
        checked
        disabled
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeDisabled()
  })

  it('renders the title, bold title and subtext', () => {
    renderMenu(
      <CubeOverflowMenu.Item
        type="plain"
        title="Rename"
        boldTitle
        subText="Change the name"
      />,
    )

    expect(screen.getByText('Rename')).toHaveClass('font-semibold')
    expect(screen.getByText('Change the name')).toBeInTheDocument()
  })

  it('shows the check mark only when checked', () => {
    renderMenu(
      <>
        <CubeOverflowMenu.Item type="check-mark" title="On" isChecked />
        <CubeOverflowMenu.Item
          type="check-mark"
          title="Off"
          isChecked={false}
        />
      </>,
    )

    const marks = getMenu().querySelectorAll('svg')
    expect(marks[0]).not.toHaveClass('invisible')
    expect(marks[1]).toHaveClass('invisible')
  })

  const typedItems: [CubeOverflowMenuItemProps['type'], ReactNode][] = [
    ['plain', <CubeOverflowMenu.Item key="i" type="plain" title="Item" />],
    [
      'menu-icon',
      <CubeOverflowMenu.Item
        key="i"
        type="menu-icon"
        title="Item"
        MenuIcon={MonochromeHome01}
      />,
    ],
    [
      'check-mark',
      <CubeOverflowMenu.Item
        key="i"
        type="check-mark"
        title="Item"
        isChecked
      />,
    ],
    [
      'toggle',
      <CubeOverflowMenu.Item key="i" type="toggle" title="Item" checked />,
    ],
    [
      'trailing-icon',
      <CubeOverflowMenu.Item
        key="i"
        type="trailing-icon"
        title="Item"
        TrailingIcon={MonochromePower}
      />,
    ],
    [
      'custom-leading-element',
      <CubeOverflowMenu.Item
        key="i"
        type="custom-leading-element"
        title="Item"
        element={<span data-testid="custom">!</span>}
      />,
    ],
  ]

  it.each(typedItems)('renders a %s item', async (type, item) => {
    const user = userEvent.setup()
    renderMenu(item)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    expect(screen.getByText('Item')).toBeInTheDocument()

    const svgCount = getMenu().querySelectorAll('svg').length
    const expected: Record<CubeOverflowMenuItemProps['type'], () => void> = {
      plain: () => expect(svgCount).toBe(0),
      'menu-icon': () => expect(svgCount).toBe(1),
      'check-mark': () => expect(svgCount).toBe(1),
      toggle: () =>
        expect(
          screen.getByRole('switch', { name: 'Item' }),
        ).toBeInTheDocument(),
      'trailing-icon': () => expect(svgCount).toBe(1),
      'custom-leading-element': () =>
        expect(screen.getByTestId('custom')).toBeInTheDocument(),
    }
    expected[type]()
  })

  it('renders the menu title and divider', () => {
    renderMenu(
      <>
        <CubeOverflowMenu.Title>Catalog</CubeOverflowMenu.Title>
        <CubeOverflowMenu.Item type="plain" title="One" />
        <CubeOverflowMenu.Divider />
        <CubeOverflowMenu.Item type="plain" title="Two" />
      </>,
    )

    expect(screen.getByText('Catalog')).toBeInTheDocument()
    expect(getMenu().querySelector('.h-px')).toBeInTheDocument()
  })

  it('has no accessibility violations while open', async () => {
    const user = userEvent.setup()
    renderMenu(
      <>
        <CubeOverflowMenu.Title>Catalog</CubeOverflowMenu.Title>
        <CubeOverflowMenu.Item type="plain" title="Rename" onClick={vi.fn()} />
        <CubeOverflowMenu.Item type="toggle" title="Notify" checked />
      </>,
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    // Scan `document.body` since the menu is portaled there. The `region`
    // rule is a page-level landmark check that doesn't apply to a component.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
