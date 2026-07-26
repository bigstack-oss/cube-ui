import type { PropsWithChildren } from 'react'

export const CodeBlock = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <pre className="w-full overflow-x-auto rounded-lg bg-dark-50 p-4 text-sm">
      <code className="font-mono text-dark-800">{children}</code>
    </pre>
  )
}
