import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    svgr({
      svgrOptions: {
        ref: true,
        titleProp: true,
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**'],
      exclude: [
        'src/**/*.stories.tsx',
        'src/**/*.d.ts',
        'src/icons/**',
        'src/stories/**',
        'src/internals/**',
        // Design tokens / Tailwind preset / plugin definitions - declarative
        // config, not component logic. `CubeThemeProvider` itself (the
        // actual testable behavior in `src/theme`) stays covered.
        'src/theme/tokens/**',
      ],
    },
  },
})
