import { cva } from 'class-variance-authority'

export const generalPanelContainer = cva('flex flex-col items-stretch gap-y-3')

export const generalPanel = cva(
  'flex h-full flex-col gap-y-4 overflow-auto rounded-[5px] bg-grey-0 p-6',
)

export const generalPanelTitleBar = cva('flex items-end justify-between')
