import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import i18n from '@i18n/i18n'
import { CubeLogConsole } from './CubeLogConsole'

const log = `> Checking water pressure... OK
Exit Code: 0`

describe('CubeLogConsole', () => {
  it('renders the log as preformatted text below the header', () => {
    const { container } = render(<CubeLogConsole>{log}</CubeLogConsole>)

    const logBox = (container.firstChild as HTMLElement).lastElementChild
    expect(logBox).toHaveTextContent('> Checking water pressure... OK')
    expect(logBox?.textContent).toBe(log)
    expect(logBox).toHaveClass('whitespace-pre', 'bg-dark-700')
  })

  it('shows only the Copy button when there is no title', () => {
    render(<CubeLogConsole>{log}</CubeLogConsole>)

    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('shows a plain title', () => {
    render(
      <CubeLogConsole title={{ label: 'Test Result' }}>{log}</CubeLogConsole>,
    )

    expect(screen.getByText('Test Result')).toHaveClass(
      'primary-body2',
      'text-primary',
    )
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })

  it('shows a title link that opens in a new tab', () => {
    render(
      <CubeLogConsole title={{ label: 'Details log', href: '/logs/1' }}>
        {log}
      </CubeLogConsole>,
    )

    const link = screen.getByRole('link', { name: 'Details log' })
    expect(link).toHaveAttribute('href', '/logs/1')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('copies the log to the clipboard', async () => {
    const user = userEvent.setup()
    render(<CubeLogConsole>{log}</CubeLogConsole>)

    await user.click(screen.getByRole('button', { name: 'Copy' }))

    expect(await navigator.clipboard.readText()).toBe(log)
  })

  it('explains the button on hover and confirms the copy on click', async () => {
    const user = userEvent.setup()
    render(<CubeLogConsole>{log}</CubeLogConsole>)

    const button = screen.getByRole('button', { name: 'Copy' })
    await user.hover(button)
    expect(screen.getAllByText('Click to copy details').length).toBeGreaterThan(
      0,
    )

    await user.click(button)
    expect(screen.getAllByText('Copied!').length).toBeGreaterThan(0)
  })

  it('uses a custom hover tooltip', async () => {
    const user = userEvent.setup()
    render(
      <CubeLogConsole copyTooltip="Copy the script output">
        {log}
      </CubeLogConsole>,
    )

    await user.hover(screen.getByRole('button', { name: 'Copy' }))
    expect(
      screen.getAllByText('Copy the script output').length,
    ).toBeGreaterThan(0)
  })

  it('merges className and logWrapperClassName', () => {
    const { container } = render(
      <CubeLogConsole className="mt-4" logWrapperClassName="max-h-40">
        {log}
      </CubeLogConsole>,
    )

    const outer = container.firstChild as HTMLElement
    expect(outer).toHaveClass('flex', 'flex-col', 'mt-4')
    expect(outer.lastElementChild).toHaveClass('max-h-40', 'bg-dark-700')
  })

  it('translates the button', async () => {
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <CubeLogConsole>{log}</CubeLogConsole>
      </CubeUiLocaleProvider>,
    )

    expect(
      await screen.findByRole('button', { name: '複製' }),
    ).toBeInTheDocument()

    // The provider switches the shared i18n instance; switch it back.
    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeLogConsole title={{ label: 'Details log', href: '/logs/1' }}>
        {log}
      </CubeLogConsole>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
