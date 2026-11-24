import type { PropsWithChildren } from 'react'
import { CubeDashboardPanelCol } from './CubeDashboardPanelCol'
import { dashboardPanelContentBox } from './cubeDashboardPanelStyles'

export const CubeDashboardPanelContentBox = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div className={dashboardPanelContentBox()}>
      <CubeDashboardPanelCol>{children}</CubeDashboardPanelCol>
    </div>
  )
}
