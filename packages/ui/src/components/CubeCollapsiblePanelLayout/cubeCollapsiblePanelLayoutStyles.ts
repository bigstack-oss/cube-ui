import { cva } from 'class-variance-authority'

export const layout = cva('flex items-start', {
  variants: {
    isOpen: {
      true: 'gap-x-4',
    },
  },
})

export const rightPanelContainer = cva(
  [
    'overflow-hidden rounded-[5px] transition-all duration-300',
    'shadow-[0_0_2px_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      isOpen: {
        true: 'flex-1 shrink-0',
        false: 'w-0 whitespace-nowrap px-0',
      },
    },
  },
)

export const toggleButton = cva(
  'inline-flex size-[26px] items-center justify-center rounded-full bg-blue-150',
)

export const closeButton = cva(
  'inline-flex size-[26px] cursor-pointer items-center justify-center',
)
