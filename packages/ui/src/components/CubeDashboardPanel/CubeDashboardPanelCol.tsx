import { twMerge } from 'tailwind-merge'
import { dashboardPanelCol } from './cubeDashboardPanelStyles'
import type { CubeDashboardPanelColProps } from './cubeDashboardPanelTypes'

export const CubeDashboardPanelCol = (props: CubeDashboardPanelColProps) => {
  const { className: classNameProp, children } = props

  const className = twMerge(dashboardPanelCol(), classNameProp)

  return <div className={className}>{children}</div>
}
