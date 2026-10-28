import { useState, type PropsWithChildren } from 'react'
import { SubHeading } from '@internals/components/SubHeading'
import {
  CubePagination,
  type CubePaginationProps,
} from '@components/CubePagination/CubePagination'
import {
  DEFAULT_ITEMS_PER_PAGE,
  type ItemsPerPage,
} from '@components/CubePagination/cubePaginationUtils'

export type PaginationRowProps = PropsWithChildren<{
  title: string
  /**
   * The container width. Below 798px the pagination switches to its minimal
   * layout.
   */
  width: number
}>

export const PaginationRow = (props: PaginationRowProps) => {
  const { children, title, width } = props

  return (
    <div className="flex flex-col gap-y-3">
      <SubHeading>{title}</SubHeading>
      <div style={{ width }}>{children}</div>
    </div>
  )
}

/**
 * A pagination that keeps its own page and items-per-page state.
 */
export const StatefulPagination = (
  props: Pick<CubePaginationProps, 'totalItems' | 'isLoading'>,
) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState<ItemsPerPage>(
    DEFAULT_ITEMS_PER_PAGE,
  )

  return (
    <CubePagination
      {...props}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onPageChange={setCurrentPage}
      onItemsPerPageChange={setItemsPerPage}
    />
  )
}
