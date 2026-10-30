import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type ViewDetailsTableRowProps = PropsWithChildren<{
  title: string
}>

// Tables are wide, so each label sits above its table instead of beside it.
export const ViewDetailsTableRow = (props: ViewDetailsTableRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}
