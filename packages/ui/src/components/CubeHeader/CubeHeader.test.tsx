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
