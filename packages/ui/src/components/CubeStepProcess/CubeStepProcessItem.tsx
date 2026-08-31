import { twMerge } from 'tailwind-merge'
import { MonochromeChevronRight } from '@icons'
import type { CubeStepProcessItemProps } from './cubeStepProcessTypes'
import { number, label as labelStyles } from './cubeStepProcessStyles'

export const CubeStepProcessItem = (props: CubeStepProcessItemProps) => {
  const { stepNumber, label, isActive } = props
  return (
    <div className="group flex items-center gap-3">
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
