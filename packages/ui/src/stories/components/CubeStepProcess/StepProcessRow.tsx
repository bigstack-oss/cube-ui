import { SubHeading } from '@internals/components/SubHeading'
import { CubeStepProcess } from '@components/CubeStepProcess'

export const DEFAULT_STEPS = [
  { stepNumber: 1, label: 'Step Title 1' },
  { stepNumber: 2, label: 'Step Title 2' },
  { stepNumber: 3, label: 'Step Title 3' },
  { stepNumber: 4, label: 'Step Title 4' },
  { stepNumber: 5, label: 'Step Title 5' },
] as const

export type StepProcessRowProps = {
  title: string
  isLoading?: boolean
  activeIndexes: number[]
}

export const StepProcessRow = (props: StepProcessRowProps) => {
  const { title, isLoading = false, activeIndexes } = props

  return (
    <div className="grid grid-cols-4 items-center gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      <div className="col-span-3">
        <CubeStepProcess isLoading={isLoading}>
          {DEFAULT_STEPS.map((step, index) => (
            <CubeStepProcess.Item
              key={`active-${step.label}-${index}`}
              stepNumber={step.stepNumber}
              label={step.label}
              isActive={activeIndexes.includes(index)}
            />
          ))}
        </CubeStepProcess>
      </div>
    </div>
  )
}
