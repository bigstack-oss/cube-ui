import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { paginationItemWrap } from './cubePaginationStyles'

type CubePaginationItemWrapProps = PropsWithChildren<{ isMinimal: boolean }>

export const CubePaginationItemWrap = (props: CubePaginationItemWrapProps) => {
  const { isMinimal, children } = props

  return (
    <div className={twMerge(paginationItemWrap({ isMinimal }))}>{children}</div>
  )
}
