import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import i18n from '@i18n/i18n'
import { CubeUpload } from './CubeUpload'
import type { CubeUploadProps } from './cubeUploadTypes'

// jsdom has no ResizeObserver; `.ProgressBar`'s bar observes its width.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

const renderUpload = (props: Partial<CubeUploadProps> = {}) =>
  render(<CubeUpload buttonText="Upload File" {...props} />)

const getButton = () => screen.getByRole('button', { name: 'Upload File' })

const getFileInput = (container: HTMLElement) =>
  container.querySelector<HTMLInputElement>('input[type="file"]')!

const scriptFile = new File(['echo hi'], 'script.sh', { type: 'text/plain' })

describe('CubeUpload', () => {
  it('renders the upload button, a hidden file input and the slots', () => {
    const { container } = renderUpload({
      leftSlot: <span>OS: Operating System</span>,
      rightSlot: <a href="#example">View example</a>,
      children: <p>Below the button</p>,
    })

    expect(getButton()).toHaveAttribute('type', 'button')
    expect(getButton().querySelector('svg')).toBeInTheDocument()
    expect(getFileInput(container)).toHaveClass('hidden')
    expect(screen.getByText('OS: Operating System')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'View example' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Below the button')).toBeInTheDocument()
  })

  it('passes accept, inputId and className through', () => {
    const { container } = renderUpload({
      accept: '.sh',
      inputId: 'script-upload',
      className: 'w-[600px]',
    })

    expect(getFileInput(container)).toHaveAttribute('accept', '.sh')
    expect(getFileInput(container)).toHaveAttribute('id', 'script-upload')
    expect(container.firstChild).toHaveClass('flex', 'gap-4', 'w-[600px]')
  })

  it('opens the file picker from the button', async () => {
    const user = userEvent.setup()
    const { container } = renderUpload()
    const onInputClick = vi.fn()
    getFileInput(container).addEventListener('click', onInputClick)

    await user.click(getButton())

    expect(onInputClick).toHaveBeenCalledTimes(1)
  })

  it('reports the picked file and allows picking it again', async () => {
    const user = userEvent.setup()
    const onFileChange = vi.fn()
    const { container } = renderUpload({ onFileChange })

    await user.upload(getFileInput(container), scriptFile)
    expect(onFileChange).toHaveBeenLastCalledWith(scriptFile)
    expect(getFileInput(container).value).toBe('')

    await user.upload(getFileInput(container), scriptFile)
    expect(onFileChange).toHaveBeenCalledTimes(2)
  })

  it('shows the button as loading and blocks the input while uploading', () => {
    const { container } = renderUpload({ isUploading: true })

    expect(getFileInput(container)).toBeDisabled()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('disables the button and the input', async () => {
    const user = userEvent.setup()
    const onFileChange = vi.fn()
    const { container } = renderUpload({ disabled: true, onFileChange })

    expect(getButton()).toBeDisabled()
    expect(getFileInput(container)).toBeDisabled()

    await user.upload(getFileInput(container), scriptFile)
    expect(onFileChange).not.toHaveBeenCalled()
  })

  describe('.File', () => {
    it('shows the file with a check icon and cancels it', async () => {
      const user = userEvent.setup()
      const onCancel = vi.fn()
      render(<CubeUpload.File onCancel={onCancel}>script.sh</CubeUpload.File>)

      const name = screen.getByText('script.sh')
      expect(name).toHaveClass('text-functional-title')
      const [status, cancel] = Array.from(
        name.closest('.justify-between')!.querySelectorAll('svg'),
      )
      expect(status).toHaveClass('text-status-positive')

      await user.click(cancel!)
      expect(onCancel).toHaveBeenCalledTimes(1)
    })

    it('greys out and does not cancel while disabled', async () => {
      const user = userEvent.setup()
      const onCancel = vi.fn()
      render(
        <CubeUpload.File disabled onCancel={onCancel}>
          script.sh
        </CubeUpload.File>,
      )

      const name = screen.getByText('script.sh')
      expect(name).toHaveClass('text-functional-text-light')
      const [status, cancel] = Array.from(
        name.closest('.justify-between')!.querySelectorAll('svg'),
      )
      expect(status).toHaveClass('text-functional-disable-text')
      expect(cancel).toHaveClass('cursor-default')

      await user.click(cancel!)
      expect(onCancel).not.toHaveBeenCalled()
    })
  })

  describe('.ProgressBar', () => {
    it('shows the file name and progress, and aborts', async () => {
      const user = userEvent.setup()
      const onAbortClick = vi.fn()
      const { container } = render(
        <CubeUpload.ProgressBar
          fileName="script.sh"
          progress={87}
          onAbortClick={onAbortClick}
        />,
      )

      expect(screen.getByText('script.sh')).toHaveClass('truncate')
      expect(container.querySelector('.bg-chart-2')).toHaveStyle({
        width: '87%',
      })

      await user.click(container.querySelector('svg.cursor-pointer')!)
      expect(onAbortClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('.Error', () => {
    it('shows the message and closes with a named button', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      render(<CubeUpload.Error message="Upload failed" onClose={onClose} />)

      expect(screen.getByText('Upload failed')).toHaveClass('truncate')

      await user.click(screen.getByRole('button', { name: 'Close Error' }))
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('translates the close button in zh-TW', async () => {
      await act(() => i18n.changeLanguage('zh-TW'))
      render(<CubeUpload.Error message="Upload failed" />)

      expect(
        screen.getByRole('button', { name: '關閉錯誤' }),
      ).toBeInTheDocument()

      await act(() => i18n.changeLanguage('en-US'))
    })
  })

  it('has no axe violations', async () => {
    // jsdom does not load Tailwind, so add the rule that hides the file input
    // (axe skips it in a browser, where it is `display: none`).
    const style = document.createElement('style')
    style.textContent = '.hidden { display: none; }'
    document.head.append(style)

    const { container } = renderUpload({
      leftSlot: <span>OS: Operating System</span>,
      children: (
        <>
          <CubeUpload.ProgressBar
            fileName="script.sh"
            progress={40}
            onAbortClick={() => {}}
          />
          <CubeUpload.File onCancel={() => {}}>script.sh</CubeUpload.File>
          <CubeUpload.Error message="Upload failed" />
        </>
      ),
    })

    expect(await axe(container)).toHaveNoViolations()

    style.remove()
  })
})
