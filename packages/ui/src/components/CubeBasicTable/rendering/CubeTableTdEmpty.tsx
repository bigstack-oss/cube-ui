import { twMerge } from 'tailwind-merge'
import { MonochromeSearch } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'

type CubeTableTdEmptyProps = {
  length: number
}

export const CubeTableTdEmpty = (props: CubeTableTdEmptyProps) => {
  const { length } = props

  const { t } = useCubeUiTranslation()

  return (
    <td colSpan={length} className="p-6">
      <div
        className={twMerge(
          'flex flex-col items-center justify-center text-functional-text-light',
        )}
      >
        <MonochromeSearch className="icon-lg m-[10px]" />
        <p className="primary-body2">{t('component.table.noResult')}</p>
      </div>
    </td>
  )
}
