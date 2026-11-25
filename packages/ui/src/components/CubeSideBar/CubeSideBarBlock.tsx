import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import type { PropsWithClassName } from '@shared-types/react-types'
import { block } from './cubeSideBarStyles'

type CubeSideBarBlockProps = PropsWithClassName & PropsWithChildren

export const CubeSideBarBlock = (props: CubeSideBarBlockProps) => {
  const { children, className } = props

  return <div className={twMerge(block(), className)}>{children}</div>
}
