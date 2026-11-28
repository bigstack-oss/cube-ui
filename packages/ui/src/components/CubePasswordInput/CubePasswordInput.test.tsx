import { render, screen } from '@testing-library/react'
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
