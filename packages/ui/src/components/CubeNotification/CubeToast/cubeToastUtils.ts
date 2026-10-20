import type { CubeNotificationBaseProps } from '../cubeNotificationTypes'

// Visible toasts amount
export const MAX_VISIBLE_TOASTS_AMOUNT = 4

// Default lifetime of a toasts (in ms)
export const TOAST_LIFETIME = 5000

// `onClose` is left out: the provider owns closing. To close a toast from
// code, call `useCubeToast().removeToast(id)`.
export type CubeToastType = Omit<CubeNotificationBaseProps, 'onClose'> & {
  id: string
  message: string
  time: string
}
