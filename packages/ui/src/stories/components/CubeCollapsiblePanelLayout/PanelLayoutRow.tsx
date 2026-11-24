import type { PropsWithChildren } from 'react'
import { CaptionText } from '@internals/components/CaptionText'
import { SubHeading } from '@internals/components/SubHeading'

export type PanelLayoutRowProps = PropsWithChildren<{
  title: string
  description?: string
}>

// The layout fills the width, so each label sits above it.
export const PanelLayoutRow = (props: PanelLayoutRowProps) => {
  const { children, title, description } = props

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-1">
        <SubHeading>{title}</SubHeading>
        {description && <CaptionText>{description}</CaptionText>}
      </div>
      {children}
    </div>
  )
}
