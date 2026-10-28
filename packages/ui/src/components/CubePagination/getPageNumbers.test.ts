import { getPageNumbers } from './getPageNumbers'

describe('getPageNumbers', () => {
  describe('general', () => {
    const general = (totalPages: number, currentPage: number) =>
      getPageNumbers({ isMinimal: false, totalPages, currentPage })

    it('shows every page up to 7 pages', () => {
      expect(general(7, 1)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })

    it.each([
      [1, [1, 2, 3, 4, 5, 'ellipsis', 8]],
      [5, [1, 'ellipsis', 4, 5, 6, 7, 8]],
    ])('handles 8 pages at page %i', (currentPage, expected) => {
      expect(general(8, currentPage)).toEqual(expected)
    })

    it.each([
      [3, [1, 2, 3, 4, 5, 'ellipsis', 49]],
      [25, [1, 'ellipsis', 24, 25, 26, 'ellipsis', 49]],
      [47, [1, 'ellipsis', 45, 46, 47, 48, 49]],
    ])('shows a window around page %i of 49', (currentPage, expected) => {
      expect(general(49, currentPage)).toEqual(expected)
    })
  })

  describe('minimal', () => {
    const minimal = (totalPages: number, currentPage: number) =>
      getPageNumbers({ isMinimal: true, totalPages, currentPage })

    it('shows page 1 when there are no pages', () => {
      expect(minimal(0, 1)).toEqual([1])
    })

    it('shows every page up to 5 pages', () => {
      expect(minimal(5, 3)).toEqual([1, 2, 3, 4, 5])
    })

    it.each([
      [2, [1, 2, 3, 'ellipsis', 49]],
      [25, ['ellipsis', 24, 25, 26, 'ellipsis']],
      [48, [1, 'ellipsis', 47, 48, 49]],
    ])('shows a window around page %i of 49', (currentPage, expected) => {
      expect(minimal(49, currentPage)).toEqual(expected)
    })
  })
})
