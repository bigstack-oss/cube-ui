import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CubeThemeProvider } from './CubeThemeProvider'
import type { CubeThemeName } from './tokens/types'

afterEach(() => {
  delete document.documentElement.dataset.cubeTheme
})

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<CubeThemeName>('cubeCOS')

  return (
    <CubeThemeProvider theme={theme}>
      <button onClick={() => setTheme('cubeEMP')}>Switch to CubeEMP</button>
    </CubeThemeProvider>
  )
}

describe('CubeThemeProvider', () => {
  it('sets data-cube-theme on the document root and keeps it in sync', async () => {
    const user = userEvent.setup()
    render(<ThemeSwitcher />)

    expect(document.documentElement.dataset.cubeTheme).toBe('cubeCOS')

    await user.click(screen.getByRole('button'))

    expect(document.documentElement.dataset.cubeTheme).toBe('cubeEMP')
  })
})
