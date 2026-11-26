import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type CountSegmentedChartRowProps = PropsWithChildren<{
  title: string
}>

// The chart fills its parent, so the content column sets its width.
export const CountSegmentedChartRow = (props: CountSegmentedChartRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      <div className="flex w-[720px] flex-col gap-y-6">{children}</div>
    </div>
  )
}
