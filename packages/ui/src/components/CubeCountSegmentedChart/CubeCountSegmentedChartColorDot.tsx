import type { FillColorClass } from '@theme/tokens/cubeTheme'

const SIZE = 6

const radius = Math.ceil(SIZE / 2)

type CubeCountSegmentedChartColorDotProps = {
  color: FillColorClass
}

export const CubeCountSegmentedChartColorDot = (
  props: CubeCountSegmentedChartColorDotProps,
) => {
  const { color } = props

  return (
    <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={SIZE} height={SIZE}>
      <circle className={color} cx={radius} cy={radius} r={radius} />
    </svg>
  )
}
