/**
 * Converts a hex color (`#rgb` or `#rrggbb`) to `rgba(r, g, b, alpha)`.
 * Any other value is returned unchanged.
 */
export const hexToRGBA = (hexCode: string, alpha: number) => {
  if (!/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hexCode)) return hexCode

  let hex = hexCode.slice(1)

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
