import type { PropsWithChildren } from 'react'

export const NotificationLink = (props: PropsWithChildren) => (
  <a href="#" className="relative">
    {props.children}
  </a>
)
