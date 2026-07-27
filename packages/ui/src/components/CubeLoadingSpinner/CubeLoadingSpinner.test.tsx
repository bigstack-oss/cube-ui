import { render } from '@testing-library/react'
import { CubeLoadingSpinner } from './CubeLoadingSpinner'
import {
  cubeLoadingSpinnerVariants,
  type CubeLoadingSpinnerVariant,
} from './cubeLoadingSpinnerTypes'

describe('CubeLoadingSpinner', () => {
  it.each(cubeLoadingSpinnerVariants)(
    'renders the %s variant',
    (variant: CubeLoadingSpinnerVariant) => {
      const { container } = render(<CubeLoadingSpinner variant={variant} />)

      expect(container.querySelector('svg')).toBeInTheDocument()
    },
  )

  it('forwards the className to the wrapping container', () => {
    const { container } = render(
      // Deliberately not a real Tailwind class - just verifying passthrough.
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <CubeLoadingSpinner variant="dot45" className="custom-class" />,
    )

    expect(container.firstChild).toHaveClass('custom-class')
  })
})
