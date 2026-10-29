import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export const bodyTrCellBorderRadiusClass = twMerge(
  '[&:last-of-type>td:first-of-type]:rounded-bl-[5px]',
  '[&:last-of-type>td:last-of-type]:rounded-br-[5px]',
)

export const table = cva('w-full border-separate border-spacing-0')

export const tableTh = cva(
  [
    'secondary-body3 px-4 py-2 text-left text-functional-text-light',
    'border-y border-functional-border-divider bg-scene-background',
    'first-of-type:border-l last-of-type:border-r',
  ],
  {
    variants: {
      isTableEmpty: {
        true: 'first-of-type:rounded-l-[5px] last-of-type:rounded-r-[5px]',
        false: 'first-of-type:rounded-tl-[5px] last-of-type:rounded-tr-[5px]',
      },
    },
  },
)

export const tableTd = cva(
  [
    'primary-body4 px-4 py-2.5 text-functional-text',
    'border-b border-b-functional-border-divider bg-grey-0',
    'first-of-type:border-l last-of-type:border-r',
  ],
  {
    variants: {
      emphasize: {
        true: 'font-semibold',
      },
      fitContent: {
        /**
         * Workaround:
         * `w-0` is used to prevent the table cell from expanding.
         * `w-fit` doesn't work when target element is a table cell.
         **/
        true: 'w-0',
      },
    },
  },
)

export const tableBodyTr = cva('', {
  variants: {
    isHoverable: {
      true: '[&>td]:hover:bg-functional-hover-grey',
    },
    /**
     * Which row rounds the table's bottom corners. `last-of-type` suits
     * hand-built tables; `CubeBasicTable` passes `true` to its last visible
     * row instead, since a collapsed sub row can be the last `<tr>`.
     */
    roundedBottom: {
      'last-of-type': bodyTrCellBorderRadiusClass,
      true: twMerge(
        '[&>td:first-of-type]:rounded-bl-[5px]',
        '[&>td:last-of-type]:rounded-br-[5px]',
      ),
      false: '',
    },
  },
  defaultVariants: {
    isHoverable: true,
    roundedBottom: 'last-of-type',
  },
})

/**
 * The table styles grouped for hand-built tables that should look like
 * `CubeBasicTable`, e.g. `<td className={cubeTableStyles.td()}>`.
 */
export const cubeTableStyles = {
  table,
  th: tableTh,
  td: tableTd,
  bodyTr: tableBodyTr,
}
