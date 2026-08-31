import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type StrokeRowProps = PropsWithChildren<{
  title: string
}>

export const StrokeRow = (props: StrokeRowProps) => {
  const { children, title } = props

  return (
    <div className="col-span-2 grid grid-cols-subgrid items-center">
      <SubHeading className="whitespace-nowrap">{title}</SubHeading>
      {children}
    </div>
  )
}
