import { createRef, useState, type ChangeEvent } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeTextarea, type CubeTextareaProps } from './CubeTextarea'

// jsdom has no ResizeObserver; `useVisibleRowsCount` needs one to observe
// the textarea. A no-op stub is enough since these tests don't assert on
// the line-clamp behavior it drives.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', ResizeObserverStub)

// `CubeTextarea` is fully controlled: it has no internal `value` state, so
// `defaultValue` alone won't populate the character counter. Mirrors how
// the old repo's story wrapper drove it.
const ControlledTextarea = (
  props: Omit<CubeTextareaProps, 'value' | 'onChange'> & {
    defaultValue?: string
  },
) => {
  const { defaultValue, ...restProps } = props
  const [value, setValue] = useState(defaultValue)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  return <CubeTextarea {...restProps} value={value} onChange={handleChange} />
}

describe('CubeTextarea', () => {
  // The label is only linked to the textarea via a matching `id` — unlike
  // `CubeInput`, this component has no `useId()` fallback, so callers must
  // supply one for the label association (and axe checks) to hold.
  it('associates the label with the textarea for accessibility when an id is provided', () => {
    render(<CubeTextarea id="bio" label="Bio" maxLength={100} />)

    expect(screen.getByLabelText('Bio', { exact: false })).toBeInTheDocument()
  })

  it('shows the character count against maxLength', () => {
    render(
      <ControlledTextarea
        id="bio"
        label="Bio"
        maxLength={100}
        defaultValue="Hello"
      />,
    )

    expect(screen.getByText('5/100')).toBeInTheDocument()
  })

  it('lets the user type up to maxLength and no further', async () => {
    const user = userEvent.setup()
    render(<ControlledTextarea id="bio" label="Bio" maxLength={5} />)

    const textarea = screen.getByLabelText('Bio')
    await user.type(textarea, 'Hello World')

    expect(textarea).toHaveValue('Hello')
    expect(screen.getByText('5/5')).toBeInTheDocument()
  })

  it('disables the underlying textarea when disabled', () => {
    render(<CubeTextarea id="bio" label="Bio" maxLength={100} disabled />)

    expect(screen.getByLabelText('Bio', { exact: false })).toBeDisabled()
  })

  it('shows the error message when provided', () => {
    render(
      <CubeTextarea
        id="bio"
        label="Bio"
        maxLength={100}
        errorMessage="Bio is required"
      />,
    )

    expect(screen.getByText('Bio is required')).toBeInTheDocument()
  })

  it('renders its skeleton instead of the real textarea while loading', () => {
    render(<CubeTextarea id="bio" label="Bio" maxLength={100} isLoading />)

    expect(screen.queryByLabelText('Bio')).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('forwards the ref to the underlying textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<CubeTextarea id="bio" label="Bio" maxLength={100} ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })

  it('has no accessibility violations when an id is provided', async () => {
    const { container } = render(
      <CubeTextarea id="bio" label="Bio" maxLength={100} />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
