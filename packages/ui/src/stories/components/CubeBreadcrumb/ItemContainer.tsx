import type { PropsWithChildren } from 'react'

/**
 * Stand-in for a custom item container such as a router link.
 */
export const ItemContainer = (props: PropsWithChildren) => (
  <a className="underline decoration-functional-hover-primary underline-offset-4">
    {props.children}
  </a>
)
