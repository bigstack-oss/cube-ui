import type { ReactNode } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import { CaptionText } from '@internals/components/CaptionText'

export type ColorPaletteRowProps = {
  children: ReactNode
  title: string
  desc?: string
}

export const ColorPaletteRow = (props: ColorPaletteRowProps) => {
  const { children, title, desc } = props

  return (
    <div className="grid grid-cols-4 gap-x-8">
      <div className="col-span-1 flex flex-col">
        <SubHeading>{title}</SubHeading>
        {desc && <CaptionText>{desc}</CaptionText>}
      </div>
      <div className="col-span-3 flex flex-row flex-wrap items-start gap-x-4 gap-y-3">
        {children}
      </div>
    </div>
  )
}
