import { createRef, Fragment } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeTooltip } from './CubeTooltip'
import { cubeTooltipPlacements } from './cubeTooltipTypes'

// The info box renders its content twice: once in an off-screen "shadow"
// element used for measuring, and once in the visible floating element.
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
