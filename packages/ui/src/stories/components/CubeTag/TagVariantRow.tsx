import { CubeTag } from '@components/CubeTag'
import {
  cubeTagVariants,
  type CubeTagProps,
} from '@components/CubeTag/cubeTagTypes'
import { MonochromeTag } from '@icons'
import { SubHeading } from '@internals/components/SubHeading'
import { TagRow } from './TagRow'
import { tagContents, type TagContent } from './utils'

type TagVariantRowProps = Pick<CubeTagProps, 'color' | 'disabled'> & {
  title: string
}

export const TagCellWithVariants = (
  props: Pick<CubeTagProps, 'color' | 'variant' | 'disabled'>,
) => (
  <div className="col-span-3 grid grid-cols-3 items-center gap-x-6">
    {tagContents.map((content) => (
      <div key={content} className="flex items-center justify-center">
        <TagContentCell {...props} content={content} />
      </div>
    ))}
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

/**
 * One Gallery cell: a tag with the given content (see `tagContents`).
 */
export const TagContentCell = (
  props: Pick<CubeTagProps, 'color' | 'variant' | 'disabled'> & {
    content: TagContent
  },
) => {
  const { content, ...tagProps } = props

  switch (content) {
    case 'w/Close Icon':
      return (
        <CubeTag {...tagProps} showCloseButton>
          Component
        </CubeTag>
      )
    case 'w/Tag Icon':
      return (
        <CubeTag {...tagProps} Icon={MonochromeTag}>
          Component
        </CubeTag>
      )
    case 'Basic':
    default:
      return <CubeTag {...tagProps}>Component</CubeTag>
  }
}

export const SubHeadingRow = () => (
  <div className="col-span-3 grid grid-cols-3 items-center gap-x-6 text-center">
    {tagContents.map((content) => (
      <p key={content} className="primary-body2 text-functional-title">
        {content}
      </p>
    ))}
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
