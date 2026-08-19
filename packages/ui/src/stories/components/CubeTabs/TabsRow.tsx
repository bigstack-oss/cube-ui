import type { ReactNode } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type TabsRowProps = {
  children: ReactNode
  title: string
}

export const TabsRow = (props: TabsRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-4 items-end gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      <div className="col-span-3">{children}</div>
    </div>
  )
}
