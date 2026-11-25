import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type UploadRowProps = PropsWithChildren<{
  title: string
}>

export const UploadRow = (props: UploadRowProps) => {
  const { children, title } = props

  return (
    <div className="flex items-start gap-x-8">
      <SubHeading className="w-[240px] shrink-0 pt-2">{title}</SubHeading>
      {/* The upload fills its parent, so the content column sets its width. */}
      <div className="w-[720px]">{children}</div>
    </div>
  )
}
