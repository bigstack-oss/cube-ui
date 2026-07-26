import type { PropsWithChildren } from 'react'

// Wraps a live demo so it visually reads as "this is what renders", distinct
// from the code sample above it.
export const DemoFrame = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <div className="flex flex-col items-start gap-y-4 rounded-lg border border-dark-100 p-6">
      {children}
    </div>
  )
}
