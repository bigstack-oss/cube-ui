import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type IconTextRowProps = PropsWithChildren<{
  title: string
}>

export const IconTextRow = (props: IconTextRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center">
      <SubHeading className="w-40 shrink-0">{title}</SubHeading>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  )
}
