import { useId } from 'react'
import type { PropsWithClassName } from '@shared-types/react-types'
import { twMerge } from 'tailwind-merge'
import { label as labelStyles, thumb, track } from './cubeToggleStyles'

export type CubeToggleProps = PropsWithClassName & {
  /**
   * Whether the toggle is on. Always controlled by the caller —
   * pair with `onCheckedChange` to update this value when the user toggles.
   */
  checked: boolean
  /**
   * Called with the next on/off value when the user toggles. Required so the
   * caller can update `checked`.
   */
  onCheckedChange: (checked: boolean) => void
  /**
   * Visible text shown next to the toggle. Also provides the accessible name
   * via `aria-labelledby` / `<label htmlFor>`.
   */
  label?: string
  /**
   * Accessible name when no visible `label` is rendered. Prefer `label` when
   * the name should also appear on screen.
   */
  'aria-label'?: string
  /**
   * When true, the toggle cannot be interacted with.
   * @default false
   */
  disabled?: boolean
}

export const CubeToggle = (props: CubeToggleProps) => {
  const {
    className,
    checked,
    onCheckedChange,
    label,
    disabled = false,
    'aria-label': ariaLabel,
  } = props

  const toggleId = useId()
  const labelId = useId()

  const toggleChecked = () => {
    if (disabled) return
    onCheckedChange(!checked)
  }

  return (
    <div className={twMerge('flex items-center gap-x-[6px]', className)}>
      <button
        id={toggleId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : ariaLabel}
        className={twMerge(track({ checked, disabled }))}
        disabled={disabled}
        onClick={toggleChecked}
      >
        <span className={thumb({ checked })} aria-hidden />
      </button>
      {label && (
        <label
          id={labelId}
          htmlFor={toggleId}
          className={labelStyles({ disabled })}
        >
          {label}
        </label>
      )}
    </div>
  )
}
