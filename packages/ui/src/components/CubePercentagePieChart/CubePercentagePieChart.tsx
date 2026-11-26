import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubePercentagePieChartPie } from './CubePercentagePieChartPie'
import { CubePercentagePieChartSkeleton } from './CubePercentagePieChartSkeleton'
import {
  chart,
  overThreshold,
  percentage as percentageStyle,
  pieDetails,
  pieLabel,
  pieWrap,
  title as titleStyle,
  total as totalStyle,
  usage,
} from './cubePercentagePieChartStyles'
import type { CubePercentagePieChartProps } from './cubePercentagePieChartTypes'
import {
  calculatePercentage,
  defaultPercentageFormatter,
  getChartPercentage,
  getPercentageColor,
} from './cubePercentagePieChartUtils'

export const CubePercentagePieChart = (props: CubePercentagePieChartProps) => {
  const {
    title,
    unit,
    total,
    used,
    percentage: percentageProp,
    color: colorProp,
    thresholdPercentage = 100,
    percentageFormatter = defaultPercentageFormatter,
    overThresholdText: overThresholdTextProps,
    isLoading = false,
  } = props

  const { t } = useCubeUiTranslation()

  const overThresholdText =
    overThresholdTextProps ?? t('component.percentagePieChart.overThreshold')

  const chartPercentage = getChartPercentage(
    percentageProp ?? calculatePercentage(used, total),
  )
  const color = colorProp ?? getPercentageColor(chartPercentage)
  const isOverThreshold = chartPercentage > thresholdPercentage

  return (
    <div className={chart()}>
      <span className={titleStyle()}>{title}</span>
      {isLoading ? (
        <CubePercentagePieChartSkeleton />
      ) : (
        <>
          <div className={pieWrap()}>
            <CubePercentagePieChartPie
              color={color}
              percentage={chartPercentage}
              thresholdPercentage={thresholdPercentage}
            />
            <div className={pieLabel()}>
              <span className={percentageStyle()}>
                {percentageFormatter(chartPercentage)}
              </span>
              <div className={pieDetails()}>
                <span className={totalStyle()}>{`${total} ${unit}`}</span>
                {isOverThreshold && (
                  <span className={overThreshold()}>{overThresholdText}</span>
                )}
              </div>
            </div>
          </div>
          <span className={usage()}>
            {`${used}/${total} ${unit} ${t('component.percentagePieChart.used')}`}
          </span>
        </>
      )}
    </div>
  )
}
