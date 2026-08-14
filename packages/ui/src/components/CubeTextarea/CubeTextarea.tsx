import {
  useEffect,
  useState,
  type ChangeEvent,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { CubeTextareaSkeleton } from './CubeTextareaSkeleton'
import { assignRefValue, calculateValueLength } from './cubeTextareaUtils'
import { useVisibleRowsCount } from './useVisibleRowsCount'
import { textarea } from './cubeTextareaStyles'

export type CubeTextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string
  maxLength: number
  /**
   * @default false
   */
  isLoading?: boolean
  errorMessage?: string
}

export const CubeTextarea = (props: CubeTextareaProps) => {
  const {
    id: textareaId,
    ref,
    className,
    disabled,
    value: valueProps,
    onChange,
    label,
    maxLength,
    isLoading,
    errorMessage,
    ...restProps
  } = props

  const [charCount, setCharCount] = useState(() =>
    calculateValueLength(valueProps),
  )

  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    setCharCount(calculateValueLength(valueProps))
  }, [valueProps])

  const { textareaRef: localRef, visibleRowsCount } = useVisibleRowsCount()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (newValue.length <= maxLength) {
      setCharCount(newValue.length)
      onChange?.(e)
    }
  }

  if (isLoading) {
    return <CubeTextareaSkeleton />
  }

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex items-center justify-between">
        <label
          htmlFor={textareaId}
          className="primary-body2 font-semibold text-functional-text"
        >
          {label}
        </label>
        <div className="secondary-body4 text-functional-text-light">
          {charCount.toLocaleString('en-US')}/
          {maxLength.toLocaleString('en-US')}
        </div>
      </div>
      <textarea
        {...restProps}
        id={textareaId}
        disabled={disabled}
        ref={(element) => {
          /**
           * Assign the textarea element to the external `ref` passed to `CubeTextarea` (if any),
           * allowing parent components to access the textarea's reference.
           */
          assignRefValue(ref, element)
          /**
           * Assign the textarea element to the internal `localRef`,
           * which is used for local operations such as calculating visible rows.
           */
          assignRefValue(localRef, element)
        }}
        value={valueProps}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={twMerge(
          textarea({ isError: !!errorMessage, disabled }),
          className,
        )}
        style={
          isFocused
            ? undefined
            : {
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: visibleRowsCount,
              }
        }
      />
      {errorMessage && (
        <p className="primary-body4 text-status-negative">{errorMessage}</p>
      )}
    </div>
  )
}

CubeTextarea.Skeleton = CubeTextareaSkeleton
