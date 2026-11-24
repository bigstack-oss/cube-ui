import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type PanelRowProps = PropsWithChildren<{
  title: string
}>

// Panels fill the width, so each label sits above its panel.
export const PanelRow = (props: PanelRowProps) => {
  const { children, title } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}
