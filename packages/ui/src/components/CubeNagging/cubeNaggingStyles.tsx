import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeNaggingType } from './cubeNaggingTypes'

export const nagging = cva(
  [
    'flex flex-col gap-[6px] self-start rounded-md border bg-yellow-50 p-3',
    'shadow-[0_0_2px_0_rgba(0,0,0,0.2)]',
  ],
  {
    variants: {
      type: {
        error: 'border-status-negative',
        warning: 'border-status-warning',
      } satisfies Record<CubeNaggingType, ClassValue>,
    },
  },
)
