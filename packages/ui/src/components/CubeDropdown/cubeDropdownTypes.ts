import type { ReactNode } from 'react'

export const cubeDropdownSizes = ['sm', 'md'] as const

export const cubeDropdownTypes = ['radio', 'checkbox'] as const

export const cubeDropdownVariants = ['regular', 'withFilter'] as const

export type CubeDropdownSize = (typeof cubeDropdownSizes)[number]

export type CubeDropdownType = (typeof cubeDropdownTypes)[number]

export type CubeDropdownVariant = (typeof cubeDropdownVariants)[number]

export type OnAllCheckChange = (checked: boolean) => void

export type OnClearSelection = () => void

type CubeDropdownBaseProps<Item> = {
  /**
   * @default 'md'
   */
  size?: CubeDropdownSize
  type: CubeDropdownType
  /**
   * @default "regular"
   */
  variant?: CubeDropdownVariant
  selectedItems: Item[]
  /**
   * @default false
   */
  isLoading?: boolean
  /**
   * @default false
   */
  disabled?: boolean
  label?: string
  skeletonClassName?: string
  children: ReactNode
}

type CheckboxPropsWithFilter<Item> = CubeDropdownBaseProps<Item> & {
  type: 'checkbox'
  variant: 'withFilter'
  onAllCheckChange: OnAllCheckChange
  onClearSelection: OnClearSelection
}

type CheckboxPropsRegular<Item> = CubeDropdownBaseProps<Item> & {
  type: 'checkbox'
  variant?: Exclude<CubeDropdownVariant, 'withFilter'>
  onAllCheckChange: OnAllCheckChange
  onClearSelection?: never
}

type RadioProps<Item> = CubeDropdownBaseProps<Item> & {
  type: 'radio'
  variant?: CubeDropdownVariant
  onAllCheckChange?: never
  onClearSelection?: never
}

export type CubeDropdownProps<Item> =
  | CheckboxPropsWithFilter<Item>
  | CheckboxPropsRegular<Item>
  | RadioProps<Item>
