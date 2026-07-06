import type { PropsWithChildren } from 'react'

export type SpinnerRowProps = PropsWithChildren<{
  title: string
}>

export const SpinnerRow = (props: SpinnerRowProps) => {
  const { children, title } = props

  return (
    <div className="gap-x-10 flex items-center">
      <div className="w-20 primary-body1 font-semibold">{title}</div>
      {children}
    </div>
  )
}
