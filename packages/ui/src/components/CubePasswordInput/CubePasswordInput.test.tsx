import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CubePasswordInput } from './CubePasswordInput'

// Only the test-ID behavior is covered here so far; the component's other
// behavior has no tests yet.
describe('CubePasswordInput test IDs', () => {
  it('puts data-testid on the password input and tags its help message', () => {
    render(
      <CubePasswordInput
        label="Password"
        helpMessage="At least 12 characters."
        data-testid="login-password"
      />,
    )

    expect(screen.getByTestId('login-password')).toBe(
      screen.getByLabelText('Password'),
    )
    expect(screen.getByTestId('login-password')).toHaveAttribute(
      'type',
      'password',
    )
    expect(screen.getByTestId('login-password-help')).toHaveTextContent(
      'At least 12 characters.',
    )
  })
})

describe('CubePasswordInput show / hide test ID', () => {
  it('tags the show / hide toggle, which reveals the password', async () => {
    const user = userEvent.setup()
    render(<CubePasswordInput label="Password" data-testid="login-password" />)

    expect(screen.getByTestId('login-password')).toHaveAttribute(
      'type',
      'password',
    )
    await user.click(screen.getByTestId('login-password-toggle'))
    expect(screen.getByTestId('login-password')).toHaveAttribute('type', 'text')
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      const { container } = render(
        <CubePasswordInput label="Password" data-testid={testId} />,
      )

      expect(container.querySelector('[data-testid]')).toBeNull()
    },
  )
})
