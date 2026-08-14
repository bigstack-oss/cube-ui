import type { Ref } from 'react'

const normalizeValue = (
  value: string | number | readonly string[] | undefined,
): string => {
  if (typeof value === 'string') return value

  if (typeof value === 'number') return value.toString()

  if (Array.isArray(value)) return value.join('')

  return ''
}

export const calculateValueLength = (
  value: string | number | readonly string[] | undefined,
): number => {
  const normalizedValue = normalizeValue(value)
  return normalizedValue.length
}

/**
 * Assigns `element` to `ref`, supporting both callback refs and ref objects.
 * Used to forward the textarea element to both the caller's `ref` and an
 * internal ref in the same callback-ref slot.
 */
export const assignRefValue = <T>(
  ref: Ref<T> | undefined,
  element: T,
): void => {
  if (!ref) return

  if (typeof ref === 'function') {
    ref(element)
  } else {
    ref.current = element
  }
}
