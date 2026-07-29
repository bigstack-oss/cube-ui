import type { ComponentType } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import { CubeLogoSpinner } from './Spinners/CubeLogoSpinner'
import { CubeDotSpinner120 } from './Spinners/CubeDotSpinner120'
import { CubeDotSpinner45 } from './Spinners/CubeDotSpinner45'
import type {
  CubeLoadingSpinnerProps,
  CubeLoadingSpinnerVariant,
} from './cubeLoadingSpinnerTypes'

const spinnerComponents: Record<
  CubeLoadingSpinnerVariant,
  ComponentType<PropsWithClassName>
> = {
  dot45: CubeDotSpinner45,
  dot120: CubeDotSpinner120,
  cube: CubeLogoSpinner,
}

export const CubeLoadingSpinner = (props: CubeLoadingSpinnerProps) => {
  const { variant, className } = props

  const Component = spinnerComponents[variant]

  return <Component className={className} />
}
