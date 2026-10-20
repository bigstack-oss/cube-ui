import { useCallback, useRef, useState, type PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import { MAX_VISIBLE_TOASTS_AMOUNT, type CubeToastType } from './cubeToastUtils'
import { CubeToastContext } from './cubeToastContext'
import { CubeToastList } from './CubeToastList'

export const CubeToastProvider = (props: PropsWithChildren) => {
  const { children } = props

  const [toasts, setToasts] = useState<CubeToastType[]>([])

  /**
   * Only expose add/remove in the context to avoid unnecessary re-renders
   */
  const addToast = useCallback((toast: CubeToastType) => {
    setToasts((prevToasts) => {
      const next = [...prevToasts, toast]
      if (next.length > MAX_VISIBLE_TOASTS_AMOUNT) {
        next.shift()
      }
      return next
    })
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  /**
   * Memorize context value with a stable reference
   */
  const contextValueRef = useRef({
    addToast,
    removeToast,
  })

  return (
    <CubeToastContext.Provider value={contextValueRef.current}>
      {children}
      {createPortal(
        <CubeToastList toasts={toasts} removeToast={removeToast} />,
        document.body,
      )}
    </CubeToastContext.Provider>
  )
}
