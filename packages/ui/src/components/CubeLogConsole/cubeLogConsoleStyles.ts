import { cva } from 'class-variance-authority'

export const logConsole = cva('flex w-full flex-col')

export const logConsoleHeader = cva([
  'flex items-center justify-between px-6 py-3',
  'rounded-t-[5px] border border-functional-border-divider bg-scene-background',
])

export const copyButton = cva(
  'primary-body2 cursor-pointer font-medium text-functional-text',
)

export const logConsoleLog = cva(
  'primary-body3 overflow-x-auto whitespace-pre rounded-b-[5px] bg-dark-700 px-6 py-4 text-functional-border-darker',
)
