import type { PropsWithChildren } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import {
  ColoredCeph,
  ColoredKeycloak,
  MonochromeLogout,
  MonochromeNotification,
} from '@icons'
import { CubeHeader } from './CubeHeader'
import type {
  CubeHeaderFunctionBarItem,
  CubeHeaderProps,
} from './cubeHeaderTypes'

const LinkContainer = (props: PropsWithChildren<{ href: string }>) => (
  <a href={props.href} data-testid="link-container">
    {props.children}
  </a>
)

const makeProps = (
  overrides: Partial<CubeHeaderProps> = {},
): CubeHeaderProps => ({
  quickAccesses: [
    { Icon: ColoredKeycloak, href: '/keycloak', hoverMessage: 'Keycloak' },
    { Icon: ColoredCeph, href: '/ceph', hoverMessage: 'Ceph' },
  ],
  functionBarItems: [
    { Icon: MonochromeNotification, hoverMessage: 'Events' },
    { Icon: MonochromeLogout, hoverMessage: 'Logout', onClick: vi.fn() },
  ],
  currentLanguage: 'en-US',
  languageOptions: [
    { label: 'English', value: 'en-US', onClick: vi.fn() },
    { label: '繁體中文', value: 'zh-TW', onClick: vi.fn() },
  ],
  ...overrides,
})

describe('CubeHeader', () => {
  it('renders named quick accesses that open in a new tab', () => {
    render(<CubeHeader {...makeProps()} />)

    const keycloak = screen.getByRole('button', { name: 'Keycloak' })
    expect(keycloak.closest('a')).toHaveAttribute('href', '/keycloak')
    expect(keycloak.closest('a')).toHaveAttribute('target', '_blank')
    expect(screen.getByRole('button', { name: 'Ceph' })).toBeInTheDocument()
  })

  it('shows four skeletons instead of the quick accesses while loading', () => {
    const { container } = render(
      <CubeHeader {...makeProps({ isLoading: true })} />,
    )

    expect(
      screen.queryByRole('button', { name: 'Keycloak' }),
    ).not.toBeInTheDocument()
    const skeletons = container.querySelectorAll('.cube-skeleton')
    expect(skeletons).toHaveLength(4)
    expect(skeletons[0]).toHaveClass('size-[18px]')
    // The language dropdown and function bar still render.
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument()
  })

  it('renders named function buttons and calls onClick', async () => {
    const user = userEvent.setup()
    const props = makeProps()
    render(<CubeHeader {...props} />)

    await user.click(screen.getByRole('button', { name: 'Logout' }))

    expect(props.functionBarItems[1]!.onClick).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Events' })).toBeInTheDocument()
  })

  it('wraps a function button and its extra elements in a container', () => {
    const notification: CubeHeaderFunctionBarItem<{
      href: string
      children?: React.ReactNode
    }> = {
      Icon: MonochromeNotification,
      hoverMessage: 'Notifications',
      container: { Component: LinkContainer, props: { href: '/events' } },
      additionalElements: [<span key="dot" data-testid="unread-dot" />],
    }
    render(
      <CubeHeader
        {...makeProps({
          functionBarItems: [notification as CubeHeaderFunctionBarItem],
        })}
      />,
    )

    const container = screen.getByTestId('link-container')
    expect(container).toHaveAttribute('href', '/events')
    expect(
      within(container).getByRole('button', { name: 'Notifications' }),
    ).toBeInTheDocument()
    expect(within(container).getByTestId('unread-dot')).toBeInTheDocument()
  })

  it('shows a tooltip when hovering a quick access', async () => {
    const user = userEvent.setup()
    render(<CubeHeader {...makeProps()} />)

    await user.hover(screen.getByRole('button', { name: 'Ceph' }))

    expect(screen.getAllByText('Ceph').length).toBeGreaterThan(0)
  })

  it('shows the current language and switches it', async () => {
    const user = userEvent.setup()
    const props = makeProps()
    render(<CubeHeader {...props} />)

    await user.click(screen.getByRole('button', { name: 'English' }))
    // Radio items are clickable rows, not buttons.
    await user.click(screen.getByText('繁體中文'))

    expect(props.languageOptions[1]!.onClick).toHaveBeenCalledWith('zh-TW')
  })

  it('has no axe violations', async () => {
    const { container } = render(<CubeHeader {...makeProps()} />)

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeHeader function bar item name', () => {
  it('needs a hoverMessage in its type, since it names the icon-only button', () => {
    // @ts-expect-error an item without a hoverMessage has no accessible name
    const unnamed: CubeHeaderFunctionBarItem = { Icon: MonochromeLogout }

    expect(unnamed.Icon).toBe(MonochromeLogout)
  })

  it('names every function bar button by its hoverMessage', () => {
    render(<CubeHeader {...makeProps()} />)

    for (const name of ['Events', 'Logout']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument()
    }
  })
})

describe('CubeHeader test IDs', () => {
  it('tags the header, and each quick access on its link, keyed by its message unless it passes data-key', () => {
    render(
      <CubeHeader
        {...makeProps({
          quickAccesses: [
            {
              Icon: ColoredKeycloak,
              href: '/keycloak',
              hoverMessage: 'Keycloak',
              'data-key': 'keycloak',
            },
            { Icon: ColoredCeph, href: '/ceph', hoverMessage: 'Ceph' },
          ],
        })}
        data-testid="top"
      />,
    )

    expect(screen.getByTestId('top')).toBeInTheDocument()
    const links = screen.getAllByTestId('top-quick-access')
    expect(links.map((l) => l.tagName)).toEqual(['A', 'A'])
    expect(links.map((l) => l.getAttribute('data-key'))).toEqual([
      'keycloak',
      'Ceph',
    ])
    expect(links[1]).toHaveAttribute('href', '/ceph')
  })

  it('tags each function bar button, which a test can click', async () => {
    const user = userEvent.setup()
    const onLogout = vi.fn()
    render(
      <CubeHeader
        {...makeProps({
          functionBarItems: [
            { Icon: MonochromeNotification, hoverMessage: 'Events' },
            {
              Icon: MonochromeLogout,
              hoverMessage: 'Logout',
              'data-key': 'logout',
              onClick: onLogout,
            },
          ],
        })}
        data-testid="top"
      />,
    )

    const actions = screen.getAllByTestId('top-action')
    expect(actions.map((a) => a.tagName)).toEqual(['BUTTON', 'BUTTON'])
    expect(actions.map((a) => a.getAttribute('data-key'))).toEqual([
      'Events',
      'logout',
    ])
    const logout = actions[1]
    if (!logout) throw new Error('logout action not found')
    await user.click(logout)
    expect(onLogout).toHaveBeenCalledOnce()
  })

  it('tags the button, not its container, when an item has a container', () => {
    const events: CubeHeaderFunctionBarItem<{
      href: string
      children?: React.ReactNode
    }> = {
      Icon: MonochromeNotification,
      hoverMessage: 'Events',
      container: { Component: LinkContainer, props: { href: '/events' } },
    }
    render(
      <CubeHeader
        {...makeProps({
          functionBarItems: [events as CubeHeaderFunctionBarItem],
        })}
        data-testid="top"
      />,
    )

    const action = screen.getByTestId('top-action')
    expect(action.tagName).toBe('BUTTON')
    expect(screen.getByTestId('link-container')).toContainElement(action)
  })

  it('tags the language picker, its menu and each option, keyed by its value', async () => {
    const user = userEvent.setup()
    const props = makeProps()
    render(<CubeHeader {...props} data-testid="top" />)

    expect(screen.getByTestId('top-language')).toBeInTheDocument()
    const trigger = screen.getByTestId('top-language-trigger')
    expect(trigger).toHaveTextContent('English')
    await user.click(trigger)
    expect(screen.getByTestId('top-language-menu')).toBeInTheDocument()
    const options = screen.getAllByTestId('top-language-option')
    expect(options.map((o) => o.getAttribute('data-key'))).toEqual([
      'en-US',
      'zh-TW',
    ])
    const chinese = options[1]
    if (!chinese) throw new Error('zh-TW option not found')
    await user.click(chinese)
    expect(props.languageOptions[1]?.onClick).toHaveBeenCalledWith('zh-TW')
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      render(<CubeHeader {...makeProps()} data-testid={testId} />)

      expect(document.body.querySelector('[data-testid]')).toBeNull()
      expect(document.body.querySelector('[data-key]')).toBeNull()
    },
  )
})
