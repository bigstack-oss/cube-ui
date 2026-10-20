import { useState, type PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import { CubeToast } from '@components/CubeNotification/CubeToast/CubeToast'
import type { CubeToastType } from '@components/CubeNotification/CubeToast/cubeToastUtils'

export type ToastRowProps = PropsWithChildren<{
  title: string
}>

export const ToastRow = (props: ToastRowProps) => {
  const { children, title } = props

  return (
    <div className="grid grid-cols-[180px_minmax(0,1fr)] items-center gap-x-8">
      <SubHeading>{title}</SubHeading>
      <div>{children}</div>
    </div>
  )
}

/**
 * A toast rendered in place (no provider, no timer). Clicking its close icon
 * hides it, as the provider would.
 */
export const StaticToast = (props: CubeToastType) => {
  const [isClosed, setIsClosed] = useState(false)

  if (isClosed) return null

  return <CubeToast {...props} onToastClose={() => setIsClosed(true)} />
}
