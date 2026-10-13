import { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeSearch } from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubeDropdownContext } from './cubeDropdownContext'
import { filterContainer, filterIcon, filterInput } from './cubeDropdownStyles'

export const CubeDropdownFilter = () => {
  const { size, type, searchValue, handleSearchValueChange } =
    useContext(CubeDropdownContext)

  const { t } = useCubeUiTranslation()

  return (
    <div className={twMerge(filterContainer({ size, type }))}>
      <input
        type="text"
        className={twMerge(filterInput())}
        placeholder={t('component.dropdown.search')}
        value={searchValue}
        onChange={handleSearchValueChange}
      />
      <MonochromeSearch className={twMerge(filterIcon({ size, type }))} />
    </div>
  )
}
