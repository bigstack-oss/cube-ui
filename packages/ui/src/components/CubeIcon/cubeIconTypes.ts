import type {
  ForwardRefExoticComponent,
  ReactElement,
  RefAttributes,
  SVGProps,
} from 'react'

export const cubeIconSizes = ['xs', 'sm', 'md-sm', 'md', 'lg', 'xl'] as const

export type CubeIconSize = (typeof cubeIconSizes)[number]

export type SvgComponent = ForwardRefExoticComponent<
  SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>
>

export type SvgElement = ReactElement<SVGProps<SVGSVGElement>>

export type CubeIconFrameProps = {
  className?: string
  /**
   * @default "md"
   */
  size?: CubeIconSize
  onClick?: () => void
  children: SvgElement
}
