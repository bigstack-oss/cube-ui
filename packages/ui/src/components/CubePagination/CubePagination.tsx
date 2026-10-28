import { useState, type KeyboardEvent } from 'react'
import {
  MonochromeChevronLeft,
  MonochromeChevronLeftEnd,
  MonochromeChevronRight,
  MonochromeChevronRightEnd,
} from '@icons'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { CubePaginationAmount } from './CubePaginationAmount'
import { CubePaginationGoToPageInput } from './CubePaginationGoToPageInput'
import { CubePaginationItemButton } from './CubePaginationItemButton'
import { CubePaginationItemWrap } from './CubePaginationItemWrap'
import { CubePaginationSkeleton } from './CubePaginationSkeleton'
import {
  DEFAULT_ITEMS_PER_PAGE,
  type ItemsPerPage,
} from './cubePaginationUtils'
import { CubePaginationViewDropdown } from './CubePaginationViewDropdown'
import { getPageNumbers } from './getPageNumbers'
import { usePaginationSize } from './usePaginationSize'

export type CubePaginationProps = {
  isLoading?: boolean
  /**
   * The total number of items
   */
  totalItems: number
  /**
   * The current page is 1-indexed
   * i.e., the first page is 1, not 0
   */
  currentPage: number
  /**
   * @default 10
   */
  itemsPerPage: ItemsPerPage
  onPageChange?: (page: number) => void
  onItemsPerPageChange?: (itemsPerPage: ItemsPerPage) => void
}

export const CubePagination = (props: CubePaginationProps) => {
  const {
    isLoading = false,
    totalItems,
    currentPage = 1,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
    onPageChange,
    onItemsPerPageChange,
  } = props

  const { t } = useCubeUiTranslation()

  const [inputPage, setInputPage] = useState('')

  const { containerRef, isMinimal } = usePaginationSize()

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const isEmpty = totalItems === 0

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page)
    }
  }

  const handleGoToPage = () => {
    const page = parseInt(inputPage)
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      onPageChange?.(page)
      setInputPage('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGoToPage()
    }
  }

  const handleItemsPerPageChange = (num: ItemsPerPage) => {
    onItemsPerPageChange?.(num)
    handlePageChange(1)
  }

  const pageNumbers = getPageNumbers({ isMinimal, totalPages, currentPage })

  return (
    <div ref={containerRef} className="flex items-center justify-between">
      {isLoading ? (
        <CubePaginationSkeleton isMinimal={isMinimal} />
      ) : (
        <>
          <CubePaginationAmount isMinimal={isMinimal} totalItems={totalItems} />
          <div className="flex items-center">
            <CubePaginationItemButton
              type="icon"
              isMinimal={isMinimal}
              disabled={isEmpty || currentPage === 1}
              onClick={() => handlePageChange(1)}
              aria-label={t('component.pagination.firstPage')}
            >
              <MonochromeChevronLeftEnd className="icon-md" />
            </CubePaginationItemButton>
            <CubePaginationItemButton
              type="icon"
              isMinimal={isMinimal}
              disabled={isEmpty || currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label={t('component.pagination.previousPage')}
            >
              <MonochromeChevronLeft className="icon-md" />
            </CubePaginationItemButton>
            {pageNumbers.map((page, index) => {
              return page === 'ellipsis' ? (
                <CubePaginationItemWrap
                  key={`${page}-${index}`}
                  isMinimal={isMinimal}
                >
                  ...
                </CubePaginationItemWrap>
              ) : (
                <CubePaginationItemButton
                  key={`${page}-${index}`}
                  type="number"
                  isMinimal={isMinimal}
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  aria-label={t('component.pagination.pageNumber', { page })}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </CubePaginationItemButton>
              )
            })}
            <CubePaginationItemButton
              type="icon"
              isMinimal={isMinimal}
              disabled={isEmpty || currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label={t('component.pagination.nextPage')}
            >
              <MonochromeChevronRight className="icon-md" />
            </CubePaginationItemButton>
            <CubePaginationItemButton
              type="icon"
              isMinimal={isMinimal}
              disabled={isEmpty || currentPage === totalPages}
              onClick={() => handlePageChange(totalPages)}
              aria-label={t('component.pagination.lastPage')}
            >
              <MonochromeChevronRightEnd className="icon-md" />
            </CubePaginationItemButton>
            <CubePaginationGoToPageInput
              isMinimal={isMinimal}
              placeholder={t('component.pagination.page')}
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleGoToPage}
              disabled={isEmpty}
            />
          </div>
          <CubePaginationViewDropdown
            isMinimal={isMinimal}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  )
}
