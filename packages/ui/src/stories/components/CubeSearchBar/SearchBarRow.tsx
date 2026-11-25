import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type SearchBarRowProps = PropsWithChildren<{
  title: string
}>

export const SearchBarRow = (props: SearchBarRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center gap-x-8">
      <SubHeading className="w-[240px] shrink-0">{title}</SubHeading>
      {/* The search bar fills its parent, so the content column sets its width. */}
      <div className="w-[480px]">{children}</div>
    </div>
  )
}
