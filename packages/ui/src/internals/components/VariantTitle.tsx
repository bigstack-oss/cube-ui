import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '../../types/react-types'

type VariantTitleProps = PropsWithChildren<PropsWithClassName>

export const VariantTitle = (props: VariantTitleProps) => {
  const { children, className } = props

  return (
    <h3
      className={twMerge(
        'primary-body1 font-semibold text-functional-title',
        className,
      )}
    >
      {children}
    </h3>
  )
}
