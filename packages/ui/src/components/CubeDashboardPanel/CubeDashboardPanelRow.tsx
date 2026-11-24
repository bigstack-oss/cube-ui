import { twMerge } from 'tailwind-merge'
import { dashboardPanelRow } from './cubeDashboardPanelStyles'
import type { CubeDashboardPanelRowProps } from './cubeDashboardPanelTypes'

export const CubeDashboardPanelRow = (props: CubeDashboardPanelRowProps) => {
  const { className: classNameProp, children } = props

  const className = twMerge(dashboardPanelRow(), classNameProp)

  return <div className={className}>{children}</div>
}
