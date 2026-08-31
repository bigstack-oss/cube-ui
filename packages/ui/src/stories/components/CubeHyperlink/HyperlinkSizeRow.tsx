import type { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  CubeHyperlink,
  type CubeHyperlinkProps,
} from '@components/CubeHyperlink'
import type {
  CubeHyperlinkColor,
  CubeHyperlinkSize,
} from '@components/CubeHyperlink/cubeHyperlinkTypes'
import { MonochromeHome01, MonochromeChevronDown } from '@icons'
import { SubHeading } from '@internals/components/SubHeading'
import { LabelText } from '@internals/components/LabelText'

export const hyperlinkText = 'Call to Action'
export const hyperlinkHref = `/#${Math.random()}`

export const ColorHeading = (props: PropsWithChildren) => (
  <SubHeading className="flex items-center justify-center">
    {props.children}
  </SubHeading>
)

const SizeLabel = (props: PropsWithChildren) => (
  <SubHeading className="flex items-center justify-start self-center">
    {props.children}
  </SubHeading>
)

const CenteredHyperlink = (props: CubeHyperlinkProps) => (
  <div className="flex items-center justify-center whitespace-nowrap">
    <CubeHyperlink {...props} />
  </div>
)

type ColorTableProps = {
  color: CubeHyperlinkColor
  size: CubeHyperlinkSize
  showVariantHeader: boolean
  showStateLabels: boolean
}

const ColorTable = (props: ColorTableProps) => {
  const { color, size, showVariantHeader, showStateLabels } = props

  const className = twMerge(
    'grid shrink-0 gap-6',
    showStateLabels
      ? 'grid-cols-[5.5rem_repeat(4,auto)]'
      : 'grid-cols-[repeat(4,auto)]',
  )

  const shared = {
    color,
    size,
    href: hyperlinkHref,
    children: hyperlinkText,
  }

  return (
    <div className={className}>
      {showVariantHeader && (
        <>
          {showStateLabels && <span />}
          <LabelText className="text-center">Text Only</LabelText>
          <LabelText className="text-center">Icon Left</LabelText>
          <LabelText className="text-center">Icon Right</LabelText>
          <LabelText className="text-center">Inline Text</LabelText>
        </>
      )}

      {showStateLabels && <LabelText>Default</LabelText>}
      <CenteredHyperlink {...shared} variant="text-only" />
      <CenteredHyperlink
        {...shared}
        variant="icon-left"
        Icon={MonochromeHome01}
      />
      <CenteredHyperlink
        {...shared}
        variant="icon-right"
        Icon={MonochromeChevronDown}
      />
      <CenteredHyperlink {...shared} variant="text-inline" />

      {showStateLabels && <LabelText>Disabled</LabelText>}
      <CenteredHyperlink {...shared} variant="text-only" disabled />
      <CenteredHyperlink
        {...shared}
        variant="icon-left"
        Icon={MonochromeHome01}
        disabled
      />
      <CenteredHyperlink
        {...shared}
        variant="icon-right"
        Icon={MonochromeChevronDown}
        disabled
      />
      <CenteredHyperlink {...shared} variant="text-inline" disabled />
    </div>
  )
}

type SizeRowProps = {
  sizeText: string
  size: CubeHyperlinkSize
  showVariantHeader: boolean
}

export const HyperlinkSizeRow = (props: SizeRowProps) => {
  const { sizeText, size, showVariantHeader } = props

  return (
    <>
      <SizeLabel>{sizeText}</SizeLabel>
      <ColorTable
        color="primary"
        size={size}
        showVariantHeader={showVariantHeader}
        showStateLabels
      />
      <ColorTable
        color="secondary"
        size={size}
        showVariantHeader={showVariantHeader}
        showStateLabels={false}
      />
    </>
  )
}
