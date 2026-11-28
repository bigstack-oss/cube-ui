import { twMerge } from 'tailwind-merge'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import type { CubeDropdownSize, CubeDropdownType } from '../cubeDropdownTypes'
import { itemNoData } from '../cubeDropdownStyles'

type ItemNoDataProps = {
  size: CubeDropdownSize
  type: CubeDropdownType
  testId?: string
}

export const ItemNoData = (props: ItemNoDataProps) => {
  const { size, type, testId } = props

  const { t } = useCubeUiTranslation()

  return (
    <div className={twMerge(itemNoData({ size, type }))} data-testid={testId}>
      {t('component.common.noData')}
    </div>
  )
}
