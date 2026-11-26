import { useMemo } from 'react'
import { range } from 'lodash'
import { CubeSegmentedBar } from '../CubeSegmentedBar/CubeSegmentedBar'
import { CubeSegmentedBarSkeleton } from '../CubeSegmentedBar/CubeSegmentedBarSkeleton'
import type { Segment } from '../CubeSegmentedBar/cubeSegmentedBarUtils'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeCountSegmentedChartCountInfo } from './CubeCountSegmentedChartCountInfo'
import {
  barSection,
  container,
  counts,
  countSkeleton,
  header,
  subtext as subtextStyle,
  title as titleStyle,
} from './cubeCountSegmentedChartStyles'
import type { CubeCountSegmentedChartProps } from './cubeCountSegmentedChartTypes'
import { mapToSegment } from './cubeCountSegmentedChartUtils'

export const CubeCountSegmentedChart = (
  props: CubeCountSegmentedChartProps,
) => {
  const {
    title,
    subtext,
    overview,
    countInfos,
    isLoading,
    skeletonCount = 5,
  } = props

  const segments = useMemo<Segment[]>(
    () => countInfos.map(mapToSegment),
    [countInfos],
  )

  const renderSubtext = () => {
    if (subtext === undefined) return null
    if (isLoading) return <CubeSkeleton className="h-[18px] w-[48px]" />

    return <span className={subtextStyle()}>{subtext}</span>
  }

  const renderHeader = () => {
    if (!title && !subtext) return null
    return (
      <div className={header()}>
        <span className={titleStyle()}>{title}</span>
        {renderSubtext()}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={container()}>
        <div className={barSection()}>
          {renderHeader()}
          <CubeSegmentedBarSkeleton />
        </div>
        <div className={counts({ isLoading: true })}>
          {range(skeletonCount).map((index) => (
            <div key={index} className={countSkeleton()}>
              <CubeSkeleton className="h-[15px] w-full" />
              <CubeSkeleton className="h-[22px] w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={container()}>
      <div className={barSection()}>
        {renderHeader()}
        <CubeSegmentedBar rounded segments={segments} />
      </div>
      <div className={counts({ isLoading: false })}>
        {overview && <CubeCountSegmentedChartCountInfo {...overview} />}
        {countInfos.map((segment) => (
          <CubeCountSegmentedChartCountInfo key={segment.name} {...segment} />
        ))}
      </div>
    </div>
  )
}
