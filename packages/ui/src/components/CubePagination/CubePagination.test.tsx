import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import i18n from '@i18n/i18n'
import { CubePagination, type CubePaginationProps } from './CubePagination'

// jsdom has no ResizeObserver; the container width is set through
// getBoundingClientRect instead, which usePaginationSize reads on mount.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

const setContainerWidth = (width: number) =>
  vi
    .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
    .mockReturnValue({ width } as DOMRect)

const renderPagination = (props: Partial<CubePaginationProps> = {}) => {
  const onPageChange = vi.fn()
  const onItemsPerPageChange = vi.fn()
  const result = render(
    <CubePagination
      totalItems={1203}
      currentPage={1}
      itemsPerPage={25}
      onPageChange={onPageChange}
      onItemsPerPageChange={onItemsPerPageChange}
      {...props}
    />,
  )
  return { ...result, onPageChange, onItemsPerPageChange }
}

// The round page and arrow buttons (not the items-per-page dropdown).
const getRoundButtons = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('button.rounded-full'))

const getPageButtons = (container: HTMLElement) =>
  getRoundButtons(container).filter((button) =>
    /^\d+$/.test(button.textContent ?? ''),
  )

const arrowNames = ['First page', 'Previous page', 'Next page', 'Last page']

const getArrowButtons = () =>
  arrowNames.map((name) => screen.getByRole('button', { name }))

describe('CubePagination', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('general (wide) layout', () => {
    beforeEach(() => {
      setContainerWidth(1000)
    })

    it('shows the long amount label, Go to and View', () => {
      renderPagination()

      expect(screen.getByText('Amount:')).toBeInTheDocument()
      expect(screen.getByText('1203')).toBeInTheDocument()
      expect(screen.getByText('Go to')).toBeInTheDocument()
      expect(screen.getByText('View')).toBeInTheDocument()
    })

    it('shows the page window with an ellipsis', () => {
      const { container } = renderPagination({ currentPage: 25 })

      const pages = getPageButtons(container).map(
        (button) => button.textContent,
      )
      expect(pages).toEqual(['1', '24', '25', '26', '49'])
      expect(screen.getAllByText('...')).toHaveLength(2)
    })

    it('calls onPageChange with the clicked page', async () => {
      const user = userEvent.setup()
      const { onPageChange } = renderPagination()

      await user.click(screen.getByRole('button', { name: 'Page 3' }))

      expect(onPageChange).toHaveBeenCalledWith(3)
    })

    it('moves with the first, previous, next and last buttons', async () => {
      const user = userEvent.setup()
      const { onPageChange } = renderPagination({ currentPage: 10 })

      for (const button of getArrowButtons()) {
        await user.click(button)
      }

      expect(onPageChange.mock.calls.map(([page]) => page)).toEqual([
        1, 9, 11, 49,
      ])
    })

    it('names the page buttons and marks the current page', () => {
      renderPagination({ currentPage: 25 })

      expect(screen.getByRole('button', { name: 'Page 25' })).toHaveAttribute(
        'aria-current',
        'page',
      )
      expect(
        screen.getByRole('button', { name: 'Page 24' }),
      ).not.toHaveAttribute('aria-current')
    })

    it('disables first/previous on page 1 and next/last on the last page', () => {
      const { rerender } = renderPagination({ currentPage: 1 })
      let arrows = getArrowButtons()
      expect(arrows.map((button) => button.hasAttribute('disabled'))).toEqual([
        true,
        true,
        false,
        false,
      ])

      rerender(
        <CubePagination totalItems={1203} currentPage={49} itemsPerPage={25} />,
      )
      arrows = getArrowButtons()
      expect(arrows.map((button) => button.hasAttribute('disabled'))).toEqual([
        false,
        false,
        true,
        true,
      ])
    })

    it('disables the arrows and the input when there are no items', () => {
      renderPagination({ totalItems: 0 })

      expect(
        getArrowButtons().every((button) => button.hasAttribute('disabled')),
      ).toBe(true)
      expect(screen.getByPlaceholderText('Page')).toBeDisabled()
    })

    it('goes to a valid page on Enter and clears the input', async () => {
      const user = userEvent.setup()
      const { onPageChange } = renderPagination()

      const input = screen.getByPlaceholderText('Page')
      await user.type(input, '12{Enter}')

      expect(onPageChange).toHaveBeenCalledWith(12)
      expect(input).toHaveValue('')
    })

    it('ignores an out-of-range or non-numeric page', async () => {
      const user = userEvent.setup()
      const { onPageChange } = renderPagination()

      const input = screen.getByPlaceholderText('Page')
      await user.type(input, '99{Enter}')
      await user.clear(input)
      await user.type(input, 'abc{Enter}')

      expect(onPageChange).not.toHaveBeenCalled()
    })

    it('goes to the typed page on blur', async () => {
      const user = userEvent.setup()
      const { onPageChange } = renderPagination()

      await user.type(screen.getByPlaceholderText('Page'), '7')
      await user.tab()

      expect(onPageChange).toHaveBeenCalledWith(7)
    })

    it('changes items per page and goes back to page 1', async () => {
      const user = userEvent.setup()
      const { onItemsPerPageChange, onPageChange } = renderPagination({
        currentPage: 5,
      })

      await user.click(screen.getByRole('button', { name: '25' }))
      await user.click(await screen.findByText('50'))

      expect(onItemsPerPageChange).toHaveBeenCalledWith(50)
      expect(onPageChange).toHaveBeenCalledWith(1)
    })

    it('renders the skeleton while loading', () => {
      const { container } = renderPagination({ isLoading: true })

      expect(screen.queryByText('Amount:')).not.toBeInTheDocument()
      // amount, 9 items, Go to label + input, View label + dropdown
      expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(14)
    })
  })

  describe('minimal (narrow) layout', () => {
    beforeEach(() => {
      setContainerWidth(500)
    })

    it('uses the short amount label and hides Go to and View', () => {
      renderPagination()

      expect(screen.getByText('Amt:')).toBeInTheDocument()
      expect(screen.queryByText('Go to')).not.toBeInTheDocument()
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })

    it('shows the minimal page window', () => {
      const { container } = renderPagination({ currentPage: 25 })

      const pages = getPageButtons(container).map(
        (button) => button.textContent,
      )
      expect(pages).toEqual(['24', '25', '26'])
    })

    it('renders the minimal skeleton while loading', () => {
      const { container } = renderPagination({ isLoading: true })

      // amount, 9 items, input, dropdown
      expect(container.querySelectorAll('.cube-skeleton')).toHaveLength(12)
    })
  })

  it('translates the button names', async () => {
    setContainerWidth(1000)
    render(
      <CubeUiLocaleProvider locale="zh-TW">
        <CubePagination totalItems={1203} currentPage={3} itemsPerPage={25} />
      </CubeUiLocaleProvider>,
    )

    expect(
      await screen.findByRole('button', { name: '第一頁' }),
    ).toBeInTheDocument()
    for (const name of ['上一頁', '下一頁', '最後一頁', '第 3 頁']) {
      expect(screen.getByRole('button', { name })).toBeInTheDocument()
    }

    await act(() => i18n.changeLanguage('en-US'))
  })

  it('has no accessibility violations', async () => {
    setContainerWidth(1000)
    const { container } = renderPagination({ currentPage: 25 })

    await act(async () => {})
    expect(await axe(container)).toHaveNoViolations()
  })
})
