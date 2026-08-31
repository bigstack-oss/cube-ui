import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import { CubeStepProcess } from './CubeStepProcess'

describe('CubeStepProcess', () => {
  it('renders each step item with its label', () => {
    render(
      <CubeStepProcess>
        <CubeStepProcess.Item stepNumber={1} label="Step One" isActive />
        <CubeStepProcess.Item
          stepNumber={2}
          label="Step Two"
          isActive={false}
        />
      </CubeStepProcess>,
    )

    expect(screen.getByText('Step One')).toBeInTheDocument()
    expect(screen.getByText('Step Two')).toBeInTheDocument()
  })

  it.each([true, false])(
    'renders an item without crashing when isActive is %s',
    (isActive) => {
      render(
        <CubeStepProcess>
          <CubeStepProcess.Item
            stepNumber={1}
            label="Step One"
            isActive={isActive}
          />
        </CubeStepProcess>,
      )

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByText('Step One')).toBeInTheDocument()
    },
  )

  it('renders its skeleton instead of the real steps while loading', () => {
    render(
      <CubeStepProcess isLoading>
        <CubeStepProcess.Item stepNumber={1} label="Step One" isActive />
      </CubeStepProcess>,
    )

    expect(screen.queryByText('Step One')).not.toBeInTheDocument()
  })

  it('renders length steps in the skeleton', () => {
    const { container } = render(<CubeStepProcess.Skeleton length={3} />)

    expect(container.querySelectorAll('.group')).toHaveLength(3)
  })

  it('has no accessibility violations', async () => {
    const { container } = render(
      <CubeStepProcess>
        <CubeStepProcess.Item stepNumber={1} label="Step One" isActive />
        <CubeStepProcess.Item
          stepNumber={2}
          label="Step Two"
          isActive={false}
        />
      </CubeStepProcess>,
    )

    expect(await axe(container)).toHaveNoViolations()
  })
})
