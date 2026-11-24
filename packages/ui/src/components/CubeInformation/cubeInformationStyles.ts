import { cva } from 'class-variance-authority'

export const information = cva(
  'primary-body3 flex items-start gap-[10px] rounded-[5px] bg-blue-50 px-5 py-[13px] text-dark-400',
)

export const iconWrap = cva(
  'flex size-[18px] shrink-0 items-center justify-center',
)
