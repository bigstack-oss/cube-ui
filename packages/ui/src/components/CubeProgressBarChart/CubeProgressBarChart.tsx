import { CubeProgressBar } from '../CubeProgressBar/CubeProgressBar'
import { CubeResourceUsageBar } from '../CubeProgressBar/CubeResourceUsageBar'
import type { CubeProgressBarProps } from '../CubeProgressBar/cubeProgressBarTypes'

export type CubeProgressBarChartProps = {
  title: string
  subtext?: string
  /**
   * @default false
   */
  isLoading?: boolean
  skeletonClassName?: string
} & Pick<CubeProgressBarProps, 'progress' | 'className'>

export const CubeProgressBarChart = (props: CubeProgressBarChartProps) => {
  const {
    title,
    subtext,
    isLoading = false,
    skeletonClassName,
    progress,
    ...restProps
  } = props

  return (
    <div className="flex flex-1 flex-col items-stretch gap-y-[14px]">
      <div className="flex items-center gap-x-3">
        <span className="primary-body3 text-functional-text">{title}</span>
        <span className="primary-body3 text-functional-text">{subtext}</span>
      </div>
      {isLoading ? (
        <CubeProgressBar.Skeleton className={skeletonClassName} />
      ) : (
        <CubeResourceUsageBar {...restProps} progress={progress} />
      )}
    </div>
  )
}
