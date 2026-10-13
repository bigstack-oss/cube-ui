import type { Ref } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeNotification } from '@icons'

type OverflowMenuTriggerProps = {
  ref?: Ref<HTMLDivElement>
  onClick?: () => void
}

export const OverflowMenuTrigger = (props: OverflowMenuTriggerProps) => {
  const { ref, onClick } = props

  return (
    <div
      ref={ref}
      className={twMerge(
        'group flex size-[34px] items-center justify-center',
        'cursor-pointer rounded-[5px]',
        'transition-colors hover:bg-functional-hover-secondary',
      )}
      onClick={onClick}
    >
      <MonochromeNotification className="icon-md text-cosmos-primary group-hover:text-functional-hover-primary" />
    </div>
  )
}
