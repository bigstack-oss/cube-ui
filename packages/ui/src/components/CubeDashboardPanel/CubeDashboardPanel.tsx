import { twMerge } from 'tailwind-merge'
import { CubeDashboardPanelCol } from './CubeDashboardPanelCol'
import { CubeDashboardPanelContentBox } from './CubeDashboardPanelContentBox'
import { CubeDashboardPanelHeader } from './CubeDashboardPanelHeader'
import { CubeDashboardPanelItem } from './CubeDashboardPanelItem'
import { CubeDashboardPanelRow } from './CubeDashboardPanelRow'
import { dashboardPanel } from './cubeDashboardPanelStyles'
import type { CubeDashboardPanelProps } from './cubeDashboardPanelTypes'

export const CubeDashboardPanel = (props: CubeDashboardPanelProps) => {
  const {
    className: classNameProp,
    useContentWrapper = true,
    children,
    ...headerProps
  } = props

  const className = twMerge(dashboardPanel(), classNameProp)

  return (
    <div
      className={className}
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <CubeDashboardPanelHeader {...headerProps} />
      {useContentWrapper ? (
        <CubeDashboardPanelContentBox>{children}</CubeDashboardPanelContentBox>
      ) : (
        children
      )}
    </div>
  )
}

CubeDashboardPanel.Col = CubeDashboardPanelCol
CubeDashboardPanel.Row = CubeDashboardPanelRow
CubeDashboardPanel.Item = CubeDashboardPanelItem
