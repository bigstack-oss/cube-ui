import { cva } from 'class-variance-authority'

export const detailsTableHeader = cva([
  'rounded-t-[5px] bg-functional-text px-4 py-2',
  'secondary-body3 text-left font-semibold text-grey-0',
  'border-x border-t border-functional-border-divider',
])

export const detailsTableRow = cva([
  '[&:first-of-type>*]:border-t',
  '[&:last-of-type>*:first-child]:rounded-bl-[5px]',
  '[&:last-of-type>*:last-child]:rounded-br-[5px]',
  '[&:hover>*]:bg-functional-hover-grey',
])

export const detailsTableCell = cva(
  [
    'primary-body4 whitespace-nowrap px-4 py-2.5 text-left',
    'border-b border-b-functional-border-divider bg-grey-0',
    'first:border-l last:border-r',
  ],
  {
    variants: {
      type: {
        title: 'font-semibold text-functional-text',
        content: 'text-functional-text-light',
      },
    },
  },
)
