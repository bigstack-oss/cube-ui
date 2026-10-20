import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeNotificationType } from '../cubeNotificationTypes'

export const toast = cva(
  [
    'flex w-[352px] shrink-0 flex-col gap-[10px] rounded-[5px] border p-5',
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
    },
  },
)
