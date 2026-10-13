import { cva } from 'class-variance-authority'

export const menu = cva([
  'z-10',
  'rounded-[5px] border border-functional-border-divider bg-grey-0 py-2',
  'shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.20)]',
])

export const itemContainer = cva(
  [
    'flex items-center gap-x-1',
    'min-w-40 max-w-[360px] px-[22px] py-2',
    'bg-transparent transition-colors',
  ],
  {
    variants: {
      hasOnClickProp: {
        true: 'cursor-pointer',
        false: 'cursor-default',
      },
      withSubtext: {
        true: 'h-[53px]',
        false: 'h-[36ox]',
      },
      disabled: {
        true: 'group cursor-default',
        false: 'hover:bg-functional-hover-grey',
      },
    },
  },
)
