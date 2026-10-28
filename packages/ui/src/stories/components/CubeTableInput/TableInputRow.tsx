import { useState, type PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import {
  CubeTableInput,
  type CubeTableInputProps,
} from '@components/CubeTableInput/CubeTableInput'

export type TableInputRowProps = PropsWithChildren<{
  title: string
}>

/**
 * One Gallery row. The input sits in an 85px cell, like a table column.
 */
export const TableInputRow = (props: TableInputRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-[180px_85px] items-center gap-x-8">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  )
}

/**
 * A table input that keeps its own value, starting from `initialValue`.
 */
export const StatefulTableInput = (
  props: Omit<CubeTableInputProps, 'value' | 'onChange'> & {
    initialValue?: string
  },
) => {
  const { initialValue = '', ...inputProps } = props

  const [value, setValue] = useState(initialValue)

  return (
    <CubeTableInput
      {...inputProps}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
