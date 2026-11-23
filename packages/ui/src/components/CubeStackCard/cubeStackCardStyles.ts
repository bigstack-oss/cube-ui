import { cva } from 'class-variance-authority'

export const stackCard = cva([
  'flex w-full flex-col gap-3 rounded-[5px] bg-scene-background p-6',
  'border-l-[5px] border-l-cosmos-secondary',
  'border-r border-r-functional-border-divider',
  'border-y border-y-functional-border-divider',
  'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
])
