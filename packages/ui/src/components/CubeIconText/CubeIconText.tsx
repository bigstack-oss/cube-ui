import { twMerge } from 'tailwind-merge'
import type { CubeIconTextProps } from './cubeIconTextTypes'
import { iconText } from './cubeIconTextStyles'

export const CubeIconText = (props: CubeIconTextProps) => {
  const { className, type, children } = props

  return (
    <span className={twMerge(iconText({ type }), className)}>{children}</span>
  )
}
