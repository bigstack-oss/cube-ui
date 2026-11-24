import { useContext } from 'react'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { details, detailsSkeleton } from './cubeBackButtonStyles'
import type { CubeBackButtonDetailsProps } from './cubeBackButtonTypes'

export const CubeBackButtonDetails = (props: CubeBackButtonDetailsProps) => {
  const { children } = props

  const { isLoading } = useContext(CubeBackButtonContext)

  return isLoading ? (
    <CubeSkeleton className={detailsSkeleton()} />
  ) : (
    <span className={details()}>{children}</span>
  )
}
