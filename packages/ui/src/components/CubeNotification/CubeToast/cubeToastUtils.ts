import type { CubeNotificationBaseProps } from '../cubeNotificationTypes'

// Visible toasts amount
export const MAX_VISIBLE_TOASTS_AMOUNT = 4

// Default lifetime of a toasts (in ms)
export const TOAST_LIFETIME = 5000

export type CubeToastType = CubeNotificationBaseProps & {
  id: string
  message: string
  time: string
}
