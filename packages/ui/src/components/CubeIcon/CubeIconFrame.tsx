import { cloneElement } from 'react'
import type { CubeIconFrameProps } from './cubeIconTypes'
import { getContainerClasses, getIconClasses } from './cubeIconUtils'

export const CubeIconFrame = (props: CubeIconFrameProps) => {
  const { className: classNameProps, size = 'md', children, onClick } = props

  const containerClasses = getContainerClasses(size, classNameProps)

  const iconClasses = getIconClasses(size, children.props.className)

  const icon = cloneElement(children, { className: iconClasses })

  return (
    <div className={containerClasses} onClick={onClick}>
      {icon}
    </div>
  )
}
