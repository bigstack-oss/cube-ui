import { cva } from 'class-variance-authority'

export const sideBar = cva(
  'flex min-h-svh w-[200px] shrink-0 flex-col bg-grey-0',
)

export const block = cva('w-[200px] border-functional-border-divider bg-grey-0')

export const divider = cva('h-px w-full bg-functional-border-divider')

export const title = cva('h-[54px] cursor-pointer px-[22px] py-[14px]')

export const logo = cva('h-[26px]')

export const userInfo = cva('flex flex-col gap-y-3 px-[22px] py-4')

export const userInfoRow = cva('flex items-center justify-between')

export const dataCenterName = cva(
  'secondary-body2 font-medium text-functional-text',
)

export const dataCenterVersion = cva(
  'primary-body4 font-medium text-functional-text',
)

export const userNameTag = cva(
  'primary-body5 flex items-center justify-center rounded border border-primary px-[5px] font-medium text-primary',
)

export const options = cva('py-4')

export const option = cva(
  [
    'flex items-center justify-between',
    'w-[200px] bg-transparent px-[22px] py-[7px]',
    'secondary-body2 cursor-pointer font-medium text-functional-text transition',
  ],
  {
    variants: {
      isSelected: {
        true: 'bg-functional-hover-secondary font-semibold text-primary',
        false: 'hover:bg-functional-hover-grey',
      },
    },
  },
)

export const optionLabel = cva('flex items-center gap-x-3')

export const optionIcon = cva('icon-md')

export const bottom = cva('flex w-full flex-1 flex-col justify-end')

export const timeZone = cva('flex flex-col px-[22px] py-4')

export const timeZoneTitle = cva('primary-body6 mb-1 text-functional-text')

export const timeZoneTime = cva(
  'secondary-body5 mb-2 font-semibold text-functional-text',
)

export const links = cva('flex flex-col pb-4 pt-2')

export const link = cva(
  'group primary-body5 flex h-[21px] cursor-pointer items-center justify-between px-[22px] text-functional-text',
)

export const linkIcon = cva(
  'icon-sm invisible text-functional-text group-hover:visible',
)

export const copyright = cva(
  'flex h-[21px] items-center px-[22px] text-[9px] text-functional-text-light',
)
