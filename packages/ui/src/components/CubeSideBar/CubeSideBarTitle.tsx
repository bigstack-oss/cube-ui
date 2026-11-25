import { cloneElement } from 'react'
import { ColoredCubeCosFullLogo } from '@icons'
import { CubeSideBarBlock } from './CubeSideBarBlock'
import { logo, title } from './cubeSideBarStyles'
import type { CubeSideBarProps } from './cubeSideBarTypes'

type CubeSideBarTitleProps = Pick<CubeSideBarProps, 'LogoContainer'>

export const CubeSideBarTitle = (props: CubeSideBarTitleProps) => {
  const { LogoContainer } = props

  const renderLogo = () => {
    const logoElement = <ColoredCubeCosFullLogo className={logo()} />

    if (LogoContainer) {
      return cloneElement(LogoContainer, {
        children: logoElement,
      })
    }

    return logoElement
  }

  return <CubeSideBarBlock className={title()}>{renderLogo()}</CubeSideBarBlock>
}
