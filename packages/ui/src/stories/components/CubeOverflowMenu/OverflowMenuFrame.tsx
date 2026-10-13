import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import { menu } from '@components/CubeOverflowMenu/cubeOverflowMenuStyles'

/**
 * A static, always-visible panel with the menu's own styles, so the Gallery
 * can show menu content without opening a floating menu.
 */
export const OverflowMenuFrame = (props: PropsWithChildren) => {
  const { children } = props

  return <div className={twMerge(menu(), 'w-fit')}>{children}</div>
}
