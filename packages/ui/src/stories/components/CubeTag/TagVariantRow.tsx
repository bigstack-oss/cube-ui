import { CubeTag } from '@components/CubeTag'
import {
  cubeTagVariants,
  type CubeTagProps,
} from '@components/CubeTag/cubeTagTypes'
import { MonochromeTag } from '@icons'
import { SubHeading } from '@internals/components/SubHeading'
import { TagRow } from './TagRow'

type TagVariantRowProps = Pick<CubeTagProps, 'color' | 'disabled'> & {
  title: string
}

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
    <p className="primary-body2 text-functional-title">Basic</p>
    <p className="primary-body2 text-functional-title">w/Close Icon</p>
    <p className="primary-body2 text-functional-title">w/Tag Icon</p>
  </div>
)

/**
 * One Gallery row: the tag in each `variant` (column groups) and content
 * (Basic / w/Close Icon / w/Tag Icon), with the given color and state.
 */
export const TagVariantRow = (props: TagVariantRowProps) => {
  const { title, color, disabled } = props

  return (
    <TagRow title={title}>
      {cubeTagVariants.map((variant) => (
        <TagCellWithVariants
          key={variant}
          color={color}
          variant={variant}
          disabled={disabled}
        />
      ))}
    </TagRow>
  )
}

const TagVariantRowHeader = () => {
  return (
    <>
      <TagRow title="">
        {cubeTagVariants.map((variant) => (
          <SubHeading key={variant} className="col-span-3 text-center">
            {variant}
          </SubHeading>
        ))}
      </TagRow>
      <TagRow title="">
        {cubeTagVariants.map((variant) => (
          <SubHeadingRow key={variant} />
        ))}
      </TagRow>
    </>
  )
}

TagVariantRow.Header = TagVariantRowHeader
