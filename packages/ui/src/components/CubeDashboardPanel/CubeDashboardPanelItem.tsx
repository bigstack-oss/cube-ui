import { cloneElement } from 'react'
import { twMerge } from 'tailwind-merge'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { dashboardPanelItem } from './cubeDashboardPanelStyles'
import type { CubeDashboardPanelItemProps } from './cubeDashboardPanelTypes'

export const CubeDashboardPanelItem = (props: CubeDashboardPanelItemProps) => {
  const {
    className: classNameProp,
    topic,
    subtext,
    isSubtextLoading = false,
    button,
    children,
  } = props

  const className = twMerge(dashboardPanelItem(), classNameProp)

  const renderSubtext = () => {
    if (isSubtextLoading) {
      return <CubeSkeleton className="h-[18px] w-[79px]" />
    }
    if (!subtext) {
      return null
    }

    return <span className="primary-body3 text-functional-text">{subtext}</span>
  }

  const renderHeader = () => {
    if (!topic && !subtext && !isSubtextLoading) return null

    return (
      <div className="flex items-center gap-x-3">
        {topic && (
          <span className="primary-body2 font-medium text-functional-title">
            {topic}
          </span>
        )}
        {renderSubtext()}
      </div>
    )
  }

  const renderFooter = () => {
    if (!button) return null

    const panelButton = cloneElement(button, { size: 'md', type: 'primary' })

    return <div className="flex items-center justify-end">{panelButton}</div>
  }

  return (
    <div className={className}>
      {renderHeader()}
      <div className="primary-body5 text-functional-text-light">{children}</div>
      {renderFooter()}
    </div>
  )
}
