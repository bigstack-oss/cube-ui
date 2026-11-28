import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import i18n from '@i18n/i18n'
import { MonochromeHome01, MonochromeNode, MonochromeSettings } from '@icons'
import { CubeSideBar } from './CubeSideBar'
import type { CubeSideBarProps } from './cubeSideBarTypes'

const makeProps = (
  overrides: Partial<CubeSideBarProps> = {},
): CubeSideBarProps => ({
  dataCenter: { name: 'KS', version: 'Cube Appliance 2.3.3' },
  username: 'Admin',
  options: [
    {
      Icon: MonochromeHome01,
      label: 'Home',
      isSelected: true,
      notificationCount: 1,
      onClick: vi.fn(),
    },
    {
      Icon: MonochromeNode,
      label: 'Nodes',
      notificationCount: 100,
      onClick: vi.fn(),
    },
    { Icon: MonochromeSettings, label: 'Settings', onClick: vi.fn() },
  ],
  utcTimeZone: '+08:00',
  ...overrides,
})

const getOption = (label: string) =>
  screen.getByText(label).closest('.px-\\[22px\\].py-\\[7px\\]') as HTMLElement

describe('CubeSideBar', () => {
  beforeEach(() => {
    // Fake only `Date`, so the data center time is fixed.
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-25T04:05:06Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the logo, user info, options and the data center time', () => {
    const { container } = render(<CubeSideBar {...makeProps()} />)

    expect(container.firstChild).toHaveClass('w-[200px]', 'min-h-svh')
    expect(container.querySelector('svg.h-\\[26px\\]')).toBeInTheDocument()
    expect(screen.getByText('KS')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toHaveClass('border-primary')
    expect(screen.getByText('Cube Appliance 2.3.3')).toBeInTheDocument()
    expect(screen.getByText('Data Center Time:')).toBeInTheDocument()
    // 04:05:06 UTC is 12:05:06 at UTC+8.
    expect(screen.getByText('2026/11/25 12:05:06')).toBeInTheDocument()
    expect(screen.getByText('UTC +8')).toBeInTheDocument()
    expect(screen.getByText('Copyright©Bigstack')).toBeInTheDocument()
  })

  it('wraps the logo in LogoContainer', () => {
    render(
      <CubeSideBar {...makeProps({ LogoContainer: <a href="/home" /> })} />,
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/home')
    expect(link.querySelector('svg.h-\\[26px\\]')).toBeInTheDocument()
  })

  it('shows "-" without a data center or user', () => {
    render(
      <CubeSideBar
        {...makeProps({
          dataCenter: undefined,
          username: undefined,
          utcTimeZone: undefined,
        })}
      />,
    )

    // Name, user and version.
    expect(screen.getAllByText('-')).toHaveLength(3)
    expect(screen.getByText('UTC -')).toBeInTheDocument()
  })

  it('shows the selected option, counts, and calls onClick', async () => {
    const user = userEvent.setup()
    const props = makeProps()
    render(<CubeSideBar {...props} />)

    expect(getOption('Home')).toHaveClass(
      'bg-functional-hover-secondary',
      'font-semibold',
      'text-primary',
    )
    expect(getOption('Home')).not.toHaveClass(
      'bg-transparent',
      'font-medium',
      'text-functional-text',
    )
    expect(getOption('Home')).toHaveTextContent('Home1')
    expect(getOption('Nodes')).toHaveClass('hover:bg-functional-hover-grey')
    expect(getOption('Nodes')).toHaveTextContent('NodesN')
    expect(getOption('Settings')).toHaveTextContent(/^Settings$/)

    await user.click(screen.getByText('Nodes'))
    expect(props.options[1]!.onClick).toHaveBeenCalledTimes(1)
  })

  it('renders the nagging and the bottom links', () => {
    render(
      <CubeSideBar
        {...makeProps({
          naggingProps: {
            type: 'error',
            title: '3 host licenses verification failed.',
          },
          links: [
            { text: 'CubeCMP', href: '/cmp' },
            { text: 'Help', href: '/help' },
          ],
        })}
      />,
    )

    expect(
      screen.getByText('3 host licenses verification failed.'),
    ).toBeInTheDocument()
    const help = screen.getByRole('link', { name: 'Help' })
    expect(help).toHaveAttribute('href', '/help')
    expect(help).toHaveAttribute('target', '_blank')
  })

  it('shows skeletons for the user info and time while loading', () => {
    const { container } = render(
      <CubeSideBar {...makeProps({ isLoading: true })} />,
    )

    expect(screen.queryByText('KS')).not.toBeInTheDocument()
    expect(screen.queryByText('Admin')).not.toBeInTheDocument()
    expect(screen.queryByText('UTC +8')).not.toBeInTheDocument()
    // Data center, user, version, time and time zone.
    expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(5)
    // The options still show.
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('translates the data center time label in zh-TW', async () => {
    await act(() => i18n.changeLanguage('zh-TW'))
    render(<CubeSideBar {...makeProps()} />)

    expect(screen.getByText('資料中心時間：')).toBeInTheDocument()

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    vi.useRealTimers()
    const { container } = render(
      <CubeSideBar
        {...makeProps({ links: [{ text: 'Help', href: '/help' }] })}
      />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})

describe('CubeSideBar test IDs', () => {
  const baseProps: CubeSideBarProps = {
    dataCenter: { name: 'Taipei', version: '3.1.0' },
    username: 'admin',
    options: [
      { label: 'Dashboard', Icon: MonochromeHome01, onClick: vi.fn() },
      {
        label: 'Nodes',
        Icon: MonochromeNode,
        onClick: vi.fn(),
        'data-key': 'nodes',
      },
    ],
    utcTimeZone: '+08:00',
    links: [{ text: 'Docs', href: '/docs' }],
  }

  it('tags the bar, the logo, the user, the data center and its version', () => {
    render(<CubeSideBar {...baseProps} data-testid="nav" />)

    expect(screen.getByTestId('nav')).toBeInTheDocument()
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument()
    expect(screen.getByTestId('nav-username')).toHaveTextContent('admin')
    expect(screen.getByTestId('nav-data-center')).toHaveTextContent('Taipei')
    expect(screen.getByTestId('nav-version')).toHaveTextContent('3.1.0')
  })

  it('tags each option, keyed by its label unless it passes data-key', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeSideBar
        {...baseProps}
        options={[
          { label: 'Dashboard', Icon: MonochromeHome01, onClick: vi.fn() },
          {
            label: 'Nodes',
            Icon: MonochromeNode,
            onClick,
            'data-key': 'nodes',
          },
        ]}
        data-testid="nav"
      />,
    )

    const options = screen.getAllByTestId('nav-option')
    expect(options.map((o) => o.getAttribute('data-key'))).toEqual([
      'Dashboard',
      'nodes',
    ])
    const nodes = options[1]
    if (!nodes) throw new Error('nodes option not found')
    await user.click(nodes)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('tags each bottom link, keyed by its text unless it passes data-key', () => {
    render(
      <CubeSideBar
        {...baseProps}
        links={[
          { text: 'Docs', href: '/docs' },
          { text: 'Support', href: '/support', 'data-key': 'help' },
        ]}
        data-testid="nav"
      />,
    )

    const links = screen.getAllByTestId('nav-link')
    expect(links.map((l) => l.getAttribute('data-key'))).toEqual([
      'Docs',
      'help',
    ])
    expect(links[0]).toHaveAttribute('href', '/docs')
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      const { container } = render(
        <CubeSideBar {...baseProps} data-testid={testId} />,
      )

      expect(container.querySelector('[data-testid]')).toBeNull()
      expect(container.querySelector('[data-key]')).toBeNull()
    },
  )
})
