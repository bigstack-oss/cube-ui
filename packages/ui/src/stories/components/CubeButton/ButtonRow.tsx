import { MonochromeChevronDown, MonochromeHome01 } from '@icons'
import { CubeButton } from '@components/CubeButton'
import {
  cubeButtonUsages,
  type CubeButtonSize,
  type CubeButtonType,
  type CubeButtonUsage,
} from '@components/CubeButton/cubeButtonTypes'
import { SubHeading } from '@internals/components/SubHeading'

export const buttonText = 'Call to action'

const rowClassName =
  'grid grid-cols-[120px_repeat(4,minmax(0,1fr))] items-center gap-x-8'

type ButtonCellProps = {
  usage: CubeButtonUsage
  type?: CubeButtonType
  size?: CubeButtonSize
  disabled?: boolean
  loading?: boolean
}

const ButtonCell = (props: ButtonCellProps) => {
  const { usage, ...rest } = props

  switch (usage) {
    case 'icon-only':
      return <CubeButton {...rest} usage={usage} Icon={MonochromeHome01} />
    case 'icon-left':
      return (
        <CubeButton {...rest} usage={usage} Icon={MonochromeHome01}>
          {buttonText}
        </CubeButton>
      )
    case 'icon-right':
      return (
        <CubeButton {...rest} usage={usage} Icon={MonochromeChevronDown}>
          {buttonText}
        </CubeButton>
      )
    case 'text-only':
    default:
      return (
        <CubeButton {...rest} usage="text-only">
          {buttonText}
        </CubeButton>
      )
  }
}

export type ButtonRowProps = Omit<ButtonCellProps, 'usage'> & {
  title: string
  /**
   * Renders `CubeButton.Skeleton` instead of the button.
   */
  isSkeleton?: boolean
}

/**
 * One Gallery row: the button in each `usage`, with the given props.
 */
export const ButtonRow = (props: ButtonRowProps) => {
  const { title, isSkeleton = false, ...buttonProps } = props

  return (
    <div className={rowClassName}>
      <SubHeading>{title}</SubHeading>
      {cubeButtonUsages.map((usage) => (
        <div key={usage} className="flex items-center">
          {isSkeleton ? (
            <CubeButton.Skeleton size={buttonProps.size} usage={usage} />
          ) : (
            <ButtonCell {...buttonProps} usage={usage} />
          )}
        </div>
      ))}
    </div>
  )
}

const ButtonRowHeader = () => {
  return (
    <div className={rowClassName}>
      <span />
      {cubeButtonUsages.map((usage) => (
        <SubHeading key={usage}>{usage}</SubHeading>
      ))}
    </div>
  )
}

ButtonRow.Header = ButtonRowHeader
