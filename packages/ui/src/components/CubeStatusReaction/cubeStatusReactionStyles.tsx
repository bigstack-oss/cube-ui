import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeStatusReactionType } from './cubeStatusReactionUtils'

export const baseClass = 'inline-flex w-fit items-center gap-x-2 px-2 py-[5px]'

export const statusReaction = cva(
  [baseClass, 'secondary-body3 whitespace-nowrap font-semibold'],
  {
    variants: {
      type: {
        neutral: 'text-status-neutral',
        success: 'text-status-positive',
        warning: 'text-status-negative',
      } satisfies Record<CubeStatusReactionType, ClassValue>,
    },
  },
)
