import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
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
