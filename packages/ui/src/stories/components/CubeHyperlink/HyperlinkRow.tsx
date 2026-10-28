import { MonochromeChevronDown, MonochromeHome01 } from '@icons'
import { CubeHyperlink } from '@components/CubeHyperlink'
import {
  cubeHyperlinkVariants,
  type CubeHyperlinkColor,
  type CubeHyperlinkSize,
  type CubeHyperlinkVariant,
} from '@components/CubeHyperlink/cubeHyperlinkTypes'
import { SubHeading } from '@internals/components/SubHeading'

export const hyperlinkText = 'Call to Action'
export const hyperlinkHref = `/#${Math.random()}`

const rowClassName =
  'grid grid-cols-[120px_repeat(4,minmax(0,1fr))] items-center gap-x-8'

export type HyperlinkCellProps = {
  variant: CubeHyperlinkVariant
  color?: CubeHyperlinkColor
  size?: CubeHyperlinkSize
  disabled?: boolean
}

export const HyperlinkCell = (props: HyperlinkCellProps) => {
  const { variant, ...rest } = props
  const shared = { ...rest, href: hyperlinkHref, children: hyperlinkText }

  switch (variant) {
    case 'icon-left':
      return (
        <CubeHyperlink {...shared} variant={variant} Icon={MonochromeHome01} />
      )
    case 'icon-right':
      return (
        <CubeHyperlink
          {...shared}
          variant={variant}
          Icon={MonochromeChevronDown}
        />
      )
    case 'text-inline':
      return <CubeHyperlink {...shared} variant={variant} />
    case 'text-only':
    default:
      return <CubeHyperlink {...shared} variant="text-only" />
  }
}

export type HyperlinkRowProps = Omit<HyperlinkCellProps, 'variant'> & {
  title: string
}

/**
 * One Gallery row: the hyperlink in each `variant`, with the given props.
 */
export const HyperlinkRow = (props: HyperlinkRowProps) => {
  const { title, ...hyperlinkProps } = props

  return (
    <div className={rowClassName}>
      <SubHeading>{title}</SubHeading>
      {cubeHyperlinkVariants.map((variant) => (
        <div key={variant} className="flex items-center whitespace-nowrap">
          <HyperlinkCell {...hyperlinkProps} variant={variant} />
        </div>
      ))}
    </div>
  )
}

const HyperlinkRowHeader = () => {
  return (
    <div className={rowClassName}>
      <span />
      {cubeHyperlinkVariants.map((variant) => (
        <SubHeading key={variant}>{variant}</SubHeading>
      ))}
    </div>
  )
}

HyperlinkRow.Header = HyperlinkRowHeader
