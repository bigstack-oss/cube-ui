import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type InlineNotificationRowProps = PropsWithChildren<{
  title: string
}>

export const InlineNotificationRow = (props: InlineNotificationRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-[180px_minmax(0,1fr)] items-center gap-x-8">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}
