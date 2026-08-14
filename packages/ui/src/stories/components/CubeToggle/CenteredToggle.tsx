import { useState } from 'react'
import { CubeToggle, type CubeToggleProps } from '@components/CubeToggle'

type CenteredCubeToggleProps = Omit<
  CubeToggleProps,
  'checked' | 'onCheckedChange'
> & {
  /** Seed value for the controlled gallery demo. */
  initialChecked?: boolean
  /** When true, show an On/Off label driven by state. */
  showLabel?: boolean
}

export const CenteredCubeToggle = (props: CenteredCubeToggleProps) => {
  const {
    initialChecked = false,
    showLabel = false,
    'aria-label': ariaLabel,
    ...toggleProps
  } = props

  const [checked, setChecked] = useState(initialChecked)

  return (
    <div className="flex w-full justify-center">
      <CubeToggle
        {...toggleProps}
        checked={checked}
        label={showLabel ? (checked ? 'On' : 'Off') : undefined}
        aria-label={showLabel ? undefined : (ariaLabel ?? 'Toggle')}
        onCheckedChange={setChecked}
      />
    </div>
  )
}
