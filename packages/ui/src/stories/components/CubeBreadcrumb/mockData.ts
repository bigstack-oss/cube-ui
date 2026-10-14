import type { CubeBreadcrumbItemProps } from '@components/CubeBreadcrumb/cubeBreadcrumbTypes'
import { ItemContainer } from './ItemContainer'

export const items = [
  { label: 'Breadcrumb 1', href: '/#1' },
  { label: 'Breadcrumb 2', href: '/#2' },
  { label: 'Breadcrumb 3', href: '/#3' },
  { label: 'Breadcrumb 4', href: '/#4' },
  { label: 'Current Page' },
] satisfies CubeBreadcrumbItemProps[]

// Clicking an item does nothing in the Gallery.
const onItemClick = () => {}

export const itemsWithContainer = [
  ...[1, 2, 3, 4].map((num) => ({
    label: `Breadcrumb ${num}`,
    onClick: onItemClick,
    itemContainer: {
      Component: ItemContainer,
      props: {},
    },
  })),
  { label: 'Current Page' },
] satisfies CubeBreadcrumbItemProps[]
