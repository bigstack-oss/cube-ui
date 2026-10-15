import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type { CubeIconTextType } from './cubeIconTextTypes'

export const iconText = cva(
  'secondary-body4 whitespace-nowrap rounded px-1 py-0.5 text-center font-semibold text-grey-0',
  {
    variants: {
      type: {
        primary: 'bg-cosmos-primary',
        warning: 'bg-status-paused',
        error: 'bg-status-negative',
        functional: 'bg-functional-text',
        secondary: 'bg-cosmos-secondary text-functional-text',
        positive: 'bg-status-positive',
        'primary-outline': [
          'secondary-body5 font-medium text-cosmos-primary',
          'border border-cosmos-primary bg-grey-0 px-[5px]',
        ],
      } satisfies Record<CubeIconTextType, ClassValue>,
    },
  },
)
