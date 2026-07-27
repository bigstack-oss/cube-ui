import { cubePreset } from './src/theme/tokens/cubePreset'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  presets: [cubePreset],
  safelist: [
    {
      // We added this pattern because there's a page (story) that lists all
      // the color tokens, and the classes for those colors are dynamically
      // generated at runtime, so it's safe to include them in the CSS output.
      pattern: /(bg|text)-(\w+)-(\d+)/,
    },
  ],
}

export default config
