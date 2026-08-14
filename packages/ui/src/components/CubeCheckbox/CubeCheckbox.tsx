import { useState, type ChangeEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  MonochromeCheckbox as CheckboxUnselected,
  MonochromeCheckboxCheckedFilled as CheckboxSelected,
  MonochromeCheckboxUndeterminateFilled as CheckboxIndeterminate,
} from '@icons'
import type { CubeCheckboxProps } from './cubeCheckboxTypes'
import { container, iconWrap, label as labelStyles } from './cubeCheckboxStyles'
import { CubeCheckboxSkeleton } from './CubeCheckboxSkeleton'
import { CubeCheckboxGrid } from './CubeCheckboxGrid'

export const CubeCheckbox = (props: CubeCheckboxProps) => {
  const {
    containerClassName,
    color = 'primary',
    label,
    labelSize = 'md',
    labelClassName,
    id,
    defaultChecked = false,
    checked: controlledChecked,
    onChange: onControlledCheckedChange,
    disabled,
    isLoading = false,
    ref,
    ...restProps
  } = props

  const [uncontrolledChecked, setUncontrolledChecked] = useState<
    boolean | null
  >(defaultChecked)

  const isControlled = controlledChecked !== undefined

  const effectiveChecked = isControlled
    ? controlledChecked
    : uncontrolledChecked

  const isIndeterminate = effectiveChecked === null

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setUncontrolledChecked(event.target.checked)
    }
    onControlledCheckedChange?.(event)
  }

  const renderIcon = () => {
    const IconComponent = (() => {
      if (isIndeterminate) return CheckboxIndeterminate
      return effectiveChecked ? CheckboxSelected : CheckboxUnselected
    })()

    return (
      <div
        className={twMerge(
          iconWrap({
            color,
            isSelected: effectiveChecked || isIndeterminate,
            disabled,
          }),
        )}
      >
        <IconComponent className="icon-md" />
      </div>
    )
  }

  if (isLoading) return <CubeCheckboxSkeleton />

  return (
    <label
      htmlFor={id}
      className={twMerge(
        container({ labelSize, disabled }),
        containerClassName,
      )}
    >
      <input
        {...restProps}
        id={id}
        ref={ref}
        type="checkbox"
        checked={effectiveChecked ?? false}
        onChange={handleChange}
        disabled={disabled}
        className="peer hidden"
      />
      {renderIcon()}
      {label && (
        <span
          className={twMerge(labelStyles({ color, disabled }), labelClassName)}
        >
          {label}
        </span>
      )}
    </label>
  )
}

CubeCheckbox.Skeleton = CubeCheckboxSkeleton
CubeCheckbox.Grid = CubeCheckboxGrid
