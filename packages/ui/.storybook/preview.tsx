import React from 'react'
import type { Preview } from '@storybook/react'
import { CubeUiLocaleProvider, type CubeUiLocale } from '../src/i18n'
import { CubeThemeProvider, type CubeThemeName } from '../src/theme'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/urbanist/400.css'
import '@fontsource/urbanist/500.css'
import '@fontsource/urbanist/600.css'
import '@fontsource/urbanist/800.css'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/500.css'
import '@fontsource/noto-sans-tc/600.css'
import '@fontsource/noto-sans-tc/800.css'
import '../src/tailwind.css'

const preview: Preview = {
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Preview components in a @cube/ui locale',
      toolbar: {
        icon: 'globe',
        title: 'Locale',
        items: [
          { value: 'en-US', title: 'English' },
          { value: 'zh-TW', title: '繁體中文' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      name: 'Theme',
      description: 'Preview components in a @cube/ui product palette',
      toolbar: {
        icon: 'paintbrush',
        title: 'Theme',
        items: [
          { value: 'cubeCOS', title: 'CubeCOS' },
          { value: 'cubeEMP', title: 'CubeEMP' },
        ],
      },
    },
  },
  initialGlobals: {
    locale: 'en-US',
    theme: 'cubeCOS',
  },
  decorators: [
    (Story, context) => {
      const locale = context.globals.locale as CubeUiLocale
      const theme = context.globals.theme as CubeThemeName
      return (
        <CubeThemeProvider theme={theme}>
          <CubeUiLocaleProvider locale={locale}>
            <Story />
          </CubeUiLocaleProvider>
        </CubeThemeProvider>
      )
    },
  ],
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: [
          'Overview',
          'Design Tokens',
          ['Color', 'Typography', 'Icon'],
          'Atoms',
          'Molecules',
          'Organisms',
        ],
      },
    },
    parameters: {
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/i,
        },
      },
    },
  },
}

export default preview
