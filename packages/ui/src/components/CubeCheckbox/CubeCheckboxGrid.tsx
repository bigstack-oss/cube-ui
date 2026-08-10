import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { CubeCheckboxGridDirection } from './cubeCheckboxTypes'

export type CubeCheckboxGridProps = PropsWithChildren<{
  className?: string
  direction: CubeCheckboxGridDirection
}>

export const CubeCheckboxGrid = (props: CubeCheckboxGridProps) => {
  const { children, className: classNameProp, direction } = props

  const className = twMerge(
    direction === 'vertical'
      ? 'flex flex-col gap-y-3'
      : 'grid grid-cols-[repeat(auto-fill,180px)] gap-x-4 gap-y-6',
    classNameProp,
  )

  return <div className={className}>{children}</div>
}
