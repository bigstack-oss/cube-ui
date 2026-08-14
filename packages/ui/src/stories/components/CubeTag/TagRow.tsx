import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type TagRowProps = PropsWithChildren<{
  title: string
}>

export const TagRow = (props: TagRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-7 items-center gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      {children}
    </div>
  )
}
