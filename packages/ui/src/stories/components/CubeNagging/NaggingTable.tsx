import type { PropsWithChildren } from 'react'
import { LabelText } from '@internals/components/LabelText'
import { SubHeading } from '@internals/components/SubHeading'
import { CubeNagging } from '@components/CubeNagging/CubeNagging'
import {
  cubeNaggingVariants,
  type CubeNaggingType,
  type CubeNaggingVariant,
} from '@components/CubeNagging/cubeNaggingTypes'
import { createLink } from './mockData'

// `sidebar` is 200px wide in the app; `top` spans the page, shown here at
// three times that width.
const rowClassName = 'grid grid-cols-[180px_200px_600px] items-start gap-x-8'

export type NaggingRowProps = {
  title: string
  type: CubeNaggingType
  /**
   * The nagging title, or one per variant (e.g. a longer one for `top`).
   */
  naggingTitle: string | Record<CubeNaggingVariant, string>
  description?: string | string[]
  hasLink?: boolean
  /**
   * Passes `onClose` to the `top` nagging, which shows the close icon.
   * `sidebar` has no close button, so its cell says so instead.
   */
  isClosable?: boolean
}

/**
 * One Gallery row: the nagging in each `variant` column, with the given
 * props.
 */
export const NaggingRow = (props: NaggingRowProps) => {
  const {
    title,
    type,
    naggingTitle,
    description,
    hasLink = false,
    isClosable = false,
  } = props

  const renderCell = (variant: CubeNaggingVariant) => {
    const common = {
      type,
      title:
        typeof naggingTitle === 'string' ? naggingTitle : naggingTitle[variant],
      description,
      link: hasLink ? createLink() : undefined,
    }

    if (variant === 'sidebar') {
      return isClosable ? (
        <LabelText className="text-functional-text-light">
          Not available
        </LabelText>
      ) : (
        <CubeNagging {...common} variant="sidebar" />
      )
    }

    return (
      <CubeNagging
        {...common}
        variant="top"
        onClose={isClosable ? () => {} : undefined}
      />
    )
  }

  return (
    <div className={rowClassName}>
      <SubHeading>{title}</SubHeading>
      {cubeNaggingVariants.map((variant) => (
        // A block (not flex) cell, so the nagging fills the column width.
        <div key={variant}>{renderCell(variant)}</div>
      ))}
    </div>
  )
}

const NaggingRowHeader = () => {
  return (
    <div className={rowClassName}>
      <span />
      {cubeNaggingVariants.map((variant) => (
        <SubHeading key={variant}>{variant}</SubHeading>
      ))}
    </div>
  )
}

NaggingRow.Header = NaggingRowHeader

export type NaggingVariantRowProps = PropsWithChildren<{
  variant: CubeNaggingVariant
}>

/**
 * Variants section row: the variant name, then the nagging at that
 * variant's width.
 */
export const NaggingVariantRow = (props: NaggingVariantRowProps) => {
  const { variant, children } = props

  return (
    <div className="grid grid-cols-[180px_minmax(0,1fr)] items-start gap-x-8">
      <SubHeading>{variant}</SubHeading>
      <div className={variant === 'sidebar' ? 'w-[200px]' : 'w-[600px]'}>
        {children}
      </div>
    </div>
  )
}
