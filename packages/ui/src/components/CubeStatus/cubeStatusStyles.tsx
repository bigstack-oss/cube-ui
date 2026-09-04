import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeStatusType } from './cubeStatusUtils'

export const status = cva(
  [
    'flex h-[19px] w-fit cursor-default items-center rounded-[20px] border px-2.5',
    'secondary-body6 whitespace-nowrap font-semibold',
  ],
  {
    variants: {
      type: {
        neutral: 'border-cosmos-primary text-cosmos-primary',
        success: 'border-status-positive text-status-positive',
        warning: 'border-status-negative text-status-negative',
        others: 'border-functional-text-light text-functional-text-light',
      } satisfies Record<CubeStatusType, ClassValue>,
    },
  },
)
