import type { ReactNode } from 'react'
import { LabelText } from '@internals/components/LabelText'
import { SubHeading } from '@internals/components/SubHeading'

const rowGrid = 'grid grid-cols-[120px_360px_240px_560px] items-center gap-x-8'

export type ContentSwitcherRowProps = {
  title: string
  children: ReactNode
}

export const ContentSwitcherRow = (props: ContentSwitcherRowProps) => {
  const { title, children } = props

  return (
    <div className={rowGrid}>
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}

const ContentSwitcherRowHeader = (props: { columns: readonly string[] }) => (
  <div className={rowGrid}>
    <span />
    {props.columns.map((column) => (
      <LabelText key={column}>{column}</LabelText>
    ))}
  </div>
)

ContentSwitcherRow.Header = ContentSwitcherRowHeader
