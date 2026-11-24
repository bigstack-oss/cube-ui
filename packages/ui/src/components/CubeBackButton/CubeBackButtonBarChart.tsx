import { useContext } from 'react'
import { CubeResourceUsageBar } from '../CubeProgressBar/CubeResourceUsageBar'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import {
  barChart,
  barChartBar,
  barChartLabel,
  barChartSkeleton,
} from './cubeBackButtonStyles'
import type { CubeBackButtonBarChartProps } from './cubeBackButtonTypes'

export const CubeBackButtonBarChart = (props: CubeBackButtonBarChartProps) => {
  const { label, progress } = props

  const { isLoading } = useContext(CubeBackButtonContext)

  if (isLoading) {
    return (
      <div className={barChartSkeleton()}>
        <CubeSkeleton className="h-[15px] w-[30px]" />
        <CubeSkeleton className="h-[9px] w-[58px]" />
        <CubeSkeleton className="h-[15px] w-[23px]" />
      </div>
    )
  }

  return (
    <div className={barChart()}>
      <span className={barChartLabel()}>{label}</span>
      <div className={barChartBar()}>
        <CubeResourceUsageBar progress={progress} />
      </div>
    </div>
  )
}
