import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type CubeRadioButtonGridDirection = 'vertical' | 'wrap'

export type CubeRadioButtonGridProps = PropsWithChildren<{
  className?: string
  direction: CubeRadioButtonGridDirection
}>

export const CubeRadioButtonGrid = (props: CubeRadioButtonGridProps) => {
  const { children, className: classNameProp, direction } = props

  const className = twMerge(
    direction === 'vertical'
      ? 'flex flex-col gap-y-3'
      : 'grid grid-cols-[repeat(auto-fill,180px)] gap-x-4 gap-y-6',
    classNameProp,
  )

  return <div className={className}>{children}</div>
}
