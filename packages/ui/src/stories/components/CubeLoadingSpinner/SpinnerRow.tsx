import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type SpinnerRowProps = PropsWithChildren<{
  title: string
}>

export const SpinnerRow = (props: SpinnerRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-center gap-x-10">
      <SubHeading className="w-20">{title}</SubHeading>
      {children}
    </div>
  )
}
