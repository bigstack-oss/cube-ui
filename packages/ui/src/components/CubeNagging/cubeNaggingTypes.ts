import type { PropsWithClassName } from '@shared-types/react-types'
import type { CubeHyperlinkProps } from '../CubeHyperlink/cubeHyperlinkTypes'

export const cubeNaggingTypes = ['error', 'warning'] as const

export const cubeNaggingVariants = ['sidebar', 'top'] as const

export type CubeNaggingType = (typeof cubeNaggingTypes)[number]

export type CubeNaggingVariant = (typeof cubeNaggingVariants)[number]

export type CubeNaggingLink = Pick<CubeHyperlinkProps, 'href' | 'onClick'> & {
  text: CubeHyperlinkProps['children']
}

export type CubeNaggingProps = PropsWithClassName & {
  type: CubeNaggingType
  title: string
  titleClassName?: string
  description?: string | string[]
  link?: CubeNaggingLink
} & (
    | { variant: Extract<CubeNaggingVariant, 'sidebar'> }
    | { variant: Extract<CubeNaggingVariant, 'top'>; onClose?: () => void }
  )
