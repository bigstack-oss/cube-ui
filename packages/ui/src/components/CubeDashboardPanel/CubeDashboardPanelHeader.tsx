import { cloneElement } from 'react'
import { MonochromeChevronRight, MonochromeWarningAltFilled } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import type { CubeDashboardPanelHeaderProps } from './cubeDashboardPanelTypes'

export const CubeDashboardPanelHeader = (
  props: CubeDashboardPanelHeaderProps,
) => {
  const {
    title,
    errorCount = 0,
    time,
    isTimeLoading = false,
    hyperLinkProps,
    HyperLinkContainer,
  } = props

  const { t } = useCubeUiTranslation()

  const renderTime = () => {
    if (isTimeLoading) return <CubeSkeleton className="h-[13px] w-[97px]" />
    if (!time) return null

    return (
      <span className="secondary-body5 text-functional-text-light">{time}</span>
    )
  }

  const renderHyperlink = () => {
    const linkElement = hyperLinkProps && (
      <CubeHyperlink
        variant="icon-right"
        size="sm"
        Icon={MonochromeChevronRight}
        {...hyperLinkProps}
      >
        {t('component.panel.viewAll')}
      </CubeHyperlink>
    )

    if (!linkElement) return undefined
    if (!HyperLinkContainer) return linkElement

    return cloneElement(HyperLinkContainer, {
      children: linkElement,
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <span className="secondary-body1 text-primary">{title}</span>
        {errorCount > 0 && (
          <div className="flex items-center gap-x-1 text-status-negative">
            <MonochromeWarningAltFilled className="icon-md" />
            <span className="primary-body3">
              {errorCount} {t('component.panel.error', { count: errorCount })}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-2.5">
        {renderTime()}
        {renderHyperlink()}
      </div>
    </div>
  )
}
