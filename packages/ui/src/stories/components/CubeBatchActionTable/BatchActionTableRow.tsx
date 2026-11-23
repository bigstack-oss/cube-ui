import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type BatchActionTableRowProps = PropsWithChildren<{
  title: string
}>

// Tables are wide, so each label sits above its table instead of beside it.
export const BatchActionTableRow = (props: BatchActionTableRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}
