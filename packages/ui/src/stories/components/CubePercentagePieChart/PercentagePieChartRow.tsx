import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type PercentagePieChartRowProps = PropsWithChildren<{
  title: string
}>

export const PercentagePieChartRow = (props: PercentagePieChartRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      <div className="flex flex-row flex-wrap gap-10">{children}</div>
    </div>
  )
}
