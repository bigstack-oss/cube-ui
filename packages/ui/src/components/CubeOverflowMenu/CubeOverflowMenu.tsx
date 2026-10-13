import {
  cloneElement,
  type MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useFloating } from '@internals/utils/floating/useFloating'
import { assignRefValue } from '../CubeTextarea/cubeTextareaUtils'
import { CubeOverflowMenuContext } from './cubeOverflowMenuContext'
import { CubeOverflowMenuDivider } from './CubeOverflowMenuDivider'
import { CubeOverflowMenuItem } from './CubeOverflowMenuItem'
import { CubeOverflowMenuTitle } from './CubeOverflowMenuTitle'
import { menu } from './cubeOverflowMenuStyles'
import type { CubeOverflowMenuProps } from './cubeOverflowMenuTypes'

export const CubeOverflowMenu = (props: CubeOverflowMenuProps) => {
  const { triggerElement, children } = props

  const [isOpen, setIsOpen] = useState(false)

  const { anchorRef, elementRef, resolvedStyles } = useFloating({
    isOpen,
    placement: 'bottom-left',
    offsets: {
      y: 8,
    },
  })

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isAnchor = anchorRef.current?.contains(target)
      const isMenu = elementRef.current?.contains(target)

      if (!isAnchor && !isMenu) {
        setIsOpen(false)
      }
    }

    window.addEventListener('click', onOutsideClick)

    return () => {
      window.removeEventListener('click', onOutsideClick)
    }
  }, [anchorRef, elementRef])

  const clonedAnchor = cloneElement(triggerElement, {
    ref: (element: HTMLElement | null) => {
      assignRefValue(triggerElement.props.ref, element)
      assignRefValue(anchorRef, element)
    },
    onClick: (e: ReactMouseEvent<HTMLElement>) => {
      setIsOpen((prev) => !prev)
      triggerElement.props.onClick?.(e)
    },
  })

  return (
    <CubeOverflowMenuContext.Provider value={closeMenu}>
      {clonedAnchor}
      {createPortal(
        <div
          ref={elementRef}
          className={menu()}
          style={resolvedStyles?.floatingStyle}
        >
          {children}
        </div>,
        document.body,
      )}
    </CubeOverflowMenuContext.Provider>
  )
}

CubeOverflowMenu.Item = CubeOverflowMenuItem
CubeOverflowMenu.Divider = CubeOverflowMenuDivider
CubeOverflowMenu.Title = CubeOverflowMenuTitle
