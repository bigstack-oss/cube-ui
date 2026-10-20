import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeNotificationType } from '../cubeNotificationTypes'

export const inlineNotification = cva(
  [
    'flex min-h-[44px] w-full gap-3 rounded-[5px] border px-4 py-[14px]',
    'primary-body4 text-functional-text-light',
  ],
  {
    variants: {
      type: {
        neutral: 'border-primary bg-primary-0',
        positive: 'border-status-positive bg-green-0',
        warning: 'border-status-warning bg-yellow-0',
        error: 'border-status-negative bg-red-0',
      } satisfies Record<CubeNotificationType, ClassValue>,
      isClose: {
        true: 'hidden',
      },
    },
    defaultVariants: {
      type: 'neutral',
      isClose: false,
    },
  },
)
