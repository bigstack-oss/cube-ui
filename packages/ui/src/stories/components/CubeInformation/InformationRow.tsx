import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type InformationRowProps = PropsWithChildren<{
  title: string
}>

export const InformationRow = (props: InformationRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center gap-x-8">
      <SubHeading className="w-[180px] shrink-0">{title}</SubHeading>
      {/* The box fills its parent, so the content column sets its width. */}
      <div className="w-[720px]">{children}</div>
    </div>
  )
}
