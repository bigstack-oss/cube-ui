import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { CubeInput } from './CubeInput'

describe('CubeInput', () => {
  it('associates the label with the input for accessibility', () => {
    render(<CubeInput label="Email" />)

    expect(
      screen.getByLabelText('Email', { exact: false }),
    ).toBeInTheDocument()
  })

  it('renders a required marker when required', () => {
    render(<CubeInput label="Email" required />)

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('lets the user type into the input', async () => {
    const user = userEvent.setup()
    render(<CubeInput label="Email" />)

    const input = screen.getByLabelText('Email')
    await user.type(input, 'hello@cube.dev')

    expect(input).toHaveValue('hello@cube.dev')
  })

  it('shows the error message and hides the help message when errored', () => {
    render(
      <CubeInput
        label="Email"
        helpMessage="We'll never share your email."
        errorMessage="Email is invalid"
      />,
    )

    expect(screen.getByText('Email is invalid')).toBeInTheDocument()
    expect(
      screen.queryByText("We'll never share your email."),
    ).not.toBeInTheDocument()
  })

  it('shows the help message when there is no error', () => {
    render(<CubeInput label="Email" helpMessage="We'll never share it." />)

    expect(screen.getByText("We'll never share it.")).toBeInTheDocument()
  })

  it('renders skeletons instead of the real input while loading', () => {
    render(<CubeInput label="Email" isLoading />)

    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument()
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
  })

  it('forwards the ref to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<CubeInput label="Email" ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeInput label="Email" helpMessage="We'll never share your email." />,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
