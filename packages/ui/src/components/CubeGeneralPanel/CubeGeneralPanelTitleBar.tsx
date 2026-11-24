import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { generalPanelTitleBar } from './cubeGeneralPanelStyles'
import type { CubeGeneralPanelTitleBarProps } from './cubeGeneralPanelTypes'

export const CubeGeneralPanelTitleBar = (
  props: CubeGeneralPanelTitleBarProps,
) => {
  const { title, hyperLinkProps, time, isTimeLoading = false, dropdown } = props

  const renderTime = () => {
    if (isTimeLoading) return <CubeSkeleton className="h-[13px] w-[97px]" />
    if (!time) return null

    return (
      <span className="secondary-body5 text-functional-text-light">{time}</span>
    )
  }

  const timeElement = renderTime()

  return (
    <div className={generalPanelTitleBar()}>
      <div className="flex items-center gap-x-3">
        <span className="secondary-body1 text-functional-text-light">
          {title}
        </span>
        {hyperLinkProps && (
          <CubeHyperlink variant="text-inline" size="sm" {...hyperLinkProps} />
        )}
      </div>
      {(timeElement || dropdown) && (
        <div className="flex items-end gap-x-2">
          {timeElement}
          {dropdown}
        </div>
      )}
    </div>
  )
}
