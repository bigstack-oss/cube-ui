import {
  useState,
  type ChangeEvent,
  type InputHTMLAttributes,
  type RefObject,
} from 'react'
import { twMerge } from 'tailwind-merge'
import {
  MonochromeRadioButton as RadioButtonUnselected,
  MonochromeRadioButtonFilled as RadioButtonSelected,
} from '@icons'
import {
  container,
  iconWrap,
  label as labelStyles,
} from './cubeRadioButtonStyles'
import { CubeRadioButtonSkeleton } from './CubeRadioButtonSkeleton'
import { CubeRadioButtonGrid } from './CubeRadioButtonGrid'

export type CubeRadioButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  /**
   * @default false
   */
  isLoading?: boolean
  ref?: RefObject<HTMLInputElement | null>
}

export const CubeRadioButton = (props: CubeRadioButtonProps) => {
  const {
    label,
    id,
    ref,
    defaultChecked = false,
    checked: controlledChecked,
    onChange: onControlledCheckedChange,
    disabled,
    isLoading = false,
    ...restProps
  } = props

  const [uncontrolledChecked, setUncontrolledChecked] =
    useState<boolean>(defaultChecked)

  const isControlled = controlledChecked !== undefined

  const effectiveChecked = isControlled
    ? controlledChecked
    : uncontrolledChecked

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked)
    }
    onControlledCheckedChange?.(event)
  }

  const renderIcon = () => {
    const IconComponent = effectiveChecked
      ? RadioButtonSelected
      : RadioButtonUnselected

    return (
      <div
        className={twMerge(
          iconWrap({ disabled, isSelected: effectiveChecked }),
        )}
      >
        <IconComponent className="icon-md" />
      </div>
    )
  }

  if (isLoading) return <CubeRadioButtonSkeleton />

  return (
    <label htmlFor={id} className={twMerge(container({ disabled }))}>
      <input
        {...restProps}
        id={id}
        ref={ref}
        type="radio"
        checked={effectiveChecked ?? false}
        onChange={handleChange}
        disabled={disabled}
        className="peer hidden"
      />
      {renderIcon()}
      <span className={twMerge(labelStyles({ disabled }))}>{label}</span>
    </label>
  )
}

CubeRadioButton.Skeleton = CubeRadioButtonSkeleton
CubeRadioButton.Grid = CubeRadioButtonGrid
