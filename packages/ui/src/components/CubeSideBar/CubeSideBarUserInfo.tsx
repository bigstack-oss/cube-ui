import { testIdOf } from '@utils/testId'
import { CubeNagging } from '../CubeNagging/CubeNagging'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeSideBarBlock } from './CubeSideBarBlock'
import {
  dataCenterName,
  dataCenterVersion,
  userInfo,
  userInfoRow,
  userNameTag,
} from './cubeSideBarStyles'
import type { CubeSideBarProps } from './cubeSideBarTypes'

type CubeSideBarUserInfoProps = Pick<
  CubeSideBarProps,
  'isLoading' | 'dataCenter' | 'username' | 'naggingProps'
> & {
  testId?: string
}

export const CubeSideBarUserInfo = (props: CubeSideBarUserInfoProps) => {
  const {
    isLoading = false,
    dataCenter,
    username,
    naggingProps,
    testId,
  } = props

  const renderDataCenter = () => {
    if (isLoading) {
      return <CubeSkeleton className="h-[18px] w-[38px]" />
    }
    return (
      <span
        className={dataCenterName()}
        data-testid={testIdOf(testId, 'data-center')}
      >
        {dataCenter?.name || '-'}
      </span>
    )
  }

  const renderUserName = () => {
    if (isLoading) {
      return <CubeSkeleton className="h-[18px] w-[42px]" />
    }
    return (
      <div className={userNameTag()} data-testid={testIdOf(testId, 'username')}>
        {username || '-'}
      </div>
    )
  }

  const renderVersion = () => {
    if (isLoading) {
      return <CubeSkeleton className="h-[16px] w-[156px]" />
    }
    return (
      <span
        className={dataCenterVersion()}
        data-testid={testIdOf(testId, 'version')}
      >
        {dataCenter?.version || '-'}
      </span>
    )
  }

  return (
    <CubeSideBarBlock className={userInfo()}>
      <div className={userInfoRow()}>
        {renderDataCenter()}
        {renderUserName()}
      </div>
      {renderVersion()}
      {naggingProps && <CubeNagging {...naggingProps} variant="sidebar" />}
    </CubeSideBarBlock>
  )
}
