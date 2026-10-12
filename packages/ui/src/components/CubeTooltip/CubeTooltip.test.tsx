import { createRef, Fragment } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeTooltip } from './CubeTooltip'
import { cubeTooltipPlacements } from './cubeTooltipTypes'

// The info box renders its content twice: once in a hidden, `aria-hidden`
// "shadow" element used for measuring, and once in the visible
// `role="tooltip"` element.
const queryVisibleCaret = () =>
  document.body.querySelector<HTMLSpanElement>('span.border-b-dark-700')

describe('CubeTooltip', () => {
  it('renders only the anchor element by default', () => {
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button>Anchor</button>
      </CubeTooltip>,
    )

    expect(screen.getByRole('button', { name: 'Anchor' })).toBeInTheDocument()
    expect(screen.queryByText('Tooltip message')).not.toBeInTheDocument()
  })

  it('shows the hover content on mouse enter and hides it on mouse leave', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button>Anchor</button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })

    await user.hover(anchor)
    expect(screen.getAllByText('Tooltip message').length).toBeGreaterThan(0)

    await user.unhover(anchor)
    expect(screen.queryByText('Tooltip message')).not.toBeInTheDocument()
  })

  it('renders the title, subtext and message', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip
        hoverContent={{
          title: 'Title',
          subtext: 'Subtext',
          message: 'Tooltip message',
        }}
      >
        <button>Anchor</button>
      </CubeTooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Anchor' }))

    expect(screen.getAllByText('Title').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Subtext').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Tooltip message').length).toBeGreaterThan(0)
  })

  it('portals the info box into document.body', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button>Anchor</button>
      </CubeTooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Anchor' }))

    expect(container).not.toHaveTextContent('Tooltip message')
    expect(document.body).toHaveTextContent('Tooltip message')
  })

  it('switches from hover content to click content when the anchor is clicked', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip
        hoverContent={{ message: 'Hover message' }}
        clickContent={{ message: 'Click message' }}
      >
        <button>Anchor</button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })

    await user.hover(anchor)
    expect(screen.getAllByText('Hover message').length).toBeGreaterThan(0)

    await user.click(anchor)
    expect(screen.queryByText('Hover message')).not.toBeInTheDocument()
    expect(screen.getAllByText('Click message').length).toBeGreaterThan(0)

    await user.unhover(anchor)
    expect(screen.queryByText('Click message')).not.toBeInTheDocument()
  })

  it('shows nothing on hover when only click content is provided', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip clickContent={{ message: 'Click message' }}>
        <button>Anchor</button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })

    await user.hover(anchor)
    expect(screen.queryByText('Click message')).not.toBeInTheDocument()

    await user.click(anchor)
    expect(screen.getAllByText('Click message').length).toBeGreaterThan(0)
  })

  it("still calls the anchor element's own event handlers", async () => {
    const user = userEvent.setup()
    const onMouseEnter = vi.fn()
    const onMouseMove = vi.fn()
    const onMouseLeave = vi.fn()
    const onClick = vi.fn()
    render(
      <CubeTooltip
        hoverContent={{ message: 'Hover message' }}
        clickContent={{ message: 'Click message' }}
      >
        <button
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
        >
          Anchor
        </button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })

    await user.hover(anchor)
    await user.click(anchor)
    await user.unhover(anchor)

    expect(onMouseEnter).toHaveBeenCalled()
    expect(onMouseMove).toHaveBeenCalled()
    expect(onClick).toHaveBeenCalledOnce()
    expect(onMouseLeave).toHaveBeenCalled()
  })

  it("forwards the anchor element to the anchor's own ref", () => {
    const ref = createRef<HTMLButtonElement>()
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button ref={ref}>Anchor</button>
      </CubeTooltip>,
    )

    expect(ref.current).toBe(screen.getByRole('button', { name: 'Anchor' }))
  })

  it('throws when the anchor element is a Fragment', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      render(
        <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
          <Fragment>
            <button>Anchor</button>
          </Fragment>
        </CubeTooltip>,
      ),
    ).toThrow('Fragment children is not supported in CubeTooltip')

    vi.restoreAllMocks()
  })

  it.each(cubeTooltipPlacements)(
    'renders a caret for the %s placement',
    async (placement) => {
      const user = userEvent.setup()
      render(
        <CubeTooltip
          placement={placement}
          hoverContent={{ message: 'Tooltip message' }}
        >
          <button>Anchor</button>
        </CubeTooltip>,
      )

      await user.hover(screen.getByRole('button', { name: 'Anchor' }))

      expect(queryVisibleCaret()).toBeInTheDocument()
    },
  )

  it('exposes a single tooltip and links it to the anchor while shown', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button>Anchor</button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })
    expect(anchor).not.toHaveAttribute('aria-describedby')

    await user.hover(anchor)

    const tooltip = screen.getByRole('tooltip')
    expect(tooltip).toHaveTextContent('Tooltip message')
    expect(anchor).toHaveAttribute('aria-describedby', tooltip.id)
    expect(anchor).toHaveAccessibleDescription('Tooltip message')

    await user.unhover(anchor)
    expect(anchor).not.toHaveAttribute('aria-describedby')
  })

  it("keeps the anchor's own aria-describedby alongside the tooltip id", async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button aria-describedby="hint">Anchor</button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })
    await user.hover(anchor)

    expect(anchor).toHaveAttribute(
      'aria-describedby',
      `hint ${screen.getByRole('tooltip').id}`,
    )

    await user.unhover(anchor)
    expect(anchor).toHaveAttribute('aria-describedby', 'hint')
  })

  it('hides the measuring element from users and assistive technology', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button>Anchor</button>
      </CubeTooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Anchor' }))

    const [shadow] = screen
      .getAllByText('Tooltip message')
      .map((el) => el.closest('[aria-hidden="true"]'))
      .filter(Boolean)

    // `fixed` keeps it out of the document flow, so it can't add scroll height.
    expect(shadow).toHaveClass('invisible', 'fixed', 'left-0', 'top-0')
    expect(shadow).not.toHaveClass('absolute')
  })

  it('shows the hover content on keyboard focus and hides it on blur', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(
      <CubeTooltip hoverContent={{ message: 'Tooltip message' }}>
        <button onFocus={onFocus} onBlur={onBlur}>
          Anchor
        </button>
      </CubeTooltip>,
    )

    await user.tab()
    expect(screen.getByRole('button', { name: 'Anchor' })).toHaveFocus()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip message')
    expect(onFocus).toHaveBeenCalledOnce()

    await user.tab()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    expect(onBlur).toHaveBeenCalledOnce()
  })

  it('dismisses the tooltip with Escape', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip
        hoverContent={{ message: 'Hover message' }}
        clickContent={{ message: 'Click message' }}
      >
        <button>Anchor</button>
      </CubeTooltip>,
    )

    const anchor = screen.getByRole('button', { name: 'Anchor' })

    await user.hover(anchor)
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await user.click(anchor)
    expect(screen.getByRole('tooltip')).toHaveTextContent('Click message')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('has no accessibility violations while the tooltip is shown', async () => {
    const user = userEvent.setup()
    render(
      <CubeTooltip
        hoverContent={{
          title: 'Title',
          subtext: 'Subtext',
          message: 'Tooltip message',
        }}
      >
        <button>Anchor</button>
      </CubeTooltip>,
    )

    await user.hover(screen.getByRole('button', { name: 'Anchor' }))

    // Scan `document.body` since the info box is portaled there. The `region`
    // rule is a page-level landmark check that doesn't apply to a component.
    expect(
      await axe(document.body, { rules: { region: { enabled: false } } }),
    ).toHaveNoViolations()
  })
})
