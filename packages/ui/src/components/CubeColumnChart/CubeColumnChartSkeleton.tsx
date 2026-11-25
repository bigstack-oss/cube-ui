import { range } from 'lodash'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import {
  skeleton,
  skeletonBar,
  skeletonBars,
  skeletonLabels,
  skeletonRow,
  skeletonRows,
} from './cubeColumnChartStyles'

const COLUMN_COUNT = 10
const ROW_COUNT = 6

export const CubeColumnChartSkeleton = () => {
  return (
    <div className={skeleton()}>
      {/* Y-axis labels and background lines. */}
      <div className={skeletonRows()}>
        {range(ROW_COUNT).map((i) => (
          <div key={i} className={skeletonRow()}>
            <CubeSkeleton className="h-[20px] w-[25px]" />
            <CubeSkeleton className="h-px w-[544px] grow" />
          </div>
        ))}
      </div>
      {/* X-axis bars */}
      <div className={skeletonBars()}>
        {range(COLUMN_COUNT).map((i) => (
          <div key={i} className={skeletonBar()}>
            <CubeSkeleton className="h-[200px] w-[16px] rounded-b-none" />
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className={skeletonLabels()}>
        {range(COLUMN_COUNT).map((i) => (
          <CubeSkeleton key={i} className="h-[20px] w-[48px]" />
        ))}
      </div>
    </div>
  )
}
