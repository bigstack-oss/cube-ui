import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '../../utils/react-types'

export type CubeSkeletonProps = PropsWithClassName & {
  style?: React.CSSProperties
}

export const CubeSkeleton = (props: CubeSkeletonProps) => {
  const { className, style } = props

  return (
    <div
      className={twMerge(
        'cos-skeleton animate-cos-skeleton rounded-[5px]',
        className,
      )}
      style={style}
    />
  )
}
