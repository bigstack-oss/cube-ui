import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '../../types/react-types'

type SubHeadingProps = PropsWithChildren<PropsWithClassName>

export const SubHeading = (props: SubHeadingProps) => {
  const { children, className } = props

  return (
    <h5
      className={twMerge(
        'primary-body1 font-semibold text-functional-title',
        className,
      )}
    >
      {children}
    </h5>
  )
}
