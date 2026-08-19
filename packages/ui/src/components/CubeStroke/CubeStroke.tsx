import { twMerge } from 'tailwind-merge'
import type { CubeStrokeProps } from './cubeStrokeTypes'
import { stroke } from './cubeStrokeStyles'

export const CubeStroke = (props: CubeStrokeProps) => {
  const { className, type = 'regular', color } = props

  return <hr className={twMerge(stroke({ type }), color, className)} />
}
