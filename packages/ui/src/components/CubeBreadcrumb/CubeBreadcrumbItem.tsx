import type { PropsWithChildren, ReactNode } from 'react'
import { MonochromeChevronRight } from '@icons'
import { CubeHyperlink } from '../CubeHyperlink/CubeHyperlink'
import type { CubeBreadcrumbItemProps } from './cubeBreadcrumbTypes'

export const CubeBreadcrumbItem = <ContainerProps extends PropsWithChildren>(
  props: CubeBreadcrumbItemProps<ContainerProps>,
) => {
  const { label, href, onClick, itemContainer } = props

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
      <div className="primary-body3 font-medium text-functional-text">
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
