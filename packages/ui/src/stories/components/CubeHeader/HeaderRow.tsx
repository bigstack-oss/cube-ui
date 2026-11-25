import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type HeaderRowProps = PropsWithChildren<{
  title: string
}>

// The header fills the width, so each label sits above it.
export const HeaderRow = (props: HeaderRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}
