import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'

type CaptionTextProps = PropsWithChildren<PropsWithClassName>

export const CaptionText = (props: CaptionTextProps) => {
  const { children, className } = props

  return (
    <p className={twMerge('primary-body2 text-dark-300', className)}>
      {children}
    </p>
  )
}
