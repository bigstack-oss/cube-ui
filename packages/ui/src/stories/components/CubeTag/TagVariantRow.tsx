import { CubeTag } from '@components/CubeTag'
import {
  type CubeTagColor,
  type CubeTagProps,
} from '@components/CubeTag/cubeTagTypes'
import { MonochromeTag } from '@icons'
import { SubHeading } from '@internals/components/SubHeading'
import { TagRow } from './TagRow'

const colorLabels: Record<CubeTagColor, string> = {
  default: 'Default',
  'primary-blue': 'Primary Blue',
  blue: 'Blue',
  cyan: 'Cyan',
  dark: 'Dark',
}

// `color` is optional on CubeTagProps (defaults to "default"), but every
// gallery row must specify one explicitly, so it's required here.
type TagVariantRowProps = Required<Pick<CubeTagProps, 'color'>>

const CenteredTagElement = (props: CubeTagProps) => {
  return (
    <div className="flex items-center justify-center">
      <CubeTag {...props} />
    </div>
  )
}

export const TagCellWithVariants = (
  props: Pick<CubeTagProps, 'color' | 'variant' | 'disabled'>,
) => (
  <div className="col-span-3 grid grid-cols-3 items-center gap-x-6">
    <CenteredTagElement {...props}>Component</CenteredTagElement>
    <CenteredTagElement {...props} showCloseButton>
      Component
    </CenteredTagElement>
    <CenteredTagElement {...props} Icon={MonochromeTag}>
      Component
    </CenteredTagElement>
  </div>
)

const CenteredTagSkeleton = (props: { hasIcon: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <CubeTag.Skeleton hasIcon={props.hasIcon} />
    </div>
  )
}

export const TagSkeletonCells = () => (
  <div className="col-span-3 grid grid-cols-3 items-center gap-x-6">
    <CenteredTagSkeleton hasIcon={false} />
    <CenteredTagSkeleton hasIcon />
    <CenteredTagSkeleton hasIcon />
  </div>
)

export const SubHeadingRow = () => (
  <div className="col-span-3 grid grid-cols-3 items-center gap-x-6 text-center">
    <p className="primary-body2 text-functional-title">Text Only</p>
    <p className="primary-body2 text-functional-title">w/Close Icon</p>
    <p className="primary-body2 text-functional-title">w/Tag Icon</p>
  </div>
)

export const TagVariantRow = (props: TagVariantRowProps) => {
  const { color } = props

  return (
    <div className="flex flex-col gap-y-6">
      <TagRow title="">
        <SubHeading className="col-span-3 text-center">Filled</SubHeading>
        <SubHeading className="col-span-3 text-center">Stroke</SubHeading>
      </TagRow>
      <TagRow title="">
        <SubHeadingRow />
        <SubHeadingRow />
      </TagRow>
      <TagRow title={colorLabels[color]}>
        <TagCellWithVariants color={color} variant="filled" />
        <TagCellWithVariants color={color} variant="stroke" />
      </TagRow>
      <TagRow title={colorLabels[color] + ' / Disabled'}>
        <TagCellWithVariants color={color} variant="filled" disabled />
        <TagCellWithVariants color={color} variant="stroke" disabled />
      </TagRow>
    </div>
  )
}
