import { range } from 'lodash'
import { CubeButton } from '../CubeButton/CubeButton'
import { CubeSkeleton } from '../CubeSkeleton/CubeSkeleton'
import { CubeTooltip } from '../CubeTooltip/CubeTooltip'
import {
  bar,
  quickAccessSkeleton,
  quickAccessSkeletonWrap,
} from './cubeHeaderStyles'
import type { CubeHeaderProps } from './cubeHeaderTypes'

type CubeHeaderQuickAccessBarProps = Pick<
  CubeHeaderProps,
  'isLoading' | 'quickAccesses'
>

export const CubeHeaderQuickAccessBar = (
  props: CubeHeaderQuickAccessBarProps,
) => {
  const { isLoading = false, quickAccesses } = props

  const renderQuickAccesses = () => {
    if (isLoading) {
      return range(0, 4).map((_, index) => (
        <span className={quickAccessSkeletonWrap()} key={index}>
          <CubeSkeleton className={quickAccessSkeleton()} />
        </span>
      ))
    }

    return quickAccesses.map((quickAccess, index) => (
      <CubeTooltip
        key={index}
        hoverContent={{
          message: quickAccess.hoverMessage,
        }}
      >
        <a href={quickAccess.href} target="_blank">
          <CubeButton
            size="md"
            type="ghost"
            usage="icon-only"
            Icon={quickAccess.Icon}
            aria-label={quickAccess.hoverMessage}
          />
        </a>
      </CubeTooltip>
    ))
  }

  return <div className={bar()}>{renderQuickAccesses()}</div>
}
