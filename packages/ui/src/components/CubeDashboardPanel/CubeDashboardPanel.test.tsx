import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import i18n from '@i18n/i18n'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeDashboardPanel } from './CubeDashboardPanel'

describe('CubeDashboardPanel', () => {
  it('renders the title and wraps the items in a bordered content box', () => {
    render(
      <CubeDashboardPanel title="Panel Title">
        <CubeDashboardPanel.Item topic="Topic Name">
          Content Text
        </CubeDashboardPanel.Item>
      </CubeDashboardPanel>,
    )

    expect(screen.getByText('Panel Title')).toHaveClass(
      'secondary-body1',
      'text-primary',
    )
    const item = screen.getByText('Content Text').parentElement!
    // Item < Col < content box
    expect(item.parentElement?.parentElement).toHaveClass(
      'border',
      'rounded-[5px]',
      'border-functional-border-divider',
    )
  })

  it('renders children directly without the content box', () => {
    render(
      <CubeDashboardPanel title="Panel Title" useContentWrapper={false}>
        <p>Table</p>
      </CubeDashboardPanel>,
    )

    expect(screen.getByText('Table').parentElement).toHaveClass(
      'bg-grey-0',
      'p-4',
    )
  })

  it.each([
    [0, null],
    [1, '1 error'],
    [3, '3 errors'],
  ])('shows %i errors as %s', (errorCount, text) => {
    render(
      <CubeDashboardPanel title="Panel Title" errorCount={errorCount}>
        Content Text
      </CubeDashboardPanel>,
    )

    if (text) {
      expect(screen.getByText(text)).toHaveClass('primary-body3')
      expect(screen.getByText(text).parentElement).toHaveClass(
        'text-status-negative',
      )
    } else {
      expect(screen.queryByText(/error/)).not.toBeInTheDocument()
    }
  })

  it('translates the error count and link', async () => {
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <CubeDashboardPanel
          title="Panel Title"
          errorCount={2}
          hyperLinkProps={{ href: '/#' }}
        >
          Content Text
        </CubeDashboardPanel>
      </CubeUiLocaleProvider>,
    )

    expect(await screen.findByText('2 個錯誤')).toBeInTheDocument()
    expect(screen.getByText('瀏覽全部')).toBeInTheDocument()

    // The provider switches the shared i18n instance; switch it back.
    await act(() => i18n.changeLanguage('en-US'))
  })

  it('shows the time, or a skeleton while it loads', () => {
    const { container, rerender } = render(
      <CubeDashboardPanel title="Panel Title" time="yyyy/mm/dd 00:00">
        Content Text
      </CubeDashboardPanel>,
    )
    expect(screen.getByText('yyyy/mm/dd 00:00')).toHaveClass('secondary-body5')

    rerender(
      <CubeDashboardPanel title="Panel Title" time="" isTimeLoading>
        Content Text
      </CubeDashboardPanel>,
    )
    expect(container.querySelector('.cube-skeleton')).toHaveClass(
      'h-[13px]',
      'w-[97px]',
    )
  })

  it('shows a View All link, optionally inside a container', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { rerender } = render(
      <CubeDashboardPanel title="Panel Title" hyperLinkProps={{ onClick }}>
        Content Text
      </CubeDashboardPanel>,
    )

    await user.click(screen.getByText('View All'))
    expect(onClick).toHaveBeenCalledOnce()

    rerender(
      <CubeDashboardPanel
        title="Panel Title"
        hyperLinkProps={{ onClick }}
        HyperLinkContainer={<nav aria-label="More" />}
      >
        Content Text
      </CubeDashboardPanel>,
    )
    expect(screen.getByRole('navigation', { name: 'More' })).toHaveTextContent(
      'View All',
    )
  })

  it('renders an item topic, subtext and content', () => {
    render(
      <CubeDashboardPanel title="Panel Title">
        <CubeDashboardPanel.Item topic="Topic Name" subtext="Subtext">
          Content Text
        </CubeDashboardPanel.Item>
      </CubeDashboardPanel>,
    )

    expect(screen.getByText('Topic Name')).toHaveClass('primary-body2')
    expect(screen.getByText('Subtext')).toHaveClass('primary-body3')
    expect(screen.getByText('Content Text')).toHaveClass('primary-body5')
  })

  it('shows a skeleton while the item subtext loads', () => {
    const { container } = render(
      <CubeDashboardPanel.Item topic="Topic Name" isSubtextLoading>
        Content Text
      </CubeDashboardPanel.Item>,
    )

    expect(container.querySelector('.cube-skeleton')).toHaveClass(
      'h-[18px]',
      'w-[79px]',
    )
  })

  it('renders the item button as a medium primary button', () => {
    render(
      <CubeDashboardPanel.Item
        topic="Topic Name"
        button={
          <CubeButton size="sm" type="ghost">
            Call to Action
          </CubeButton>
        }
      >
        Content Text
      </CubeDashboardPanel.Item>,
    )

    const button = screen.getByRole('button', { name: 'Call to Action' })
    expect(button).toHaveClass('h-[34px]', 'bg-primary')
    expect(button).not.toHaveClass('h-[26px]', 'bg-transparent')
  })

  it('lays out items in rows and columns with dividers', () => {
    const { container } = render(
      <CubeDashboardPanel.Row className="[&>*]:flex-1">
        <CubeDashboardPanel.Col>
          <CubeDashboardPanel.Item>A</CubeDashboardPanel.Item>
          <CubeDashboardPanel.Item>B</CubeDashboardPanel.Item>
        </CubeDashboardPanel.Col>
        <CubeDashboardPanel.Item>C</CubeDashboardPanel.Item>
      </CubeDashboardPanel.Row>,
    )

    const row = container.firstChild as HTMLElement
    expect(row).toHaveClass('flex-row', '[&>*+*]:border-l', '[&>*]:flex-1')
    expect(row.firstChild).toHaveClass('flex-col', '[&>*+*]:border-t')
  })

  it('merges className onto the panel', () => {
    const { container } = render(
      <CubeDashboardPanel title="Panel Title" className="p-6">
        Content Text
      </CubeDashboardPanel>,
    )

    expect(container.firstChild).toHaveClass('p-6', 'bg-grey-0')
    expect(container.firstChild).not.toHaveClass('p-4')
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeDashboardPanel
        title="Panel Title"
        time="yyyy/mm/dd 00:00"
        errorCount={1}
        hyperLinkProps={{ href: '/#' }}
      >
        <CubeDashboardPanel.Item
          topic="Topic Name"
          subtext="Subtext"
          button={<CubeButton>Call to Action</CubeButton>}
        >
          Content Text
        </CubeDashboardPanel.Item>
      </CubeDashboardPanel>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
