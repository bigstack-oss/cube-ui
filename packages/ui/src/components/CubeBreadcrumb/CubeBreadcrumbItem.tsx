import { useContext, type PropsWithChildren, type ReactNode } from 'react'
import { MonochromeChevronRight } from '@icons'
import { testIdOf } from '@utils/testId'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import { CubeBreadcrumbTestIdContext } from './cubeBreadcrumbContext'
import type { CubeBreadcrumbItemProps } from './cubeBreadcrumbTypes'

export const CubeBreadcrumbItem = <ContainerProps extends PropsWithChildren>(
  props: CubeBreadcrumbItemProps<ContainerProps>,
) => {
  const { label, href, onClick, itemContainer, 'data-key': keyProp } = props

  const itemTestId = testIdOf(useContext(CubeBreadcrumbTestIdContext), 'item')
  // The label identifies the item unless the consumer passes its own key.
  const testKey = itemTestId ? (keyProp ?? label) : undefined

  const isLink = Boolean(href || onClick || itemContainer)

  let breadcrumbItem: ReactNode

  const hyperlink = (
    <CubeHyperlink
      color="primary"
      variant="text-only"
      href={href}
      onClick={onClick}
      disabled={false}
      className="primary-body3"
      data-testid={itemTestId}
      data-key={testKey}
    >
      {label}
    </CubeHyperlink>
  )

  if (isLink) {
    if (itemContainer) {
      const { Component, props: containerProps } = itemContainer
      breadcrumbItem = <Component {...containerProps}>{hyperlink}</Component>
    } else {
      breadcrumbItem = hyperlink
    }
  } else {
    breadcrumbItem = (
      <div
        className="primary-body3 font-medium text-functional-text"
        data-testid={itemTestId}
        data-key={testKey}
      >
        {label}
      </div>
    )
  }

  return (
    <div className="group flex items-center gap-3">
      {breadcrumbItem}
      <MonochromeChevronRight className="icon-lg text-functional-text-light group-last:hidden" />
    </div>
  )
}
