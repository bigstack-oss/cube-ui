import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeDropdown } from '../CubeDropdown/CubeDropdown'
import {
  DEFAULT_ITEMS_PER_PAGE,
  itemsPerPageOptions,
  type ItemsPerPage,
} from './cubePaginationUtils'

type CubePaginationViewDropdownProps = {
  isMinimal: boolean
  itemsPerPage: ItemsPerPage
  onItemsPerPageChange: (num: ItemsPerPage) => void
}

export const CubePaginationViewDropdown = (
  props: CubePaginationViewDropdownProps,
) => {
  const {
    isMinimal,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    onItemsPerPageChange,
  } = props

  const { t } = useCubeUiTranslation()

  return (
    <div className="secondary-body4 flex items-center">
      {!isMinimal && (
        <div className="p-[10px]">{t('component.pagination.view')}</div>
      )}
      <CubeDropdown
        size="sm"
        type="radio"
        variant="regular"
        selectedItems={[itemsPerPage]}
      >
        <CubeDropdown.Trigger placeholder="View" className="h-7">
          {itemsPerPage.toString()}
        </CubeDropdown.Trigger>
        <CubeDropdown.Menu>
          {itemsPerPageOptions.map((num) => (
            <CubeDropdown.Item
              key={num}
              item={num}
              onClick={() => onItemsPerPageChange(num)}
            >
              {num.toString()}
            </CubeDropdown.Item>
          ))}
        </CubeDropdown.Menu>
      </CubeDropdown>
    </div>
  )
}
