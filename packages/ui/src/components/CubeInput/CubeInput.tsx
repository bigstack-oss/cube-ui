import {
  cloneElement,
  forwardRef,
  useId,
  type InputHTMLAttributes,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeWarningFilled } from '@icons'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
import type { SvgElement } from '../CubeIcon'
import { CubeInputSkeleton } from './CubeInputSkeleton'
import {
  footer,
  input,
  customIcon as customIconStyles,
} from './cubeInputStyles'

export type CubeInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /**
   * @default false
   */
  isLoading?: boolean
  label?: string
  tooltip?: React.ReactNode
  helpMessage?: string
  errorMessage?: string | boolean
  trailingIcon?: SvgElement
} & CubeTestIdProps

export const CubeInput = Object.assign(
  forwardRef<HTMLInputElement, CubeInputProps>((props: CubeInputProps, ref) => {
    const {
      className,
      required = false,
      isLoading = false,
      label,
      tooltip,
      helpMessage,
      errorMessage,
      trailingIcon,
      disabled,
      ...restProps
    } = props

    const defaultId = useId()
    const inputId = restProps.id || defaultId
    const footerId = useId()

    const isError = !!errorMessage && typeof errorMessage === 'string'
    const hasFooter = !!helpMessage || isError
    const hasIcon = !!trailingIcon
    const describedBy =
      [restProps['aria-describedby'], hasFooter ? footerId : undefined]
        .filter(Boolean)
        .join(' ') || undefined

    const renderLabel = () => {
      if (!label && !tooltip) return null

      if (isLoading) return <CubeInputSkeleton type="label" />

      return (
        <div className="primary-body2 flex items-center space-x-1">
          <label
            htmlFor={inputId}
            className="font-semibold text-functional-title"
          >
            {label}
          </label>
          {required && <span className="text-status-negative">*</span>}
          {tooltip}
        </div>
      )
    }

    const renderIcon = () => {
      if (isLoading) return null

      const errorIcon = (() => {
        if (!isError) return null

        return (
          <MonochromeWarningFilled className="icon-md text-status-negative" />
        )
      })()

      const customIcon = (() => {
        if (!hasIcon) return null

        return cloneElement(trailingIcon, {
          className: twMerge(
            trailingIcon.props.className,
            // Overrides icon size, color, and cursor style within the input.
            customIconStyles({ disabled }),
          ),
        })
      })()

      return (
        <span className="absolute right-0 flex h-4 shrink-0 -translate-x-4 items-center justify-center gap-2 overflow-hidden">
          {errorIcon}
          {customIcon}
        </span>
      )
    }

    const renderInput = () => {
      if (isLoading) return <CubeInputSkeleton type="input" />

      return (
        <input
          {...restProps}
          data-testid={restProps['data-testid'] || undefined}
          id={inputId}
          aria-invalid={isError || restProps['aria-invalid']}
          aria-describedby={describedBy}
          ref={ref}
          disabled={disabled}
          className={twMerge(input({ isError, disabled, hasIcon }), className)}
          required={required}
        />
      )
    }

    const renderFooter = () => {
      if (!hasFooter) return null

      if (isLoading) return <CubeInputSkeleton type="footer" />

      return (
        <div
          id={footerId}
          className={twMerge(footer({ isError }))}
          data-testid={testIdOf(
            restProps['data-testid'],
            isError ? 'error' : 'help',
          )}
        >
          {isError ? errorMessage : helpMessage}
        </div>
      )
    }

    return (
      <div className="min-w-[202px] space-y-[6px]">
        {renderLabel()}
        <div className="relative flex items-center">
          {renderInput()}
          {renderIcon()}
        </div>
        {renderFooter()}
      </div>
    )
  }),
  { Skeleton: CubeInputSkeleton },
)

CubeInput.displayName = 'CubeInput'
