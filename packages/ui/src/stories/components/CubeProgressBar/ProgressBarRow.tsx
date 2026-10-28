import type { PropsWithChildren, ReactNode } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type ProgressBarRowProps = PropsWithChildren<{
  title: string
}>

/**
 * One Gallery row: a title, then the bar in a 480px column.
 */
export const ProgressBarRow = (props: ProgressBarRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-[180px_480px] items-center gap-x-8">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}

/**
 * Layouts rows: the same bar at full width, at 90px, and five in a flex row.
 */
export const ProgressBarLayouts = (props: {
  renderBar: (className?: string) => ReactNode
}) => {
  const { renderBar } = props

  return (
    <div className="flex flex-col gap-y-6">
      <ProgressBarRow title="Full width">{renderBar()}</ProgressBarRow>
      <ProgressBarRow title="Custom width">
        {renderBar('w-[90px]')}
      </ProgressBarRow>
      <ProgressBarRow title="Flex">
        <div className="flex items-center gap-x-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="flex-1">
              {renderBar('flex-1')}
            </div>
          ))}
        </div>
      </ProgressBarRow>
    </div>
  )
}
