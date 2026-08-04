import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { CaptionText } from '@internals/components/CaptionText'
import { CubeButton } from '@components/CubeButton'
import { CubeLoadingSpinner } from '@components/CubeLoadingSpinner'
import { CubeUiLocaleProvider } from '@i18n/CubeUiLocaleProvider'
import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import { addCubeUiTranslations } from '@i18n/addCubeUiTranslations'
import type { CubeUiLocale } from '@i18n/types'
import i18n from '@i18n/i18n'
import enUSRaw from '@i18n/resources/en-US.json'
import zhTWRaw from '@i18n/resources/zh-TW.json'
import { SubHeading } from '@internals/components/SubHeading'
import { OverrideInput } from './OverrideInput'
import { InlineCode } from './InlineCode'
import { CodeBlock } from './CodeBlock'
import { DemoFrame } from './DemoFrame'

// Snapshot the shipped defaults before i18next can mutate the imported objects
// in-place via addResourceBundle (deep merge modifies the stored reference).
const defaultEnUS = structuredClone(enUSRaw)
const defaultZhTW = structuredClone(zhTWRaw)

const LOADING_KEY = 'component.common.loading'

const meta: Meta = {
  title: 'Overview/Internationalization',
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
    options: {
      rightPanelWidth: 0,
      bottomPanelHeight: 0,
    },
  },
}

export default meta

type Story = StoryObj

// TODO: swap in the real Google Sheet URL once it's shared.
const TRANSLATION_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/REPLACE_WITH_SHEET_ID'

// ---- Live demo pieces. Each one mirrors the code sample directly above it,
// so contributors can see the exact API call and its visual result together. ----

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
// renders @bigstack-oss/cube-ui components in CubeUiLocaleProvider, driven by whatever
// locale state the app already tracks (a URL param, a settings toggle, etc).
const BasicUsageDemo = () => {
  const [locale] = useState<CubeUiLocale>('en-US')

  return (
    <CubeUiLocaleProvider locale={locale}>
      <LoadingLabel />
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
        Type above to override the default text live. Clear the field to restore
        it.
      </CaptionText>
    </div>
  )
}

// Side-by-side comparison of an unregistered locale (falls back to en-US)
// vs a registered one (shows the provided French translation).
//
// A local CubeUiLocaleProvider isn't used here because nested providers all
// call i18n.changeLanguage on the same singleton instance and the outermost
// one (the Storybook toolbar decorator) always wins. Instead, translations
// for fr-FR are read directly via i18n.t(key, { lng }) and stored in React
// state, which updates on register/unregister without touching the global
// active language.
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

export const Docs: Story = {
  name: 'Setup Guide',
  render: () => (
    <StoryLayout
      title="Internationalization (i18n)"
      desc="How to wire @bigstack-oss/cube-ui's built-in translations into your app - with the code for each step next to its live, visual result. Switch the Locale control in the toolbar above to see every demo below respond."
    >
      <StoryLayout.Section title="Why this exists">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Some @bigstack-oss/cube-ui components render their own text - loading
            labels, empty states, and similar strings - in English by default.
            @bigstack-oss/cube-ui keeps its own <InlineCode>i18next</InlineCode>{' '}
            instance, separate from whatever i18n setup your app uses (or
            doesn&apos;t use at all), so these strings can be localized
            independently.
          </CaptionText>
          <CaptionText>
            You only need this guide if your app targets a non-English locale,
            or if you want to customize the wording of @bigstack-oss/cube-ui&apos;s
            built-in strings.
          </CaptionText>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="1. Installation">
        <CaptionText>
          Nothing to install. <InlineCode>i18next</InlineCode> and{' '}
          <InlineCode>react-i18next</InlineCode> are regular dependencies of{' '}
          <InlineCode>@bigstack-oss/cube-ui</InlineCode> and ship bundled with it -
          your app does not need to add them itself, and
          @bigstack-oss/cube-ui&apos;s instance will not collide with your
          app&apos;s own i18next setup if it has one.
        </CaptionText>
      </StoryLayout.Section>

      <StoryLayout.Section title="2. Wrap your app in CubeUiLocaleProvider">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Wrap the part of your tree that renders @bigstack-oss/cube-ui components
            in <InlineCode>CubeUiLocaleProvider</InlineCode>, passing whatever
            locale state your app already tracks (a URL param, a user setting,
            the browser locale, etc). This is the only required step.
          </CaptionText>
          <CodeBlock>{`import { CubeUiLocaleProvider } from '@bigstack-oss/cube-ui'

function App() {
  const locale = useAppLocale() // e.g. 'en-US' | 'zh-TW'

  return (
    <CubeUiLocaleProvider locale={locale}>
      <YourApp />
    </CubeUiLocaleProvider>
  )
}`}</CodeBlock>
          <DemoFrame>
            <BasicUsageDemo />
          </DemoFrame>
          <CaptionText>
            @bigstack-oss/cube-ui ships translations for{' '}
            <InlineCode>en-US</InlineCode> (the default) and{' '}
            <InlineCode>zh-TW</InlineCode>. Any other locale falls back to{' '}
            <InlineCode>en-US</InlineCode> until you register it - see step 4.
            Switch the Locale control in the toolbar above to see this
            demo&apos;s text change.
          </CaptionText>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="3. (Optional) Reuse a @bigstack-oss/cube-ui string in your own components">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            If a custom component of yours needs one of @bigstack-oss/cube-ui&apos;s
            own translated strings, use{' '}
            <InlineCode>useCubeUiTranslation</InlineCode> instead of
            react-i18next&apos;s <InlineCode>useTranslation</InlineCode>.
            It&apos;s the same hook, pinned to @bigstack-oss/cube-ui&apos;s own
            i18next instance so it stays in sync regardless of your app&apos;s
            i18n setup.
          </CaptionText>
          <CodeBlock>{`import { useCubeUiTranslation } from '@bigstack-oss/cube-ui'

function MyLoadingLabel() {
  const { t } = useCubeUiTranslation()
  return <span>{t('component.common.loading')}</span>
}`}</CodeBlock>
          <DemoFrame>
            <LoadingLabel />
          </DemoFrame>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="4. (Optional) Override a string or add a new locale">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Use <InlineCode>addCubeUiTranslations</InlineCode> to override
            specific shipped strings, or to register a locale @bigstack-oss/cube-ui
            doesn&apos;t ship by default. Keys are checked against
            @bigstack-oss/cube-ui&apos;s real key set at compile time - an unknown
            or misspelled key is a TypeScript error - and any key you omit for a
            new locale falls back to the English text. Call this once during app
            startup, before your components render.
          </CaptionText>

          <SubHeading>Override a shipped string</SubHeading>
          <CodeBlock>{`import { addCubeUiTranslations } from '@bigstack-oss/cube-ui'

addCubeUiTranslations('en-US', {
  'component.common.loading': 'Please wait…',
})`}</CodeBlock>
          <DemoFrame>
            <OverrideDemo />
          </DemoFrame>

          <SubHeading>
            Add a locale @bigstack-oss/cube-ui doesn&apos;t ship
          </SubHeading>
          <CodeBlock>{`import { addCubeUiTranslations } from '@bigstack-oss/cube-ui'

addCubeUiTranslations('fr-FR', {
  'component.common.loading': 'Chargement',
  'component.common.noData': 'Aucune donnée',
})`}</CodeBlock>
          <DemoFrame>
            <NewLocaleDemo />
          </DemoFrame>

          <CaptionText>
            <strong>Mutation warning:</strong> i18next deep-merges these
            overrides into its resource store in place, which mutates the
            imported JSON module backing @bigstack-oss/cube-ui&apos;s defaults. If
            you need to restore the original text later (in tests, for example),
            take a <InlineCode>structuredClone</InlineCode> snapshot of the
            defaults before calling{' '}
            <InlineCode>addCubeUiTranslations</InlineCode>.
          </CaptionText>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Reference: translation source of truth">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Every key @bigstack-oss/cube-ui ships and its translation in each locale
            is managed centrally in this{' '}
            <a
              href={TRANSLATION_SHEET_URL}
              target="_blank"
              rel="noreferrer"
              className="text-functional-title underline"
            >
              Google Sheet
            </a>
            , not in the repo directly.
          </CaptionText>
          <CaptionText>
            <strong>Workflow:</strong> add or edit translations in the sheet
            first, then run <InlineCode>pnpm i18n:sync</InlineCode> to pull the
            sheet&apos;s contents down into the local{' '}
            <InlineCode>src/i18n/resources/*.json</InlineCode> files. Don&apos;t
            hand-edit those JSON files directly - the next sync will overwrite
            them.
          </CaptionText>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
