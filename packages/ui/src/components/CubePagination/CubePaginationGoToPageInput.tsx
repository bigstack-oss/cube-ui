import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import {
  CubeTableInput,
  type CubeTableInputProps,
} from '../CubeTableInput/CubeTableInput'

type CubePaginationGoToPageInputProps = CubeTableInputProps & {
  isMinimal: boolean
}

export const CubePaginationGoToPageInput = (
  props: CubePaginationGoToPageInputProps,
) => {
  const { isMinimal, ...restProps } = props

  const { t } = useCubeUiTranslation()

  return (
    <div className="secondary-body4 flex items-center">
      {!isMinimal && (
        <div className="p-[10px]">{t('component.pagination.goTo')}</div>
      )}
      {/* Use table input because the space for error message/icon is limited
          in pagination. */}
      <CubeTableInput {...restProps} className="h-7 w-[59px]" />
    </div>
  )
}
