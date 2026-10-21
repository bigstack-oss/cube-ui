import { createRef } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeModal } from './CubeModal'
import type { CubeModalProps } from './cubeModalTypes'

const renderModal = (props: Partial<CubeModalProps> = {}) =>
  render(
    <CubeModal isOpen title="Delete resource" onCloseClick={vi.fn()} {...props}>
      {props.children ?? 'Do you want to delete this resource?'}
    </CubeModal>,
  )

// The modal panel is the portal's second child (after the backdrop).
const getPanel = () => document.body.querySelector('.fixed.left-1\\/2')
const getBackdrop = () => document.body.querySelector('.fixed.left-0')

describe('CubeModal', () => {
  it('renders the title and body in a portal on document.body', () => {
    const { container } = renderModal()

    const body = screen.getByText('Do you want to delete this resource?')
    expect(screen.getByText('Delete resource')).toBeInTheDocument()
    expect(container).not.toContainElement(body)
    expect(document.body).toContainElement(body)
  })

  it('stays mounted but hidden and inert when closed', () => {
    renderModal({ isOpen: false })

    expect(getPanel()).toHaveClass('opacity-0', 'pointer-events-none')
    expect(getBackdrop()).toHaveClass('opacity-0', 'pointer-events-none')
  })

  it.each([
    ['sm', 'w-2/5'],
    ['md', 'w-[70%]'],
  ] as const)('applies the %s size', (size, widthClass) => {
    renderModal({ size })

    expect(getPanel()).toHaveClass(widthClass)
  })

  it('gives the icon-only close button an accessible name', () => {
    renderModal()

    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })

  it('renders the default Cancel and Action buttons', async () => {
    const user = userEvent.setup()
    const onActionClick = vi.fn()
    renderModal({ onActionClick })

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Action' }))

    expect(onActionClick).toHaveBeenCalledOnce()
  })

  it('uses actionText for the action button', () => {
    renderModal({ actionText: 'Add Attribute' })

    expect(
      screen.getByRole('button', { name: 'Add Attribute' }),
    ).toBeInTheDocument()
  })

  it('hides the action and cancel buttons when asked', () => {
    renderModal({ isActionButtonVisible: false, isCancelButtonVisible: false })

    expect(
      screen.queryByRole('button', { name: 'Action' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Cancel' }),
    ).not.toBeInTheDocument()
  })

  it('passes actionButtonProps and cancelButtonProps to the buttons', () => {
    renderModal({
      actionButtonProps: { disabled: true },
      cancelButtonProps: { disabled: true },
    })

    expect(screen.getByRole('button', { name: 'Action' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
  })

  it.each([
    ['the close button', () => screen.getByRole('button', { name: 'Close' })],
    ['Cancel', () => screen.getByRole('button', { name: 'Cancel' })],
    ['the backdrop', () => getBackdrop()],
  ])('calls onCloseClick when %s is clicked', (_, getTarget) => {
    const onCloseClick = vi.fn()
    renderModal({ onCloseClick })

    const target = getTarget()
    if (!target) throw new Error('target not found')
    fireEvent.click(target)

    expect(onCloseClick).toHaveBeenCalledOnce()
  })

  it('renders a string footerMessage as text and a node as-is', () => {
    const { rerender } = renderModal({ footerMessage: 'Lorem ipsum.' })
    expect(screen.getByText('Lorem ipsum.')).toHaveClass(
      'text-functional-text-light',
    )

    rerender(
      <CubeModal
        isOpen
        title="Delete resource"
        onCloseClick={vi.fn()}
        footerMessage={<span data-testid="custom-footer">Copied</span>}
      >
        Body
      </CubeModal>,
    )
    expect(screen.getByTestId('custom-footer')).toBeInTheDocument()
  })

  it('attaches bodyRef to the body container', () => {
    const bodyRef = createRef<HTMLDivElement>()
    renderModal({ bodyRef })

    expect(bodyRef.current).toContainElement(
      screen.getByText('Do you want to delete this resource?'),
    )
  })

  it('keeps the last content while closed', () => {
    const { rerender } = renderModal()

    rerender(
      <CubeModal isOpen={false} title="Changed title" onCloseClick={vi.fn()}>
        Changed body
      </CubeModal>,
    )

    expect(screen.getByText('Delete resource')).toBeInTheDocument()
    expect(screen.queryByText('Changed body')).not.toBeInTheDocument()
  })

  describe('Escape key', () => {
    it('calls onCloseClick when open', async () => {
      const user = userEvent.setup()
      const onCloseClick = vi.fn()
      renderModal({ onCloseClick })

      await user.keyboard('{Escape}')

      expect(onCloseClick).toHaveBeenCalledOnce()
    })

    it('does nothing when closed', async () => {
      const user = userEvent.setup()
      const onCloseClick = vi.fn()
      renderModal({ isOpen: false, onCloseClick })

      await user.keyboard('{Escape}')

      expect(onCloseClick).not.toHaveBeenCalled()
    })

    it('blurs a focused input instead of closing', async () => {
      const user = userEvent.setup()
      const onCloseClick = vi.fn()
      renderModal({ onCloseClick, children: <input aria-label="Name" /> })

      const input = screen.getByRole('textbox', { name: 'Name' })
      await user.click(input)
      await user.keyboard('{Escape}')

      expect(input).not.toHaveFocus()
      expect(onCloseClick).not.toHaveBeenCalled()
    })
  })

  it('has no accessibility violations', async () => {
    renderModal({ footerMessage: 'Lorem ipsum.' })

    const panel = getPanel()
    if (!panel) throw new Error('modal panel not found')
    expect(await axe(panel)).toHaveNoViolations()
  })
})
