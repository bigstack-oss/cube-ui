import { CubeCountSegmentedChartColorDot } from './CubeCountSegmentedChartColorDot'
import {
  countInfo,
  countInfoCount,
  countInfoLabel,
  countInfoName,
} from './cubeCountSegmentedChartStyles'
import type { CubeCountSegmentedChartCountInfo as CountInfo } from './cubeCountSegmentedChartTypes'

type CubeCountSegmentedChartCountInfoProps = Omit<CountInfo, 'color'> &
  Partial<Pick<CountInfo, 'color'>>

export const CubeCountSegmentedChartCountInfo = (
  props: CubeCountSegmentedChartCountInfoProps,
) => {
  const { name, color, count } = props

  return (
    <div className={countInfo()}>
      <div className={countInfoLabel()}>
        {color && <CubeCountSegmentedChartColorDot color={color} />}
        <span className={countInfoName()}>{name}</span>
      </div>
      <span className={countInfoCount()}>{count}</span>
    </div>
  )
}
