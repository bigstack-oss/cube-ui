import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'

type CubePaginationAmountProps = {
  isMinimal: boolean
  totalItems: number
}

export const CubePaginationAmount = (props: CubePaginationAmountProps) => {
  const { isMinimal, totalItems } = props

  const { t } = useCubeUiTranslation()

  return (
    <div className="secondary-body4 p-[10px] text-functional-text">
      <span>
        {isMinimal
          ? t('component.pagination.amount.short')
          : t('component.pagination.amount.long')}
      </span>
      {totalItems}
    </div>
  )
}
