import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { useTimeZoneTime } from '@internals/utils/timeZone/useTimeZoneTime'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeTag } from '../CubeTag/CubeTag'
import { CubeSideBarBlock } from './CubeSideBarBlock'
import { timeZone, timeZoneTime, timeZoneTitle } from './cubeSideBarStyles'
import { utcTimeZoneToDisplay } from './cubeSideBarUtils'

type CubeSideBarTimeZoneProps = {
  isLoading: boolean
  utcTimeZone: string | undefined
}

export const CubeSideBarTimeZone = (props: CubeSideBarTimeZoneProps) => {
  const { isLoading, utcTimeZone } = props

  const { t } = useCubeUiTranslation()

  const now = useTimeZoneTime(utcTimeZone, 1000)

  const renderTime = () => {
    if (isLoading) {
      return <CubeSkeleton className="mb-2 h-[15px] w-[156px] rounded-[5px]" />
    }

    return <p className={timeZoneTime()}>{now.format('YYYY/MM/DD HH:mm:ss')}</p>
  }

  const renderTimeZone = () => {
    /**
     * TODO: Replace CubeSkeleton with the loading state of `CubeTag`
     */
    if (isLoading) {
      return <CubeSkeleton className="h-[23px] w-[58px] rounded-full" />
    }

    return (
      <CubeTag color="primary-blue" variant="stroke">
        {`UTC ${utcTimeZoneToDisplay(utcTimeZone)}`}
      </CubeTag>
    )
  }

  return (
    <CubeSideBarBlock className={timeZone()}>
      <p className={timeZoneTitle()}>{t('component.sideBar.dataCenterTime')}</p>
      {renderTime()}
      {renderTimeZone()}
    </CubeSideBarBlock>
  )
}
