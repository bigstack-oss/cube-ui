import { cloneElement } from 'react'
import { ColoredCubeCosFullLogo } from '@icons'
import { testIdOf } from '@utils/testId'
import { CubeSideBarBlock } from './CubeSideBarBlock'
import { logo, title } from './cubeSideBarStyles'
import type { CubeSideBarProps } from './cubeSideBarTypes'

type CubeSideBarTitleProps = Pick<CubeSideBarProps, 'LogoContainer'> & {
  testId?: string
}

export const CubeSideBarTitle = (props: CubeSideBarTitleProps) => {
  const { LogoContainer, testId } = props

  const renderLogo = () => {
    const logoElement = (
      <ColoredCubeCosFullLogo
        className={logo()}
        data-testid={testIdOf(testId, 'logo')}
      />
    )

    if (LogoContainer) {
      return cloneElement(LogoContainer, {
        children: logoElement,
      })
    }

    return logoElement
  }

  return <CubeSideBarBlock className={title()}>{renderLogo()}</CubeSideBarBlock>
}
