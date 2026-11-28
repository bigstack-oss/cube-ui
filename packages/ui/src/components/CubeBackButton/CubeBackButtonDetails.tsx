import { useContext } from 'react'
import { testIdOf } from '@utils/testId'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { details, detailsSkeleton } from './cubeBackButtonStyles'
import type { CubeBackButtonDetailsProps } from './cubeBackButtonTypes'

export const CubeBackButtonDetails = (props: CubeBackButtonDetailsProps) => {
  const { children } = props

  const { isLoading, testId } = useContext(CubeBackButtonContext)

  return isLoading ? (
    <CubeSkeleton className={detailsSkeleton()} />
  ) : (
    <span className={details()} data-testid={testIdOf(testId, 'details')}>
      {children}
    </span>
  )
}
