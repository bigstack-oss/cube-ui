import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type MessageRowProps = PropsWithChildren<{
  title: string
}>

export const MessageRow = (props: MessageRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-5 items-center gap-6">
      <SubHeading>{title}</SubHeading>
      <div className="col-span-4">{children}</div>
    </div>
  )
}
