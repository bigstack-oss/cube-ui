import { range } from 'lodash'
import { testIdOf } from '@utils/testId'
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
> & {
  testId?: string
}

export const CubeHeaderQuickAccessBar = (
  props: CubeHeaderQuickAccessBarProps,
) => {
  const { isLoading = false, quickAccesses, testId } = props

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
        <a
          href={quickAccess.href}
          target="_blank"
          data-testid={testIdOf(testId, 'quick-access')}
          // The message is shown (and translated), so a key can stand in for it.
          data-key={
            testId
              ? (quickAccess['data-key'] ?? quickAccess.hoverMessage)
              : undefined
          }
        >
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
