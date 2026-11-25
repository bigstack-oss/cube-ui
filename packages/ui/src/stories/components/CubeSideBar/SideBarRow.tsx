import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type SideBarRowProps = PropsWithChildren<{
  title: string
}>

// One labeled side bar; a Gallery section lays several out side by side.
export const SideBarRow = (props: SideBarRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}
