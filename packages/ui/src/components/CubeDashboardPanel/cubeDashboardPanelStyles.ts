import { cva } from 'class-variance-authority'

export const dashboardPanel = cva(
  'flex w-full flex-col gap-y-3 rounded-[5px] bg-grey-0 p-4',
)

export const dashboardPanelContentBox = cva(
  'overflow-auto rounded-[5px] border border-functional-border-divider',
)

export const dashboardPanelCol = cva(
  'flex flex-1 flex-col border-functional-border-divider [&>*+*]:border-t',
)

export const dashboardPanelRow = cva(
  'flex flex-row border-functional-border-divider [&>*+*]:border-l',
)

export const dashboardPanelItem = cva(
  'flex flex-col gap-y-3 border-functional-border-divider p-5',
)
