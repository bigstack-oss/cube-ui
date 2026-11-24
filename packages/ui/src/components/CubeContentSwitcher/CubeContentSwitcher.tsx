import { twMerge } from 'tailwind-merge'
import { CubeContentSwitcherContext } from './cubeContentSwitcherContext'
import { CubeContentSwitcherItem } from './CubeContentSwitcherItem'
import { CubeContentSwitcherSkeleton } from './CubeContentSwitcherSkeleton'
import type { CubeContentSwitcherProps } from './cubeContentSwitcherTypes'

export const CubeContentSwitcher = (props: CubeContentSwitcherProps) => {
  const { className: classNameProp, children, variant = 'default' } = props

  const getSize = () => {
    if (props.variant === 'default') {
      return props.size ?? 'md'
    }
    return undefined
  }

  const size = getSize()

  const className = twMerge('flex w-fit', classNameProp)

  return (
    <CubeContentSwitcherContext.Provider value={{ variant, size }}>
      <div className={className}>{children}</div>
    </CubeContentSwitcherContext.Provider>
  )
}

CubeContentSwitcher.Item = CubeContentSwitcherItem
CubeContentSwitcher.Skeleton = CubeContentSwitcherSkeleton
