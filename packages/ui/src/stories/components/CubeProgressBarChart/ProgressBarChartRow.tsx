import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type ProgressBarChartRowProps = PropsWithChildren<{
  title: string
  /**
   * The content column width.
   * @default 480
   */
  width?: number
}>

export const ProgressBarChartRow = (props: ProgressBarChartRowProps) => {
  const { children, title, width = 480 } = props

  return (
    <div className="flex items-center gap-x-8">
      <SubHeading className="w-[180px] shrink-0">{title}</SubHeading>
      <div className="flex" style={{ width }}>
        {children}
      </div>
    </div>
  )
}
