import type { PropsWithChildren } from 'react'

export const InlineCode = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <code className="rounded bg-dark-50 px-1.5 py-0.5 font-mono text-[0.9em] text-dark-800">
      {children}
    </code>
  )
}
