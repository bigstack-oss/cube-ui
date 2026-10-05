import { cva } from 'class-variance-authority'
import type { ClassValue } from 'class-variance-authority/types'
import type {
  HorizontalPlacement,
  VerticalPlacement,
} from '@internals/utils/floating/types'

export const caret = cva(
  'inline-block size-0 border-[6px] border-t-0 border-solid border-transparent border-b-dark-700',
  {
    variants: {
      horizontalPlacement: {
        left: 'ml-4 self-start',
        center: 'self-center',
        right: 'mr-4 self-end',
        'follow-cursor': 'self-center',
      } satisfies Record<HorizontalPlacement, ClassValue>,
    },
  },
)

export const infoBoxContainer = cva(
  'pointer-events-none absolute flex min-w-[50px] max-w-[480px]',
  {
    variants: {
      verticalPlacement: {
        top: 'flex-col',
        bottom: 'flex-col-reverse',
      } satisfies Record<VerticalPlacement, ClassValue>,
    },
  },
)
