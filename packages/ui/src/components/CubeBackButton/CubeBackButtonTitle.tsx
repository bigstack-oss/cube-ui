import { useContext } from 'react'
import { testIdOf } from '@utils/testId'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { title, titleSkeleton } from './cubeBackButtonStyles'
import type { CubeBackButtonTitleProps } from './cubeBackButtonTypes'

export const CubeBackButtonTitle = (props: CubeBackButtonTitleProps) => {
  const { children } = props

  const { isLoading, testId } = useContext(CubeBackButtonContext)

  return isLoading ? (
    <CubeSkeleton className={titleSkeleton()} />
  ) : (
    <div className={title()} data-testid={testIdOf(testId, 'title')}>
      {children}
    </div>
  )
}
