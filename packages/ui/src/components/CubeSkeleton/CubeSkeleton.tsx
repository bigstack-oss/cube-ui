import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'

export type CubeSkeletonProps = PropsWithClassName & {
  style?: React.CSSProperties
}

export const CubeSkeleton = (props: CubeSkeletonProps) => {
  const { className, style } = props

  return (
    <div
      className={twMerge(
        'cube-skeleton animate-cube-skeleton rounded-[5px]',
        className,
      )}
      style={style}
    />
  )
}
