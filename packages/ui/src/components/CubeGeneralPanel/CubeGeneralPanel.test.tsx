import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeGeneralPanel } from './CubeGeneralPanel'

describe('CubeGeneralPanel', () => {
  it('renders only the content when nothing else is set', () => {
    const { container } = render(
      <CubeGeneralPanel>Content Text</CubeGeneralPanel>,
    )

    expect(screen.getByText('Content Text')).toHaveClass(
      'primary-body5',
      'text-functional-text-light',
    )
    // Container > panel > content: no title bar, header or subtext.
    const panel = container.firstChild?.firstChild as HTMLElement
    expect(container.firstChild?.childNodes).toHaveLength(1)
    expect(panel.childNodes).toHaveLength(1)
  })

  it('renders the topic, slots and subtext above the content', () => {
    render(
      <CubeGeneralPanel
        topic="Topic Name"
        leftSlot={<button type="button">Left</button>}
        rightSlot={<button type="button">Right</button>}
        subtext="Subtext"
      >
        Content Text
      </CubeGeneralPanel>,
    )

    const topic = screen.getByText('Topic Name')
    expect(topic).toHaveClass('secondary-h4', 'font-semibold')
    expect(topic.nextElementSibling).toBe(
      screen.getByRole('button', { name: 'Left' }),
    )
    expect(
      screen.getByRole('button', { name: 'Right' }).parentElement,
    ).toHaveClass('flex', 'gap-x-3')
    expect(screen.getByText('Subtext')).toHaveClass('primary-body3')
  })

  it('renders the title bar with its time, dropdown and link', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeGeneralPanel
        topic="Topic Name"
        titleBarProps={{
          title: 'Panel Title',
          time: 'yyyy/mm/dd 00:00',
          dropdown: <button type="button">Range</button>,
          hyperLinkProps: { children: 'Call to action', onClick },
        }}
      >
        Content Text
      </CubeGeneralPanel>,
    )

    expect(screen.getByText('Panel Title')).toHaveClass('secondary-body1')
    expect(screen.getByText('yyyy/mm/dd 00:00')).toHaveClass('secondary-body5')
    expect(screen.getByRole('button', { name: 'Range' })).toBeInTheDocument()

    await user.click(screen.getByText('Call to action'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows a skeleton instead of the time while it loads', () => {
    const { container } = render(
      <CubeGeneralPanel
        titleBarProps={{
          title: 'Panel Title',
          time: 'yyyy/mm/dd 00:00',
          isTimeLoading: true,
        }}
      >
        Content Text
      </CubeGeneralPanel>,
    )

    expect(screen.queryByText('yyyy/mm/dd 00:00')).not.toBeInTheDocument()
    expect(container.querySelector('.cube-skeleton')).toHaveClass(
      'h-[13px]',
      'w-[97px]',
    )
  })

  it('merges className onto the panel and containerClassName onto the container', () => {
    const { container } = render(
      <CubeGeneralPanel className="p-4" containerClassName="w-[400px]">
        Content Text
      </CubeGeneralPanel>,
    )

    const outer = container.firstChild as HTMLElement
    expect(outer).toHaveClass('flex-col', 'gap-y-3', 'w-[400px]')
    expect(outer.firstChild).toHaveClass('p-4', 'bg-grey-0')
    expect(outer.firstChild).not.toHaveClass('p-6')
  })

  it('shares one title bar across panels with Container and TitleBar', () => {
    render(
      <CubeGeneralPanel.Container>
        <CubeGeneralPanel.TitleBar title="Panel Title" />
        <CubeGeneralPanel topic="First">Content Text</CubeGeneralPanel>
        <CubeGeneralPanel topic="Second">Content Text</CubeGeneralPanel>
      </CubeGeneralPanel.Container>,
    )

    expect(screen.getAllByText('Panel Title')).toHaveLength(1)
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const { container } = render(
      <CubeGeneralPanel
        topic="Topic Name"
        subtext="Subtext"
        titleBarProps={{
          title: 'Panel Title',
          time: 'yyyy/mm/dd 00:00',
          hyperLinkProps: { children: 'Call to action', href: '/#' },
        }}
      >
        Content Text
      </CubeGeneralPanel>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
