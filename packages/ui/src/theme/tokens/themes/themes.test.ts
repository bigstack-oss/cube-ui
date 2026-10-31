import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { CubeThemeName } from '../types'

// jsdom replaces the global `URL`, which `readFileSync` rejects, so resolve a
// plain path instead.
const themesDir = dirname(fileURLToPath(import.meta.url))

const readFile = (name: string) => readFileSync(join(themesDir, name), 'utf8')

const readTheme = (theme: CubeThemeName) => readFile(`${theme}.css`)

// The custom properties a theme file declares, with their values.
const tokensOf = (css: string) =>
  new Map(
    [...css.matchAll(/--(cube-color-[\w-]+):\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2]!.trim(),
    ]),
  )

const cosTokens = tokensOf(readTheme('cubeCOS'))

describe('theme palettes', () => {
  it.each<CubeThemeName>(['cubeEMP', 'cubeAIR'])(
    '%s only overrides tokens that CubeCOS defines',
    (theme) => {
      const tokens = [...tokensOf(readTheme(theme)).keys()]
      const unknown = tokens.filter((token) => !cosTokens.has(token))

      expect(tokens.length).toBeGreaterThan(0)
      expect(unknown).toEqual([])
    },
  )

  it.each<CubeThemeName>(['cubeCOS', 'cubeEMP', 'cubeAIR'])(
    '%s sets its own scene gradient',
    (theme) => {
      expect(
        tokensOf(readTheme(theme)).get('cube-color-scene-gradient'),
      ).toMatch(/^linear-gradient\(/)
    },
  )

  it('is applied for every theme name', () => {
    expect(readFile('index.css')).toContain("@import './cubeAIR.css';")
    expect(readTheme('cubeAIR')).toContain("[data-cube-theme='cubeAIR']")
  })
})
