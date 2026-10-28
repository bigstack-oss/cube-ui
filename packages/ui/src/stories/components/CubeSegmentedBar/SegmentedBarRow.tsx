import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type SegmentedBarRowProps = PropsWithChildren<{
  title: string
}>

export const SegmentedBarRow = (props: SegmentedBarRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center gap-x-8">
      <SubHeading className="w-[180px] shrink-0">{title}</SubHeading>
      {/* The bar fills its parent, so the content column sets its width. */}
      <div className="w-[480px]">{children}</div>
    </div>
  )
}
