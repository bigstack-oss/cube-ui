import { act, render, renderHook } from '@testing-library/react'
import { useState } from 'react'
import { useCubeColorTokens } from './useCubeColorTokens'

// jsdom doesn't load the theme CSS, so set the variables inline.
const setTokens = (element: HTMLElement, tokens: Record<string, string>) => {
  Object.entries(tokens).forEach(([name, value]) =>
    element.style.setProperty(`--cube-color-${name}`, value),
  )
}

describe('useCubeColorTokens', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('style')
    document.documentElement.removeAttribute('data-cube-theme')
  })

  it('reads the tokens from the document root', () => {
    setTokens(document.documentElement, {
      'chart-2': '#647dff',
      'functional-text': '#3f4453',
    })

    const { result } = renderHook(() =>
      useCubeColorTokens(null, ['chart-2', 'functional-text']),
    )

    expect(result.current).toEqual({
      'chart-2': '#647dff',
      'functional-text': '#3f4453',
    })
  })

  it('reads from the element, so an ancestor theme applies', () => {
    setTokens(document.documentElement, { 'chart-2': '#647dff' })

    const Probe = () => {
      const [element, setElement] = useState<HTMLElement | null>(null)
      const colors = useCubeColorTokens(element, ['chart-2'])
      return <span ref={setElement}>{colors['chart-2']}</span>
    }

    const { container } = render(
      <div style={{ ['--cube-color-chart-2' as string]: '#fbb03b' }}>
        <Probe />
      </div>,
    )

    expect(container.textContent).toBe('#fbb03b')
  })

  it('re-reads when data-cube-theme changes', async () => {
    setTokens(document.documentElement, { 'chart-2': '#647dff' })
    const { result } = renderHook(() => useCubeColorTokens(null, ['chart-2']))
    expect(result.current['chart-2']).toBe('#647dff')

    await act(async () => {
      setTokens(document.documentElement, { 'chart-2': '#aa7dff' })
      document.documentElement.dataset.cubeTheme = 'cubeEMP'
      // MutationObserver callbacks run as microtasks.
      await Promise.resolve()
    })

    expect(result.current['chart-2']).toBe('#aa7dff')
  })

  it('returns an empty string for an unknown token', () => {
    const { result } = renderHook(() =>
      useCubeColorTokens(null, ['does-not-exist']),
    )

    expect(result.current['does-not-exist']).toBe('')
  })
})
