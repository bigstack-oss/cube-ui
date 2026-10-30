import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type DetailsTableRowProps = PropsWithChildren<{
  title: string
}>

export const DetailsTableRow = (props: DetailsTableRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-start gap-x-8">
      <SubHeading className="w-[180px] shrink-0">{title}</SubHeading>
      {/* The table fills its parent, so the content column sets its width. */}
      <div className="w-[480px]">{children}</div>
    </div>
  )
}
