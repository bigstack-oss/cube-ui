import { CubeSideBarBottom } from './CubeSideBarBottom'
import { CubeSideBarCombobox } from './CubeSideBarCombobox'
import { CubeSideBarDivider } from './CubeSideBarDivider'
import { sideBar } from './cubeSideBarStyles'
import { CubeSideBarTitle } from './CubeSideBarTitle'
import type { CubeSideBarProps } from './cubeSideBarTypes'
import { CubeSideBarUserInfo } from './CubeSideBarUserInfo'

export const CubeSideBar = (props: CubeSideBarProps) => {
  const {
    LogoContainer,
    isLoading,
    dataCenter,
    username,
    options,
    links,
    naggingProps,
    utcTimeZone,
  } = props

  return (
    <div
      className={sideBar()}
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <CubeSideBarTitle LogoContainer={LogoContainer} />
      <CubeSideBarDivider />
      <CubeSideBarUserInfo
        isLoading={isLoading}
        dataCenter={dataCenter}
        username={username}
        naggingProps={naggingProps}
      />
      <CubeSideBarDivider />
      <CubeSideBarCombobox options={options} />
      <CubeSideBarDivider />
      <CubeSideBarBottom
        isLoading={isLoading}
        utcTimeZone={utcTimeZone}
        links={links}
      />
    </div>
  )
}
