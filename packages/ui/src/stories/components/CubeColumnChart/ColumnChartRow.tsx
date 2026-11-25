import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type ColumnChartRowProps = PropsWithChildren<{
  title: string
}>

// The chart fills its parent, so the content column sets its width.
export const ColumnChartRow = (props: ColumnChartRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      <div className="w-[720px]">{children}</div>
    </div>
  )
}
