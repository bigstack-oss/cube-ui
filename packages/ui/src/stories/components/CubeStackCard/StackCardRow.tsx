import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type StackCardRowProps = PropsWithChildren<{
  title: string
}>

export const StackCardRow = (props: StackCardRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center gap-x-8">
      <SubHeading className="w-[180px] shrink-0">{title}</SubHeading>
      {/* The card fills its parent, so the content column sets its width. */}
      <div className="w-[720px]">{children}</div>
    </div>
  )
}
