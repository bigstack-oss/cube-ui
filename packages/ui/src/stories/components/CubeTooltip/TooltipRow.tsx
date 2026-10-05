import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type TooltipRowProps = PropsWithChildren<{
  title: string
}>

export const TooltipRow = (props: TooltipRowProps) => {
  const { title, children } = props

  return (
    <div className="flex items-center">
      <SubHeading className="w-64">{title}</SubHeading>
      {children}
    </div>
  )
}
