import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { testIdOf } from '@utils/testId'
import { MonochromeChevronRight } from '@icons'
import type { CubeStepProcessItemProps } from './cubeStepProcessTypes'
import { CubeStepProcessTestIdContext } from './cubeStepProcessContext'
import { number, label as labelStyles } from './cubeStepProcessStyles'

export const CubeStepProcessItem = (props: CubeStepProcessItemProps) => {
  const { stepNumber, label, isActive, 'data-key': keyProp } = props

  const itemTestId = testIdOf(useContext(CubeStepProcessTestIdContext), 'item')

  return (
    <div
      className="group flex items-center gap-3"
      data-testid={itemTestId}
      // The number is stable; the label is shown (and translated).
      data-key={itemTestId ? (keyProp ?? String(stepNumber)) : undefined}
    >
      <div className="flex items-center gap-3">
        <div className={twMerge(number({ isActive }))}>
          {stepNumber.toString()}
        </div>
        <p className={twMerge(labelStyles({ isActive }))}>{label}</p>
      </div>
      <MonochromeChevronRight className="icon-lg text-functional-text-light group-last:hidden" />
    </div>
  )
}
