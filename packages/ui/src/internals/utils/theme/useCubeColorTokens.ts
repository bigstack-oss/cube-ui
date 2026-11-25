import { useLayoutEffect, useState } from 'react'

const readTokens = <Token extends string>(
  element: Element,
  tokens: readonly Token[],
): Record<Token, string> => {
  const style = getComputedStyle(element)

  return Object.fromEntries(
    tokens.map((token) => [
      token,
      style.getPropertyValue(`--cube-color-${token}`).trim(),
    ]),
  ) as Record<Token, string>
}

const isSame = <Token extends string>(
  a: Record<Token, string>,
  b: Record<Token, string>,
  tokens: readonly Token[],
) => tokens.every((token) => a[token] === b[token])

/**
 * Resolves `--cube-color-<token>` CSS variables to their current values
 * (for example `chart-2` → `#647dff`), for drawing on a canvas, which can't
 * use `var(...)`.
 *
 * Reads from `element` (the document root until it mounts), so a
 * `data-cube-theme` set on any ancestor applies, and re-reads whenever a
 * `data-cube-theme` attribute changes in the document.
 */
export const useCubeColorTokens = <Token extends string>(
  element: Element | null,
  tokens: readonly Token[],
): Record<Token, string> => {
  const [colors, setColors] = useState(() =>
    readTokens(element ?? document.documentElement, tokens),
  )

  // Re-run only when the token names change, not the array identity.
  const tokensKey = tokens.join(',')

  useLayoutEffect(() => {
    const target = element ?? document.documentElement

    const update = () => {
      const next = readTokens(target, tokens)
      setColors((prev) => (isSame(prev, next, tokens) ? prev : next))
    }

    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-cube-theme'],
      subtree: true,
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element, tokensKey])

  return colors
}
