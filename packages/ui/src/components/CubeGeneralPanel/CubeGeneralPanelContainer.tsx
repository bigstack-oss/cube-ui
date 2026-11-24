import { twMerge } from 'tailwind-merge'
import { generalPanelContainer } from './cubeGeneralPanelStyles'
import type { CubeGeneralPanelContainerProps } from './cubeGeneralPanelTypes'

export const CubeGeneralPanelContainer = (
  props: CubeGeneralPanelContainerProps,
) => {
  const { className: classNameProps, children } = props
  const className = twMerge(generalPanelContainer(), classNameProps)

  return <div className={className}>{children}</div>
}
