import { CubeLoadingSpinner } from '../CubeLoadingSpinner'
import type { CubeButtonType, CubeButtonUsage } from './cubeButtonTypes'
import { loadingSpinner } from './cubeButtonStyles'

type CubeButtonLoadingSpinnerProps = {
  type: CubeButtonType
  usage: CubeButtonUsage
}

export const CubeButtonLoadingSpinner = (
  props: CubeButtonLoadingSpinnerProps,
) => {
  const { type, usage } = props
  return (
    <CubeLoadingSpinner
      variant="dot45"
      className={loadingSpinner({ type, usage })}
    />
  )
}
