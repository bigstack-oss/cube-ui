import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CubeThemeProvider } from './CubeThemeProvider'
import type { CubeThemeName } from './tokens/types'

afterEach(() => {
  delete document.documentElement.dataset.cubeTheme
})

const ThemeSwitcher = (props: { to: CubeThemeName }) => {
  const [theme, setTheme] = useState<CubeThemeName>('cubeCOS')

  return (
    <CubeThemeProvider theme={theme}>
      <button onClick={() => setTheme(props.to)}>Switch theme</button>
    </CubeThemeProvider>
  )
}

describe('CubeThemeProvider', () => {
  it.each<CubeThemeName>(['cubeEMP', 'cubeAIR'])(
    'sets data-cube-theme on the document root and keeps it in sync (%s)',
    async (to) => {
      const user = userEvent.setup()
      render(<ThemeSwitcher to={to} />)

      expect(document.documentElement.dataset.cubeTheme).toBe('cubeCOS')

      await user.click(screen.getByRole('button'))

      expect(document.documentElement.dataset.cubeTheme).toBe(to)
    },
  )
})
