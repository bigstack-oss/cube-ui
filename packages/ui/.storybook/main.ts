import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  // Copies the logo that `YourTheme.ts` references (`/assets/logo.svg`) into
  // the static build; only the dev server serves it without this.
  staticDirs: [{ from: '../assets', to: '/assets' }],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        tsconfigPaths: true,
      },
      plugins: [svgr()],
    })
  },
}

export default config
