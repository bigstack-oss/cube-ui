import type { CubeIconSize } from '../CubeIcon/cubeIconTypes'
import type { CubeButtonSize } from './cubeButtonTypes'
import { getIconSizeClass } from '../CubeIcon/cubeIconUtils'

export const getIconSizeByButtonSize = (size: CubeButtonSize) => {
  const sizeMapping: Record<CubeButtonSize, CubeIconSize> = {
    sm: 'md-sm',
    md: 'md',
    lg: 'md',
  }
  const iconSize = sizeMapping[size]

  return getIconSizeClass(iconSize)
}
