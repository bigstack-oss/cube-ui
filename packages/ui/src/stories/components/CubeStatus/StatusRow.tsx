import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type StatusRowProps = PropsWithChildren<{
  title: string
}>

export const StatusRow = (props: StatusRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center">
      <SubHeading className="w-32 shrink-0">{title}</SubHeading>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  )
}
