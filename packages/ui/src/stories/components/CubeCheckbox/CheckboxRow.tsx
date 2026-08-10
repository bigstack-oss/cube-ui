import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type CheckboxRowProps = PropsWithChildren<{
  title: string
}>

export const CheckboxRow = (props: CheckboxRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-4 items-center gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      {children}
    </div>
  )
}
