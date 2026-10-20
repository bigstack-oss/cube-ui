import { useState } from 'react'
import { uniqueId } from 'lodash'
import { CubeButton } from '@components/CubeButton/CubeButton'
import { useCubeToast } from '@components/CubeNotification/CubeToast/useCubeToast'
import { mockToasts } from './mockData'

/**
 * Adds the next toast from `mockToasts` through `useCubeToast`.
 */
export const CreateToastButton = () => {
  const { addToast } = useCubeToast()

  const [activeToast, setActiveToast] = useState(0)

  const handleAddToast = () => {
    const toast = mockToasts[activeToast]
    if (toast) {
      addToast({ ...toast, id: uniqueId('toast-') })
    }
    setActiveToast((activeToast + 1) % mockToasts.length)
  }

  return (
    <CubeButton type="primary" usage="text-only" onClick={handleAddToast}>
      Create Toast
    </CubeButton>
  )
}
