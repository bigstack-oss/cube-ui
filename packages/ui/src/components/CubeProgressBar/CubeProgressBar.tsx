import { useImperativeHandle, useMemo, type CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'
import type { CubeProgressBarProps } from './cubeProgressBarTypes'
import { CubeProgressBarSkeleton } from './CubeProgressBarSkeleton'
import { progressFill } from './cubeProgressBarStyles'
import { useFillWidth } from './useFillWidth'

export const CubeProgressBar = (props: CubeProgressBarProps) => {
  const { ref, className: classNameProps, children, progress, color } = props

  if (progress < 0) {
    console.warn('progress value should not be less than 0')
  }

  const { barRef, barWidth, fillWidthPercentage } = useFillWidth(progress)

  useImperativeHandle(ref, () => ({
    barWidth,
  }))

  // Use inline style because dynamic value is not supported in TailwindCSS.
  const progressWidthStyle: CSSProperties = {
    width: `${fillWidthPercentage}%`,
  }

  const className = twMerge(
    'inline-flex w-full shrink-0 items-center gap-x-[6px]',
    classNameProps,
  )

  const displayPercentage = useMemo<number>(() => {
    if (progress === 0) return 0
    const rounded = Math.round(progress)
    return Math.max(1, rounded)
  }, [progress])

  return (
    <div className={className}>
      <div
        ref={barRef}
        className="relative h-[9px] w-full rounded-full bg-functional-border-divider"
      >
        <div
          className={twMerge(
            progressFill({
              isFull: progress >= 100,
            }),
            color,
          )}
          style={progressWidthStyle}
        />
        {children}
      </div>
      <span className="primary-body5 text-functional-text">{`${displayPercentage}%`}</span>
    </div>
  )
}

CubeProgressBar.Skeleton = CubeProgressBarSkeleton
