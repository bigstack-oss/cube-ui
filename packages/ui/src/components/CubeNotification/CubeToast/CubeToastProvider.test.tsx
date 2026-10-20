import { act, render, screen } from '@testing-library/react'
import { CubeToastProvider } from './CubeToastProvider'
import { useCubeToast } from './useCubeToast'
import {
  MAX_VISIBLE_TOASTS_AMOUNT,
  TOAST_LIFETIME,
  type CubeToastType,
} from './cubeToastUtils'

const createToast = (n: number): CubeToastType => ({
  id: `toast-${n}`,
  message: `Message ${n}`,
  time: '2026/10/20 09:00',
})

let toastApi: ReturnType<typeof useCubeToast>

const Consumer = () => {
  toastApi = useCubeToast()
  return null
}

const renderProvider = () =>
  render(
    <CubeToastProvider>
      <Consumer />
    </CubeToastProvider>,
  )

describe('CubeToastProvider', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders added toasts in a portal on document.body', () => {
    const { container } = renderProvider()

    act(() => toastApi.addToast(createToast(1)))

    const message = screen.getByText('Message 1')
    expect(container).not.toContainElement(message)
    expect(document.body).toContainElement(message)
  })

  it('removes a toast with removeToast', () => {
    renderProvider()
    act(() => toastApi.addToast(createToast(1)))

    act(() => toastApi.removeToast('toast-1'))

    expect(screen.queryByText('Message 1')).not.toBeInTheDocument()
  })

  it('removes a toast after its lifetime', () => {
    renderProvider()
    act(() => toastApi.addToast(createToast(1)))

    act(() => vi.advanceTimersByTime(TOAST_LIFETIME - 1))
    expect(screen.getByText('Message 1')).toBeInTheDocument()

    act(() => vi.advanceTimersByTime(1))
    expect(screen.queryByText('Message 1')).not.toBeInTheDocument()
  })

  it(`shows at most ${MAX_VISIBLE_TOASTS_AMOUNT} toasts, dropping the oldest`, () => {
    renderProvider()

    act(() => {
      for (let n = 1; n <= MAX_VISIBLE_TOASTS_AMOUNT + 1; n++) {
        toastApi.addToast(createToast(n))
      }
    })

    expect(screen.queryByText('Message 1')).not.toBeInTheDocument()
    for (let n = 2; n <= MAX_VISIBLE_TOASTS_AMOUNT + 1; n++) {
      expect(screen.getByText(`Message ${n}`)).toBeInTheDocument()
    }
  })

  it('does not accept onClose (closing is owned by the provider)', () => {
    renderProvider()

    act(() =>
      toastApi.addToast({
        ...createToast(1),
        // @ts-expect-error onClose is not part of CubeToastType
        onClose: () => {},
      }),
    )

    expect(screen.getByText('Message 1')).toBeInTheDocument()
  })

  it('provides no-op functions outside a provider', () => {
    render(<Consumer />)

    expect(() => toastApi.addToast(createToast(1))).not.toThrow()
  })
})
