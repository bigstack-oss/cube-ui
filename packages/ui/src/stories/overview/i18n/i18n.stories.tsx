import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internals/components/StoryLayout/StoryLayout'
import { CubeButton } from '../../../components/CubeButton'
import { CubeLoadingSpinner } from '../../../components/CubeLoadingSpinner'
import {
  CubeUiLocaleProvider,
  useCubeUiTranslation,
  addCubeUiTranslations,
  type CubeUiLocale,
} from '../../../i18n'
import i18n from '../../../i18n/i18n'
import enUSRaw from '../../../i18n/resources/en-US.json'
import zhTWRaw from '../../../i18n/resources/zh-TW.json'
import { OverrideInput } from './OverrideInput'
import { CaptionText } from '../../../internals/components/CaptionText'

// Snapshot the shipped defaults before i18next can mutate the imported objects
// in-place via addResourceBundle (deep merge modifies the stored reference).
const defaultEnUS = structuredClone(enUSRaw)
const defaultZhTW = structuredClone(zhTWRaw)

const LOADING_KEY = 'component.common.loading'

const meta: Meta = {
  title: 'Overview / Internationalization',
  parameters: {
    controls: { disable: true },
  },
}

export default meta

type Story = StoryObj

const LoadingLabel = () => {
  const { t } = useCubeUiTranslation()
  return (
    <div className="flex items-center gap-x-3">
      <CubeLoadingSpinner variant="cube" />
      <span className="primary-body2 text-functional-title">
        {t(LOADING_KEY)}
      </span>
    </div>
  )
}

// This is exactly what a consuming app does: wrap the part of the tree that
// renders @cube/ui components in CubeUiLocaleProvider, driven by whatever
// locale state the app already tracks (a URL param, a settings toggle, etc).
const BasicUsageDemo = () => {
  const [locale] = useState<CubeUiLocale>('en-US')

  return (
    <CubeUiLocaleProvider locale={locale}>
      <div className="flex flex-col items-start gap-y-4">
        <LoadingLabel />
        <CaptionText>
          The loading text will change according to the locale. Click the Locale
          button on the navigation bar to change the locale.
        </CaptionText>
      </div>
    </CubeUiLocaleProvider>
  )
}

// Override an existing translation key with a live text input.
const OverrideDemo = () => {
  const onOverrideEnUsTextSubmit = (text: string) => {
    addCubeUiTranslations('en-US', {
      [LOADING_KEY]: text,
    })
  }

  const onOverrideZhTwTextSubmit = (text: string) => {
    addCubeUiTranslations('zh-TW', {
      [LOADING_KEY]: text,
    })
  }

  const onClearEnUs = () => {
    addCubeUiTranslations('en-US', {
      [LOADING_KEY]: defaultEnUS[LOADING_KEY],
    })
  }

  const onClearZhTw = () => {
    addCubeUiTranslations('zh-TW', {
      [LOADING_KEY]: defaultZhTW[LOADING_KEY],
    })
  }

  return (
    <CubeUiLocaleProvider locale="en-US">
      <div className="flex flex-col items-start gap-y-4">
        <LoadingLabel />
        <OverrideInput
          language="en-US"
          onSubmit={onOverrideEnUsTextSubmit}
          onClear={onClearEnUs}
        />
        <OverrideInput
          language="zh-TW"
          onSubmit={onOverrideZhTwTextSubmit}
          onClear={onClearZhTw}
        />

        <CaptionText>
          Type above to override the default text live. Clear the field to
          restore it.
        </CaptionText>
      </div>
    </CubeUiLocaleProvider>
  )
}

// Side-by-side comparison of an unregistered locale (falls back to en-US)
// vs a registered one (shows the provided French translation).
//
// Nested CubeUiLocaleProviders cannot be used here because they all call
// i18n.changeLanguage on the same singleton instance — the outermost provider
// (the Storybook decorator) always wins, so fr-FR would never actually be
// active. Instead, translations for each locale are read directly via
// i18n.t(key, { lng }) and stored in React state, which updates on
// register/unregister without touching the global active language.

const getLoadingText = (locale: string) => i18n.t(LOADING_KEY, { lng: locale })

const LocaleLoadingLabel = ({
  locale,
  label,
}: {
  locale: string
  label: string
}) => (
  <div className="flex flex-col gap-y-2">
    <span className="primary-body2 font-semibold">{label}</span>
    <div className="flex items-center gap-x-3">
      <CubeLoadingSpinner variant="cube" />
      <span className="primary-body2 text-functional-title">
        {getLoadingText(locale)}
      </span>
    </div>
  </div>
)

const NewLocaleDemo = () => {
  const [registered, setRegistered] = useState(false)
  // renderKey forces LocaleLoadingLabel to re-evaluate getLoadingText after
  // the i18n bundle changes (getLoadingText is not a hook, so it won't
  // re-run on its own when the bundle updates).
  const [, setRenderKey] = useState(0)

  const register = () => {
    addCubeUiTranslations('fr-FR', { [LOADING_KEY]: 'Chargement' })
    setRegistered(true)
    setRenderKey((k) => k + 1)
  }

  const unregister = () => {
    i18n.removeResourceBundle('fr-FR', 'translation')
    setRegistered(false)
    setRenderKey((k) => k + 1)
  }

  return (
    <div className="flex flex-col items-start gap-y-4">
      <LocaleLoadingLabel
        locale="fr-FR"
        label={`fr-FR ${registered ? '(registered)' : '(not registered → falls back to en-US)'}`}
      />
      <CubeButton
        usage="text-only"
        type={registered ? 'secondary' : 'primary'}
        onClick={registered ? unregister : register}
      >
        {registered ? 'Unregister fr-FR' : 'Register fr-FR'}
      </CubeButton>
      <CaptionText>
        When "fr-FR" is registered, its loading text now shows in French;
        otherwise, every key falls back to en-US. Register it to see the
        difference.
      </CaptionText>
    </div>
  )
}

export const BasicUsage: Story = {
  name: 'Internationalization',
  render: () => (
    <StoryLayout
      title="Internationalization (i18n)"
      desc="How a consuming app wires up @cube/ui's built-in translations."
    >
      <StoryLayout.Section title="1. Wrap your app in CubeUiLocaleProvider">
        <BasicUsageDemo />
      </StoryLayout.Section>
      <StoryLayout.Section title="2. Override an existing translation">
        <OverrideDemo />
      </StoryLayout.Section>
      <StoryLayout.Section title="3. Add a new locale">
        <NewLocaleDemo />
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
