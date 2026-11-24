import { twMerge } from 'tailwind-merge'
import { CubeGeneralPanelContainer } from './CubeGeneralPanelContainer'
import { CubeGeneralPanelTitleBar } from './CubeGeneralPanelTitleBar'
import { generalPanel } from './cubeGeneralPanelStyles'
import type { CubeGeneralPanelProps } from './cubeGeneralPanelTypes'

export const CubeGeneralPanel = (props: CubeGeneralPanelProps) => {
  const {
    children,
    className: classNameProps,
    containerClassName,
    topic,
    leftSlot,
    rightSlot,
    subtext,
    titleBarProps,
  } = props

  const renderHeader = () => {
    if (!topic && !leftSlot && !rightSlot) return null

    return (
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-x-3">
          {topic && (
            <span className="secondary-h4 font-semibold text-functional-title">
              {topic}
            </span>
          )}
          {leftSlot}
        </div>
        <div className="flex items-center gap-x-3">{rightSlot}</div>
      </div>
    )
  }

  return (
    <CubeGeneralPanelContainer className={containerClassName}>
      {titleBarProps && <CubeGeneralPanelTitleBar {...titleBarProps} />}
      <div
        className={twMerge(generalPanel(), classNameProps)}
        style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
      >
        {renderHeader()}
        {subtext && (
          <span className="primary-body3 text-functional-text">{subtext}</span>
        )}
        <div className="primary-body5 text-functional-text-light">
          {children}
        </div>
      </div>
    </CubeGeneralPanelContainer>
  )
}

CubeGeneralPanel.Container = CubeGeneralPanelContainer
CubeGeneralPanel.TitleBar = CubeGeneralPanelTitleBar
