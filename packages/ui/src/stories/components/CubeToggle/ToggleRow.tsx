import type { PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'

export type ToggleRowProps = PropsWithChildren<{
  title: string
}>

export const ToggleRow = (props: ToggleRowProps) => {
  const { title, children } = props

  return (
    <div className="grid grid-cols-5 items-center gap-x-12">
      <SubHeading className="col-span-1">{title}</SubHeading>
      {children}
    </div>
  )
}

const ToggleRowHeader = () => {
  return (
    <>
      <ToggleRow title="">
        <div className="col-span-2 text-center">
          <SubHeading>Regular</SubHeading>
        </div>
        <div className="col-span-2 text-center">
          <SubHeading>w/Label</SubHeading>
        </div>
      </ToggleRow>
      <ToggleRow title="">
        <div className="primary-body2 text-center text-functional-title">
          Unchecked
        </div>
        <div className="primary-body2 text-center text-functional-title">
          Checked
        </div>
        <div className="primary-body2 text-center text-functional-title">
          Unchecked
        </div>
        <div className="primary-body2 text-center text-functional-title">
          Checked
        </div>
      </ToggleRow>
    </>
  )
}

ToggleRow.Header = ToggleRowHeader
