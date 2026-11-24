import { useContext } from 'react'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { title, titleSkeleton } from './cubeBackButtonStyles'
import type { CubeBackButtonTitleProps } from './cubeBackButtonTypes'

export const CubeBackButtonTitle = (props: CubeBackButtonTitleProps) => {
  const { children } = props

  const { isLoading } = useContext(CubeBackButtonContext)

  return isLoading ? (
    <CubeSkeleton className={titleSkeleton()} />
  ) : (
    <div className={title()}>{children}</div>
  )
}
