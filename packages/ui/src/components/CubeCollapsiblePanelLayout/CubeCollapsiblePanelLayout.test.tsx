import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import i18n from '@i18n/i18n'
import { CubeCollapsiblePanelLayout } from './CubeCollapsiblePanelLayout'
import type { CubeCollapsiblePanelLayoutProps } from './cubeCollapsiblePanelLayoutTypes'

type LayoutProps = Omit<CubeCollapsiblePanelLayoutProps, 'children'>

const renderLayout = (props: LayoutProps = {}) =>
  render(
    <CubeCollapsiblePanelLayout {...props}>
      <CubeCollapsiblePanelLayout.LeftPanel topic="Left Panel">
        Left content
      </CubeCollapsiblePanelLayout.LeftPanel>
      <CubeCollapsiblePanelLayout.RightPanel topic="Right Panel">
        Right content
      </CubeCollapsiblePanelLayout.RightPanel>
    </CubeCollapsiblePanelLayout>,
  )

const getToggle = () =>
  screen.getByRole('button', { name: 'Show or Hide Panel' })

const getClose = () => screen.getByRole('button', { name: 'Close Panel' })

// The right panel's sizing container wraps its GeneralPanel.
// jsdom normalizes the width to `calc(<fraction> * (100% - 16px))`.
const getRightPanel = () =>
  screen.getByText('Right Panel').closest('[style*="width"]') as HTMLElement

const isRightPanelOpen = () => getRightPanel().style.width !== '0px'

describe('CubeCollapsiblePanelLayout', () => {
  it('renders both panels with the right panel open by default', () => {
    renderLayout()

    expect(screen.getByText('Left content')).toBeInTheDocument()
    expect(screen.getByText('Right content')).toBeInTheDocument()
    expect(getRightPanel().style.width).toBe('calc(0.5 * (100% - 16px))')
    expect(getRightPanel()).toHaveClass('flex-1')
    expect(getToggle()).toHaveAttribute('aria-expanded', 'true')
  })

  it('toggles the right panel and closes it with the close button', async () => {
    const user = userEvent.setup()
    renderLayout()

    await user.click(getToggle())
    expect(isRightPanelOpen()).toBe(false)
    expect(getRightPanel()).toHaveClass('w-0')
    expect(getToggle()).toHaveAttribute('aria-expanded', 'false')

    await user.click(getToggle())
    expect(isRightPanelOpen()).toBe(true)

    await user.click(getClose())
    expect(isRightPanelOpen()).toBe(false)
  })

  it('starts closed with defaultPanelOpen false', () => {
    renderLayout({ defaultPanelOpen: false })

    expect(isRightPanelOpen()).toBe(false)
  })

  it('only reports changes when controlled', async () => {
    const user = userEvent.setup()
    const onControlledPanelOpenChange = vi.fn()
    renderLayout({ isControlledPanelOpen: false, onControlledPanelOpenChange })

    await user.click(getToggle())
    expect(onControlledPanelOpenChange).toHaveBeenLastCalledWith(true)
    // The parent owns the state, so the panel stays closed.
    expect(isRightPanelOpen()).toBe(false)
  })

  it('reports closing when controlled and open', async () => {
    const user = userEvent.setup()
    const onControlledPanelOpenChange = vi.fn()
    renderLayout({ isControlledPanelOpen: true, onControlledPanelOpenChange })

    await user.click(getClose())
    expect(onControlledPanelOpenChange).toHaveBeenLastCalledWith(false)
  })

  it.each([
    [30, 'calc(0.3 * (100% - 16px))'],
    [150, 'calc(1 * (100% - 16px))'],
    [-10, 'calc(0 * (100% - 16px))'],
  ])('sizes the right panel to %i%%, clamped to 0-100', (percent, width) => {
    renderLayout({ rightPanelWidthPercentage: percent })

    expect(getRightPanel().style.width).toBe(width)
  })

  it('uses a custom toggle button and keeps its own onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <CubeCollapsiblePanelLayout>
        <CubeCollapsiblePanelLayout.LeftPanel
          topic="Left Panel"
          customToggleButton={
            <button type="button" onClick={onClick}>
              Toggle Me!
            </button>
          }
        >
          Left content
        </CubeCollapsiblePanelLayout.LeftPanel>
        <CubeCollapsiblePanelLayout.RightPanel topic="Right Panel">
          Right content
        </CubeCollapsiblePanelLayout.RightPanel>
      </CubeCollapsiblePanelLayout>,
    )

    expect(
      screen.queryByRole('button', { name: 'Show or Hide Panel' }),
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Toggle Me!' }))
    expect(onClick).toHaveBeenCalledOnce()
    expect(isRightPanelOpen()).toBe(false)
  })

  it('renders the slots before the toggle and close buttons', () => {
    render(
      <CubeCollapsiblePanelLayout>
        <CubeCollapsiblePanelLayout.LeftPanel
          topic="Left Panel"
          rightSlot={<span>Left slot</span>}
        >
          Left content
        </CubeCollapsiblePanelLayout.LeftPanel>
        <CubeCollapsiblePanelLayout.RightPanel
          topic="Right Panel"
          rightSlot={<span>Right slot</span>}
        >
          Right content
        </CubeCollapsiblePanelLayout.RightPanel>
      </CubeCollapsiblePanelLayout>,
    )

    expect(screen.getByText('Left slot').nextElementSibling).toBe(getToggle())
    expect(screen.getByText('Right slot').nextElementSibling).toBe(getClose())
  })

  it('throws when the panels are in the wrong order', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() =>
      render(
        <CubeCollapsiblePanelLayout>
          <CubeCollapsiblePanelLayout.RightPanel topic="Right Panel">
            Right content
          </CubeCollapsiblePanelLayout.RightPanel>
          <CubeCollapsiblePanelLayout.RightPanel topic="Right Panel">
            Right content
          </CubeCollapsiblePanelLayout.RightPanel>
        </CubeCollapsiblePanelLayout>,
      ),
    ).toThrow('first child must be <CubeCollapsiblePanelLayout.LeftPanel>')

    vi.restoreAllMocks()
  })

  it('translates the button labels', async () => {
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <CubeCollapsiblePanelLayout>
          <CubeCollapsiblePanelLayout.LeftPanel topic="Left Panel">
            Left content
          </CubeCollapsiblePanelLayout.LeftPanel>
          <CubeCollapsiblePanelLayout.RightPanel topic="Right Panel">
            Right content
          </CubeCollapsiblePanelLayout.RightPanel>
        </CubeCollapsiblePanelLayout>
      </CubeUiLocaleProvider>,
    )

    expect(
      await screen.findByRole('button', { name: '顯示或隱藏面板' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '關閉面板' })).toBeInTheDocument()

    // The provider switches the shared i18n instance; switch it back.
    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no axe violations', async () => {
    const { container } = renderLayout()

    expect(await axe(container)).toHaveNoViolations()
  })
})
