import { useContext } from 'react'
import { testIdOf } from '@utils/testId'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { linkSkeleton } from './cubeBackButtonStyles'
import type { CubeBackButtonLinkProps } from './cubeBackButtonTypes'

export const CubeBackButtonLink = (props: CubeBackButtonLinkProps) => {
  const { isLoading, testId } = useContext(CubeBackButtonContext)

  return isLoading ? (
    <CubeSkeleton className={linkSkeleton()} />
  ) : (
    <CubeHyperlink
      {...props}
      variant="text-only"
      data-testid={testIdOf(testId, 'link')}
    />
  )
}
