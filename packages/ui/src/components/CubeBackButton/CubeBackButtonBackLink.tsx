import { createElement, useContext, type PropsWithChildren } from 'react'
import { MonochromeChevronLeft } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { testIdOf } from '@utils/testId'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeBackButtonContext } from './cubeBackButtonContext'
import { backButtonSkeleton } from './cubeBackButtonStyles'
import type { CubeBackButtonBackLinkProps } from './cubeBackButtonTypes'

export const CubeBackButtonBackLink = <
  ContainerProps extends PropsWithChildren,
>(
  props: CubeBackButtonBackLinkProps<ContainerProps>,
) => {
  const { href, onClick, backButtonContainer } = props

  const { isLoading, testId } = useContext(CubeBackButtonContext)
  const { t } = useCubeUiTranslation()

  if (!href && !onClick && !backButtonContainer) {
    console.warn(
      'CubeBackButton: At least one of `href`, `onClick`, or `backButtonContainer` must be provided',
    )
  }

  if (isLoading) {
    return <CubeSkeleton className={backButtonSkeleton()} />
  }

  const button = (
    <CubeButton
      type="ghost"
      usage="icon-only"
      Icon={MonochromeChevronLeft}
      aria-label={t('component.backButton.back')}
      data-testid={testIdOf(testId, 'back')}
    />
  )

  if (backButtonContainer) {
    const { Component, props: containerProps } = backButtonContainer
    return createElement(Component, containerProps, button)
  }

  return (
    <a href={href} onClick={onClick}>
      {button}
    </a>
  )
}
