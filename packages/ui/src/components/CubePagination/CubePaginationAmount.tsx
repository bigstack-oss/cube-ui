import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'

type CubePaginationAmountProps = {
  isMinimal: boolean
  totalItems: number
  testId?: string
}

export const CubePaginationAmount = (props: CubePaginationAmountProps) => {
  const { isMinimal, totalItems, testId } = props

  const { t } = useCubeUiTranslation()

  return (
    <div
      className="secondary-body4 p-[10px] text-functional-text"
      data-testid={testId}
    >
      <span>
        {isMinimal
          ? t('component.pagination.amount.short')
          : t('component.pagination.amount.long')}
      </span>
      {totalItems}
    </div>
  )
}
