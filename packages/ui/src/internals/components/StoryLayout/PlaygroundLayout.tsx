import type { PropsWithChildren } from 'react'

export const PlaygroundLayout = (props: PropsWithChildren) => {
  const { children } = props
  return <div className="flex items-center justify-center p-8">{children}</div>
}
