import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type RadioButtonRowProps = PropsWithChildren<{
  title: string
}>

export const RadioButtonRow = (props: RadioButtonRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-4 items-center gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      {children}
    </div>
  )
}
