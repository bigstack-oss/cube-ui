import { filterItem } from './cubeSearchBarStyles'
import type { CubeSearchBarFilterItemProps } from './cubeSearchBarTypes'

export const CubeSearchBarFilterItem = (
  props: CubeSearchBarFilterItemProps,
) => {
  const { children, onClick } = props

  return (
    <div className={filterItem()} onClick={onClick}>
      {children}
    </div>
  )
}
