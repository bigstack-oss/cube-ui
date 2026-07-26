import { useEffect, type PropsWithChildren } from 'react'
import type { CubeThemeName } from '@cube/theme'

export type CubeThemeProviderProps = PropsWithChildren<{
  /** Which brand palette's CSS variables (see `themes/*.css` in `@cube/theme`) to apply. */
  theme: CubeThemeName
}>

/**
 * Selects which brand palette @bigstack/cube-ui's colors resolve to by
 * setting `data-cube-theme` on the document root.
 *
 * **Optional** — omitting this provider falls back to the `cubeCOS` palette,
 * which is applied at `:root` in `cubeCOS.css` by default.
 */
export const CubeThemeProvider = (props: CubeThemeProviderProps) => {
  const { theme, children } = props

  useEffect(() => {
    document.documentElement.dataset.cubeTheme = theme
  }, [theme])

  return children
}
