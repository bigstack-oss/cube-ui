import type { PropsWithChildren } from 'react'
import { MonochromeInformationCircleFilled } from '@icons'
import { iconWrap, information } from './cubeInformationStyles'

export type CubeInformationProps = PropsWithChildren<{
  /**
   * @default false
   */
  showIcon?: boolean
}>

export const CubeInformation = (props: CubeInformationProps) => {
  const { children, showIcon = false } = props

  return (
    <div className={information()}>
      {showIcon && (
        <div className={iconWrap()}>
          <MonochromeInformationCircleFilled className="icon-md" />
        </div>
      )}
      {children}
    </div>
  )
}
