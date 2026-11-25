import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type DatePickerRowProps = PropsWithChildren<{
  title: string
}>

export const DatePickerRow = (props: DatePickerRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center gap-x-8">
      <SubHeading className="w-[240px] shrink-0">{title}</SubHeading>
      {children}
    </div>
  )
}
