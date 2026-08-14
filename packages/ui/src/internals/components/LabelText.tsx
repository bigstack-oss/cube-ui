import type { PropsWithChildren } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import { twMerge } from 'tailwind-merge'

type LabelTextProps = PropsWithChildren<PropsWithClassName>

export const LabelText = (props: LabelTextProps) => {
  const { children, className } = props

  return (
    <p className={twMerge('primary-body2 text-functional-title', className)}>
      {children}
    </p>
  )
}
