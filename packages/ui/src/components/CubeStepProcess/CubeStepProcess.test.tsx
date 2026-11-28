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

describe('CubeStepProcess test IDs', () => {
  it('tags the process and each step, keyed by its number unless it passes data-key', () => {
    render(
      <CubeStepProcess data-testid="wizard">
        <CubeStepProcess.Item stepNumber={1} label="Network" isActive />
        <CubeStepProcess.Item
          stepNumber={2}
          label="Storage"
          isActive={false}
          data-key="storage"
        />
      </CubeStepProcess>,
    )

    expect(screen.getByTestId('wizard')).toBeInTheDocument()
    const steps = screen.getAllByTestId('wizard-item')
    expect(steps.map((s) => s.getAttribute('data-key'))).toEqual([
      '1',
      'storage',
    ])
    expect(steps[0]).toHaveTextContent('Network')
  })

  it.each([undefined, ''])(
    'renders no test IDs for a data-testid of %j',
    (testId) => {
      const { container } = render(
        <CubeStepProcess data-testid={testId}>
          <CubeStepProcess.Item stepNumber={1} label="Network" isActive />
        </CubeStepProcess>,
      )

      expect(container.querySelector('[data-testid]')).toBeNull()
      expect(container.querySelector('[data-key]')).toBeNull()
    },
  )
})
