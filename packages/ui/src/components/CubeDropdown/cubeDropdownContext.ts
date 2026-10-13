import { type ChangeEvent, createContext } from 'react'
import type { UseFloating } from '@internals/utils/floating/useFloating'
import type {
  CubeDropdownSize,
  CubeDropdownType,
  CubeDropdownVariant,
  OnAllCheckChange,
  OnClearSelection,
} from './cubeDropdownTypes'

export type CubeDropdownContextValue<Item> = {
  floatingProps: UseFloating<HTMLButtonElement, HTMLDivElement>

  dropdownOpen: boolean
  toggleDropdownOpen: () => void

  size: CubeDropdownSize
  type: CubeDropdownType
  variant: CubeDropdownVariant
  disabled: boolean
  selectedItems: Item[]
  enabledItemCount: number

  onAllCheckChange?: OnAllCheckChange
  onClearSelection?: OnClearSelection

  searchValue?: string
  handleSearchValueChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const CubeDropdownContext = createContext<
  CubeDropdownContextValue<unknown>
>({
  floatingProps: undefined as unknown as UseFloating<
    HTMLButtonElement,
    HTMLDivElement
  >,
  dropdownOpen: false,
  toggleDropdownOpen: () => {},
  size: 'md',
  type: 'radio',
  variant: 'regular',
  disabled: false,
  selectedItems: [],
  enabledItemCount: 0,

  onAllCheckChange: undefined,
  onClearSelection: undefined,

  searchValue: '',
  handleSearchValueChange: undefined,
})
