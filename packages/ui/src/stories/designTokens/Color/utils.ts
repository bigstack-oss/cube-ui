import { cubePreset } from '@cube/theme'

const { colors } = cubePreset.theme.extend

/**
 * Retrieve color value from cubeTheme with the provided bg class name.
 * For example, from `bg-primary-500` to `#4C68F9`.
 */
export const resolveThemeColor = (bgClassName: string): string | undefined => {
  const isPureColor =
    !bgClassName.includes('gradient') && bgClassName.startsWith('bg-')
  if (!isPureColor) {
    return undefined
  }

  // - 'bg-primary-500' -> ['primary', '500']
  // - 'bg-functional-hover-grey-darker' -> ['functional', 'hover', 'grey', 'darker']
  const [categoryKey, ...propertyKeyParts] = bgClassName
    .replace('bg-', '')
    .split('-')

  // ['hover', 'grey', 'darker'] -> 'hover-grey-darker
  const propertyKey = propertyKeyParts.join('-')

  if (!categoryKey || !propertyKey) {
    console.warn(`Invalid bgClassName: ${bgClassName}`)
    return undefined
  }

  const category = colors[categoryKey as keyof typeof colors]
  const colorValue = category[propertyKey as keyof typeof category]

  if (!colorValue) {
    console.warn(`Invalid bgClassName: ${bgClassName}`)
    return undefined
  }

  return resolveCssVar(String(colorValue))
}

/**
 * Resolve a CSS custom property reference to its live computed value,
 * normalised to uppercase for consistent display.
 * If the value is not a `var(...)` string it is returned unchanged.
 * For example, `var(--cube-color-primary-500)` → `#4C68F9`.
 */
export const resolveCssVar = (value: string): string => {
  if (!value.startsWith('var(')) return value.toUpperCase()
  const varName = value.slice(4, -1).trim()
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim()
    .toUpperCase()
}

const REQUIRED_HEX_REGEX = /^#[a-fA-F\d]{6}$/

/**
 * Convert a hex string to a number array.
 * For example, from `#4C68F9` to `[76, 104, 249]`.
 */
export const hexToRgb = (
  hex: string,
): [r: number, g: number, b: number] | undefined => {
  if (!hex.startsWith('#') || !REQUIRED_HEX_REGEX.test(hex)) {
    console.warn(
      `Invalid hex value: ${hex}. Hex value must match ${REQUIRED_HEX_REGEX.source}`,
    )
    return undefined
  }

  // Remove the leading '#'.
  hex = hex.substring(1)

  // Example: '#1AF0C3' -> [0x1A, 0xF0, 0xC3]
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return [r, g, b]
}
