import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'

type HeadingProps = PropsWithChildren<PropsWithClassName>

export const Heading = (props: HeadingProps) => {
  const { children, className } = props

  return (
    <h3
      className={twMerge(
        'secondary-h3 font-semibold text-functional-title',
        className,
      )}
    >
      {children}
    </h3>
  )
}
