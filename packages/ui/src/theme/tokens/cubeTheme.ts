import type { CustomThemeConfig } from 'tailwindcss/types/config'
import defaultTheme from 'tailwindcss/defaultTheme'
import type { FlattenedObjectKeys } from './utils/genericTypes'
import { cubeAnimationKeyframes } from './utils/animationKeyframes'
import { cubeAnimations } from './utils/animations'

export const cubeTheme = {
  screens: {
    'height-sm': {
      raw: '(min-height: 768px)',
    },
    'height-md': {
      raw: '(min-height: 864px)',
    },
    'height-lg': {
      raw: '(min-height: 960px)',
    },
    'height-xl': {
      raw: '(min-height: 1080px)',
    },
  },
  colors: {
    // Every color below resolves through a CSS custom property (defined in
    // `themes/*.css`) so a consuming product can swap colors at runtime
    // without a rebuild. Only `cubeCOS` sets all of them; other
    // themes only need to override the tokens that actually differ (e.g.
    // primary/secondary/cosmos) - anything unset falls back to `cubeCOS`'s
    // value via normal CSS cascade.
    primary: {
      DEFAULT: 'var(--cube-color-primary-DEFAULT)',
      0: 'var(--cube-color-primary-0)',
      50: 'var(--cube-color-primary-50)',
      100: 'var(--cube-color-primary-100)',
      150: 'var(--cube-color-primary-150)',
      200: 'var(--cube-color-primary-200)',
      300: 'var(--cube-color-primary-300)',
      400: 'var(--cube-color-primary-400)',
      500: 'var(--cube-color-primary-500)',
      600: 'var(--cube-color-primary-600)',
      700: 'var(--cube-color-primary-700)',
      800: 'var(--cube-color-primary-800)',
      850: 'var(--cube-color-primary-850)',
    },
    secondary: {
      DEFAULT: 'var(--cube-color-secondary-DEFAULT)',
      0: 'var(--cube-color-secondary-0)',
      50: 'var(--cube-color-secondary-50)',
      100: 'var(--cube-color-secondary-100)',
      150: 'var(--cube-color-secondary-150)',
      200: 'var(--cube-color-secondary-200)',
      300: 'var(--cube-color-secondary-300)',
      400: 'var(--cube-color-secondary-400)',
      500: 'var(--cube-color-secondary-500)',
      600: 'var(--cube-color-secondary-600)',
      700: 'var(--cube-color-secondary-700)',
      800: 'var(--cube-color-secondary-800)',
      850: 'var(--cube-color-secondary-850)',
    },
    dark: {
      0: 'var(--cube-color-dark-0)',
      50: 'var(--cube-color-dark-50)',
      100: 'var(--cube-color-dark-100)',
      150: 'var(--cube-color-dark-150)',
      200: 'var(--cube-color-dark-200)',
      300: 'var(--cube-color-dark-300)',
      400: 'var(--cube-color-dark-400)',
      500: 'var(--cube-color-dark-500)',
      600: 'var(--cube-color-dark-600)',
      700: 'var(--cube-color-dark-700)',
      800: 'var(--cube-color-dark-800)',
      850: 'var(--cube-color-dark-850)',
    },
    grey: {
      0: 'var(--cube-color-grey-0)',
      50: 'var(--cube-color-grey-50)',
      100: 'var(--cube-color-grey-100)',
      150: 'var(--cube-color-grey-150)',
      200: 'var(--cube-color-grey-200)',
      300: 'var(--cube-color-grey-300)',
      400: 'var(--cube-color-grey-400)',
      500: 'var(--cube-color-grey-500)',
      600: 'var(--cube-color-grey-600)',
      700: 'var(--cube-color-grey-700)',
      800: 'var(--cube-color-grey-800)',
      850: 'var(--cube-color-grey-850)',
    },
    blue: {
      0: 'var(--cube-color-blue-0)',
      50: 'var(--cube-color-blue-50)',
      100: 'var(--cube-color-blue-100)',
      150: 'var(--cube-color-blue-150)',
      200: 'var(--cube-color-blue-200)',
      300: 'var(--cube-color-blue-300)',
      400: 'var(--cube-color-blue-400)',
      500: 'var(--cube-color-blue-500)',
      600: 'var(--cube-color-blue-600)',
      700: 'var(--cube-color-blue-700)',
      800: 'var(--cube-color-blue-800)',
      850: 'var(--cube-color-blue-850)',
    },
    green: {
      0: 'var(--cube-color-green-0)',
      50: 'var(--cube-color-green-50)',
      100: 'var(--cube-color-green-100)',
      150: 'var(--cube-color-green-150)',
      200: 'var(--cube-color-green-200)',
      300: 'var(--cube-color-green-300)',
      400: 'var(--cube-color-green-400)',
      500: 'var(--cube-color-green-500)',
      600: 'var(--cube-color-green-600)',
      700: 'var(--cube-color-green-700)',
      800: 'var(--cube-color-green-800)',
      850: 'var(--cube-color-green-850)',
    },
    yellow: {
      0: 'var(--cube-color-yellow-0)',
      50: 'var(--cube-color-yellow-50)',
      100: 'var(--cube-color-yellow-100)',
      150: 'var(--cube-color-yellow-150)',
      200: 'var(--cube-color-yellow-200)',
      300: 'var(--cube-color-yellow-300)',
      400: 'var(--cube-color-yellow-400)',
      500: 'var(--cube-color-yellow-500)',
      600: 'var(--cube-color-yellow-600)',
      700: 'var(--cube-color-yellow-700)',
      800: 'var(--cube-color-yellow-800)',
      850: 'var(--cube-color-yellow-850)',
    },
    red: {
      0: 'var(--cube-color-red-0)',
      50: 'var(--cube-color-red-50)',
      100: 'var(--cube-color-red-100)',
      150: 'var(--cube-color-red-150)',
      200: 'var(--cube-color-red-200)',
      300: 'var(--cube-color-red-300)',
      400: 'var(--cube-color-red-400)',
      500: 'var(--cube-color-red-500)',
      600: 'var(--cube-color-red-600)',
      700: 'var(--cube-color-red-700)',
      800: 'var(--cube-color-red-800)',
      850: 'var(--cube-color-red-850)',
    },
    cosmos: {
      primary: 'var(--cube-color-primary-DEFAULT)',
      secondary: 'var(--cube-color-secondary-DEFAULT)',
    },
    scene: {
      gradient:
        'linear-gradient(90deg, var(--cube-color-scene-gradient-1) 0%, var(--cube-color-scene-gradient-2) 30%, var(--cube-color-scene-gradient-3) 65%, var(--cube-color-scene-gradient-4) 100%)',
      background: 'var(--cube-color-scene-background)',
    },
    functional: {
      title: 'var(--cube-color-functional-title)',
      text: 'var(--cube-color-functional-text)',
      'text-light': 'var(--cube-color-functional-text-light)',
      'hover-primary': 'var(--cube-color-functional-hover-primary)',
      'hover-secondary': 'var(--cube-color-functional-hover-secondary)',
      'hover-grey': 'var(--cube-color-functional-hover-grey)',
      'hover-grey-darker': 'var(--cube-color-functional-hover-grey-darker)',
      'border-divider': 'var(--cube-color-functional-border-divider)',
      'border-darker': 'var(--cube-color-functional-border-darker)',
      disable: 'var(--cube-color-functional-disable)',
      'disable-text': 'var(--cube-color-functional-disable-text)',
      'disable-light': 'var(--cube-color-functional-disable-light)',
      skeleton: 'var(--cube-color-functional-skeleton)',
    },
    status: {
      positive: 'var(--cube-color-status-positive)',
      'positive-text': 'var(--cube-color-status-positive-text)',
      negative: 'var(--cube-color-status-negative)',
      warning: 'var(--cube-color-status-warning)',
      paused: 'var(--cube-color-status-paused)',
      neutral: 'var(--cube-color-status-neutral)',
      'over-limit': 'var(--cube-color-status-over-limit)',
    },
    chart: {
      1: 'var(--cube-color-chart-1)',
      2: 'var(--cube-color-chart-2)',
      3: 'var(--cube-color-chart-3)',
      4: 'var(--cube-color-chart-4)',
      5: 'var(--cube-color-chart-5)',
      6: 'var(--cube-color-chart-6)',
      7: 'var(--cube-color-chart-7)',
      8: 'var(--cube-color-chart-8)',
      9: 'var(--cube-color-chart-9)',
      10: 'var(--cube-color-chart-10)',
      11: 'var(--cube-color-chart-11)',
      12: 'var(--cube-color-chart-12)',
      13: 'var(--cube-color-chart-13)',
      14: 'var(--cube-color-chart-14)',
      15: 'var(--cube-color-chart-15)',
      16: 'var(--cube-color-chart-16)',
      17: 'var(--cube-color-chart-17)',
      18: 'var(--cube-color-chart-18)',
      19: 'var(--cube-color-chart-19)',
      20: 'var(--cube-color-chart-20)',
      21: 'var(--cube-color-chart-21)',
      22: 'var(--cube-color-chart-22)',
      23: 'var(--cube-color-chart-23)',
      24: 'var(--cube-color-chart-24)',
      25: 'var(--cube-color-chart-25)',
      26: 'var(--cube-color-chart-26)',
      27: 'var(--cube-color-chart-27)',
      28: 'var(--cube-color-chart-28)',
      29: 'var(--cube-color-chart-29)',
      30: 'var(--cube-color-chart-30)',
      31: 'var(--cube-color-chart-31)',
      32: 'var(--cube-color-chart-32)',
    },
  },
  fontFamily: {
    // Fallback to Noto Sans TC for Traditional Chinese.
    urbanist: ['Urbanist', 'Noto Sans TC', ...defaultTheme.fontFamily.sans],
    inter: ['Inter', 'Noto Sans TC', ...defaultTheme.fontFamily.sans],
    ['noto-sans-tc']: ['Noto Sans TC', ...defaultTheme.fontFamily.sans],
    sans: ['Inter', 'Noto Sans TC', ...defaultTheme.fontFamily.sans],
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    semibold: '600',
  },
  keyframes: {
    ...cubeAnimationKeyframes,
  },
  animation: {
    ...cubeAnimations,
  },
} satisfies Partial<CustomThemeConfig>

export type BorderColorClass = `border-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type BackgroundColorClass = `bg-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type FillColorClass = `fill-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type StrokeColorClass = `stroke-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`

export type TextColorClass = `text-${FlattenedObjectKeys<
  typeof cubeTheme.colors,
  // Separator
  '-',
  // Excluded keys
  'DEFAULT'
>}`
