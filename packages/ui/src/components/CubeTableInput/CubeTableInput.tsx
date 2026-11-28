import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import { MonochromeWarningFilled } from '@icons'
import type { CubeTestIdProps } from '@shared-types/test-id-types'
import { testIdOf } from '@utils/testId'
import { CubeTooltip } from '../CubeTooltip/CubeTooltip'
import { CubeTableInputSkeleton } from './CubeTableInputSkeleton'
import { tableInput } from './cubeTableInputStyles'

export type CubeTableInputProps = InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean
  errorMessage?: string | boolean
  /**
   * @default false
   */
  hideErrorIcon?: boolean
} & CubeTestIdProps

export const CubeTableInput = Object.assign(
  forwardRef<HTMLInputElement, CubeTableInputProps>(
    (props: CubeTableInputProps, ref) => {
      const {
        className,
        isLoading = false,
        errorMessage,
        hideErrorIcon = false,
        disabled,
        'data-testid': testIdProp,
        ...restProps
      } = props

      const testId = testIdProp || undefined

      const defaultId = useId()
      const inputId = restProps.id || defaultId

      const showErrorMessage = !!errorMessage

      const renderErrorIcon = () => {
        return (
          <div className="flex size-4 shrink-0 items-center justify-center">
            {showErrorMessage && (
              <CubeTooltip
                hoverContent={{
                  message: errorMessage?.toString(),
                }}
                data-testid={testIdOf(testId, 'tooltip')}
              >
                <MonochromeWarningFilled
                  className="icon-md text-status-negative"
                  data-testid={testIdOf(testId, 'error')}
                />
              </CubeTooltip>
            )}
          </div>
        )
      }

      return (
        <div className="flex items-center gap-x-2">
          {isLoading ? (
            <CubeTableInputSkeleton />
          ) : (
            <input
              {...restProps}
              id={inputId}
              ref={ref}
              data-testid={testId}
              disabled={disabled}
              className={twMerge(
                tableInput({ isError: showErrorMessage, disabled }),
                className,
              )}
            />
          )}
          {!hideErrorIcon && renderErrorIcon()}
        </div>
      )
    },
  ),
  { Skeleton: CubeTableInputSkeleton },
)

CubeTableInput.displayName = 'CubeTableInput'
