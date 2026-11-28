import { CubeSearchBarGlobalCategory } from './CubeSearchBarGlobalCategory'
import { CubeSearchBarGlobalInput } from './CubeSearchBarGlobalInput'
import { CubeSearchBarGlobalItem } from './CubeSearchBarGlobalItem'
import { CubeSearchBarSkeleton } from './CubeSearchBarSkeleton'
import { globalContainer } from './cubeSearchBarStyles'
import type { CubeSearchBarGlobalProps } from './cubeSearchBarTypes'
import { omitNonInputProps } from './cubeSearchBarUtils'

export const CubeSearchBarGlobal = (props: CubeSearchBarGlobalProps) => {
  const { variant, isLoading = false, onInputClear, children } = props

  if (isLoading) return <CubeSearchBarSkeleton variant="global" />

  return (
    <div className={globalContainer()}>
      <CubeSearchBarGlobalInput
        {...omitNonInputProps(props)}
        variant={variant}
        onInputClear={onInputClear}
      >
        {children}
      </CubeSearchBarGlobalInput>
      {props.variant === 'category' && (
        <CubeSearchBarGlobalCategory
          categories={props.categories}
          selectedCategory={props.selectedCategory}
          onCategoryClick={props.onCategoryClick}
          testId={props['data-testid'] || undefined}
        />
      )}
    </div>
  )
}

CubeSearchBarGlobal.Item = CubeSearchBarGlobalItem
