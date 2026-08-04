# cube-ui

## File Structure

```
packages/
│
└── ui/                             ← publishes @bigstack-oss/cube-ui
    ├── src/
    │   ├── index.ts                ← 📦 public API: controls what gets packed and published
    │   │
    │   ├── components/             ← UI components (one folder per component)
    │   │   └── CubeButton/
    │   │       ├── CubeButton.tsx
    │   │       ├── CubeButton.test.tsx   ← 🧪 tests sit next to the component they cover
    │   │       └── index.ts              ← re-exports for the component folder
    │   │
    │   ├── i18n/                   ← internationalization module
    │   │   ├── index.ts            ← 📦 i18n public API (re-exported via src/index.ts)
    │   │   ├── resources/          ← translation JSON files (en-US, zh-TW, …)
    │   │   ├── *.test.tsx          ← 🧪 i18n unit tests
    │   │   └── *.ts / *.tsx        ← provider, hooks, types
    │   │
    │   ├── theme/                  ← theming module (📦 also its own subpath: `@bigstack-oss/cube-ui/theme`)
    │   │   ├── index.ts            ← theme public API (re-exported via src/index.ts)
    │   │   ├── CubeThemeProvider.tsx      ← selects the active brand palette at runtime
    │   │   └── tokens/
    │   │       ├── cubePreset.ts   ← Tailwind preset (colors, spacing, …)
    │   │       ├── cubeTheme.ts    ← theme token definitions
    │   │       ├── plugins/        ← custom Tailwind plugins
    │   │       ├── themes/         ← per-brand CSS custom-property files (cubeCOS, cubeEMP, …)
    │   │       └── utils/          ← shared helpers (typography, animations, …)
    │   │
    │   ├── icons/
    │   │   ├── assets/             ← raw SVG source files (monochrome + colored)
    │   │   └── src/                ← ⚙️ auto-generated React icon components (do not edit)
    │   │
    │   ├── stories/                ← Storybook stories (not published)
    │   │   ├── components/         ← per-component stories
    │   │   ├── designTokens/       ← design token showcase stories
    │   │   └── overview/           ← narrative / overview pages
    │   │
    │   ├── internals/              ← shared helpers used only inside this package (not published)
    │   │   ├── components/         ← story-only UI helpers (StoryLayout, CaptionText, …)
    │   │   └── utils/              ← internal utility hooks and functions
    │   │
    │   ├── types/                  ← ambient type declarations (jest-axe, vitest matchers, …)
    │   └── tailwind.css            ← CSS entry point (Tailwind directives + base styles)
    │
    ├── scripts/
    │   ├── generate-icons.ts       ← ⚙️ converts SVGs in icons/assets → icons/src (run before build)
    │   └── syncI18n.ts             ← pulls translation strings from Google Sheets
    │
    ├── i18nSheetConfig.json.local          ← 🔒 your local i18n sheet config (git-ignored)
    ├── i18nSheetConfig.json.local.example  ← template — copy and fill in your sheet ID
    │
    ├── .storybook/                 ← Storybook configuration
    ├── tsup.config.ts              ← build entry / output format
    ├── vitest.config.ts            ← test runner configuration
    ├── tailwind.config.ts          ← Tailwind configuration for the package
    └── package.json
```

## Import Aliases

Within `packages/ui/src`, prefer these aliases (defined in `packages/ui/tsconfig.json`) over `../../../`-style relative imports once a path crosses two or more directory levels:

| Alias             | Points to          |
| ----------------- | ------------------ |
| `@components/*`   | `src/components/*` |
| `@theme/*`        | `src/theme/*`      |
| `@icons/*`        | `src/icons/*`      |
| `@i18n/*`         | `src/i18n/*`       |
| `@internals/*`    | `src/internals/*`  |
| `@shared-types/*` | `src/types/*`      |

Short sibling imports (`./foo`, `../foo`) are left as-is - the aliases exist to kill the `../../../`-counting problem for imports that cross into a different top-level area, not to replace every relative import.

**No bare `@theme`/`@icons`/`@i18n` aliases** (only the `/*` wildcard form) - `src/theme/index.ts`, `src/icons/index.ts`, and `src/i18n/index.ts` exist to define what each module publishes (as `@bigstack-oss/cube-ui`, `@bigstack-oss/cube-ui/theme`, and the top-level `@bigstack-oss/cube-ui` re-exports respectively), not as a general internal import target. Internal code imports the concrete file directly, e.g. `@theme/tokens/cubePreset` or `@i18n/useCubeUiTranslation`, rather than routing through the barrel.

**Why `@shared-types` and not `@types`:** TypeScript special-cases any import specifier starting with `@types/` as a reference to a DefinitelyTyped package (like `@types/node`), regardless of what a `paths` alias maps it to - using `@types/*` produces a `TS6137` error no matter the target. Any future alias should avoid that prefix for the same reason.

**If you add a new alias**, it must be added in three places to actually work everywhere, not just one - `tsc`/the IDE reads `paths` alone, but neither Vite nor ESLint auto-discover it:

1. `packages/ui/tsconfig.json` (`compilerOptions.paths`)
2. `resolve.tsconfigPaths: true` in both `packages/ui/vitest.config.ts` and `packages/ui/.storybook/main.ts`'s `viteFinal` (Vite doesn't read `tsconfig.json` paths on its own)
3. `eslint.config.js`'s `'import/resolver': { typescript: { project: 'packages/ui/tsconfig.json' } }` (needs the explicit `project` path - bare `typescript: true` doesn't resolve them)

`tsup` (the production build) needs no extra config - esbuild resolves `tsconfig.json` `paths` natively at bundle time.

## Development, Build & Publish Workflow

### 1. Develop

```bash
pnpm ui:dev
```

Generates icons, then starts Storybook (`localhost:6006`) on Vite, serving `src/` directly with hot reload - including `src/theme/tokens/**`, so editing a color token, a Tailwind plugin, or a brand palette CSS file reflects immediately, same as editing a component.

### 2. Build

```bash
pnpm build
```

Runs, in order:

1. **`icons:generate`** - SVGs in `src/icons/assets` → generated components in `src/icons/src`
2. **`build:js`** (`tsup`) - three independent entry points, each emitting its own CJS, ESM, and `.d.ts`:

   | Entry   | Source               | Output                                                           |
   | ------- | -------------------- | ---------------------------------------------------------------- |
   | `index` | `src/index.ts`       | `dist/index.{js,mjs,d.ts}` - everything: components, i18n, theme |
   | `icons` | `src/icons/index.ts` | `dist/icons.{js,mjs,d.ts}`                                       |
   | `theme` | `src/theme/index.ts` | `dist/theme.{js,mjs,d.ts}`                                       |

3. **`build:css`** (`postcss`) - `src/tailwind.css` → `dist/index.css`, inlining the theme CSS custom properties (`src/theme/tokens/themes/*.css`) and generating Tailwind utilities from the preset that lives alongside them (`src/theme/tokens/cubePreset.ts`)

Each entry bundles independently (no shared chunk between them), so `theme`'s code is duplicated into `dist/index.js` too, since `index.ts` re-exports it for convenience. This is intentional, not an oversight: `./theme`'s main use case is a small, Node-only import inside a consumer's own `tailwind.config.js` - it's never bundled into a browser build, so the duplication never actually reaches a shipped app bundle.

### 3. What ships (package exports)

Only `dist/` is published (`"files": ["dist"]`). Consumers reach it through four entry points:

```ts
// Everything - components, hooks, i18n, theme
import { CubeButton, CubeThemeProvider, cubePreset } from '@bigstack-oss/cube-ui'

// Icon components only
import { MonochromeHome01 } from '@bigstack-oss/cube-ui/icons'

// Just the design tokens / Tailwind preset / theme provider - e.g. for a
// consumer's own tailwind.config.js, without loading any component code
import { cubePreset } from '@bigstack-oss/cube-ui/theme'

// The compiled stylesheet (Tailwind utilities + theme CSS variables)
import '@bigstack-oss/cube-ui/styles.css'
```

See `pnpm --filter @bigstack-oss/cube-ui build && pnpm --filter @bigstack-oss/cube-ui pack --dry-run` to inspect exactly what a published tarball would contain.

### 4. Publish

Handled by Changesets - see [Release Process](#release-process) below for the full flow. In short: `pnpm changeset` to record a change, then either the CI-automated "Version Packages" PR or `pnpm version && pnpm release` by hand.

## Testing

`@bigstack-oss/cube-ui` is tested with [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react), running in a jsdom environment. Tests are colocated with the component they cover (e.g. `CubeButton.test.tsx` next to `CubeButton.tsx`).

```bash
# Run the full suite once (also what CI runs)
pnpm --filter @bigstack-oss/cube-ui test

# Watch mode while developing
pnpm --filter @bigstack-oss/cube-ui test:watch

# Run with coverage (report is also written to packages/ui/coverage/)
pnpm --filter @bigstack-oss/cube-ui test:coverage
```

The root `pnpm test` runs this across every workspace package via `pnpm -r test`.

Each suite favors user-facing assertions (roles, labels, fired events) over implementation details, and includes a [`jest-axe`](https://github.com/nickcolley/jest-axe) accessibility check per component (`expect(await axe(container)).toHaveNoViolations()`). Note: we type `jest-axe` ourselves in `src/types/jest-axe.d.ts` rather than installing `@types/jest-axe`, since that package hard-references `@types/jest` and clobbers Vitest's own global types.

Coverage (`vitest.config.ts`) excludes `src/icons/**`, `src/stories/**`, `src/internals/**`, and `src/theme/tokens/**` - generated code, Storybook-only helpers, and declarative design-token/Tailwind-preset definitions aren't meaningful to unit-test the same way component logic is, and including them just dilutes the reported percentage. `src/theme/CubeThemeProvider.tsx` (the actual runtime behavior in the theme module) stays covered.

Every push/PR runs `.github/workflows/ci.yml`, which installs and runs `pnpm test`.

## Internationalization

`@bigstack-oss/cube-ui` ships its own dictionary (`en-US` + `zh-TW`) and keeps its own [i18next](https://www.i18next.com) instance, separate from whatever i18n setup the consuming app uses - the library works standalone regardless of the consumer's own i18n choices (or lack of one). This section is the implementation guide for consumers of the published package; see [`CubeUiLocaleProvider`](packages/ui/src/i18n/CubeUiLocaleProvider.tsx), [`useCubeUiTranslation`](packages/ui/src/i18n/useCubeUiTranslation.ts), and [`addCubeUiTranslations`](packages/ui/src/i18n/addCubeUiTranslations.ts) for the underlying implementation, or the `Overview/i18n` story in Storybook (`pnpm ui:dev`) for a live, interactive example of everything below.

### 1. Wrap your app in `CubeUiLocaleProvider` (required)

This is the only required step. Wrap the part of your app that renders `@bigstack-oss/cube-ui` components, passing whichever locale your app is currently using - `@bigstack-oss/cube-ui` components read this to render their built-in strings (e.g. loading/empty states) in the matching language:

```tsx
import { CubeUiLocaleProvider } from '@bigstack-oss/cube-ui'
;<CubeUiLocaleProvider locale={activeLocale /* 'en-US' | 'zh-TW' */}>
  <App />
</CubeUiLocaleProvider>
```

- If you never render this provider, `@bigstack-oss/cube-ui` still works - it defaults to `en-US`.
- `locale` can change at runtime (e.g. tied to your app's own language-switcher state); `@bigstack-oss/cube-ui` components re-render with the new strings immediately, no remount needed.
- Only components that actually own translated strings react to this - most components have no user-facing text of their own and are unaffected either way.

### 2. Adding a locale or overriding a default string (optional)

Use `addCubeUiTranslations` to register a locale `@bigstack-oss/cube-ui` doesn't ship by default, or to override specific default strings for one it does ship. Call this once, e.g. at your app's entry point, before rendering. `resources` is checked against `@bigstack-oss/cube-ui`'s real key set - **passing an unknown or misspelled key is a TypeScript compile error**, not a silent no-op:

```tsx
import { addCubeUiTranslations } from '@bigstack-oss/cube-ui'

// Add a locale @bigstack-oss/cube-ui doesn't ship. Keys you omit fall back to en-US.
addCubeUiTranslations('fr-FR', { 'component.common.loading': 'Chargement' })

// Override one of the shipped default strings.
addCubeUiTranslations('en-US', { 'component.common.loading': 'Please wait' })
```

### 3. Reading `@bigstack-oss/cube-ui`'s own strings directly (rare)

`useCubeUiTranslation` is the hook `@bigstack-oss/cube-ui`'s components use internally to look up their own strings - most consumers never call it directly. Reach for it only if you're building your own component and want to reuse one of `@bigstack-oss/cube-ui`'s existing strings (e.g. its shared "Loading" label) for visual consistency, instead of maintaining a duplicate string in your own app's i18n setup:

```tsx
import { useCubeUiTranslation } from '@bigstack-oss/cube-ui'

const { t } = useCubeUiTranslation()
t('component.common.loading') // -> 'Loading' / '載入中', following the active CubeUiLocaleProvider locale
```

### Key naming convention

Keys are flat, dot-separated strings (not nested JSON objects) in the form `component.<name>.<label>`, camelCase, e.g. `component.pagination.goTo`.

### Maintaining the dictionary via Google Sheets

Translations are maintained in a shared Google Sheet and synced to `packages/ui/src/i18n/resources/{en-US,zh-TW}.json` with a script:

```bash
# 1. One-time setup: authenticate and enable the Sheets API
gcloud auth application-default login \
  --scopes="https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/spreadsheets.readonly"

# 2. Copy the config template and fill in the real sheet id + worksheet title
cp packages/ui/i18nSheetConfig.json.local.example packages/ui/i18nSheetConfig.json.local

# 3. Sync
pnpm i18n:sync
```

The target worksheet should have `key`, `en-US`, and `zh-TW` columns - one row per translation key.

## Local Development (Linking a Consumer App)

To try out unpublished `@bigstack-oss/cube-ui` changes inside a real consumer app - without publishing a new npm version every time and without repeatedly reinstalling - link `packages/ui` directly into the consumer via pnpm's `link:` protocol.

### 1. Start the watcher (cube-ui side)

```bash
# From the cube-ui root
pnpm ui:watch
```

This generates icons and compiles the CSS once upfront, then starts `tsup --watch` to rebuild `dist/` on every TS/TSX change. Leave this running in a dedicated terminal — the consumer reads from `dist/`, not `src/`, so no changes propagate without it.

> **CSS changes are not watched.** If you edit `src/tailwind.css`, run `pnpm --filter @bigstack-oss/cube-ui build:css` manually to recompile it, then restart the consumer's dev server.

### 2. Link it into the consumer

In the consumer app's `package.json`, point the dependency at this repo's `packages/ui` directory using the `link:` protocol (a relative or absolute path):

```json
"dependencies": {
  "@bigstack-oss/cube-ui": "link:../relative/path/to/cube-ui/packages/ui"
}
```

Then run `pnpm install` in the consumer to apply the link.

> **Don't use the `pnpm link` / `pnpm link --global` CLI commands for this.** In a pnpm workspace, they were found to write the link into the _workspace root_ `package.json` (and even add a workspace-wide `overrides` entry) instead of the specific package you meant to link from - silently affecting every package in that workspace, not just the one you're testing in. Hand-editing the `link:` entry in the target package's own `package.json` is the reliable way to scope it correctly.

### 3. Consumer-side Vite config (if the consumer uses Vite)

```ts
resolve: {
  dedupe: ['react', 'react-dom'],
},
optimizeDeps: {
  exclude: ['@bigstack-oss/cube-ui'],
},
```

### 4. Unlink when you're done

When you're ready to go back to the published npm version:

1. Remove the `link:` entry from the consumer's `package.json` and restore the real version string:
   ```json
   "@bigstack-oss/cube-ui": "0.0.6"
   ```
2. Delete the stale symlink and reinstall:
   ```bash
   rm -rf node_modules/@bigstack-oss/cube-ui
   pnpm install
   ```
3. Stop `pnpm ui:watch` in the cube-ui terminal.

> Before committing in the consumer repo, always check `git diff package.json` and `git diff pnpm-lock.yaml` to confirm the `link:` entry is gone — it points at a path that only exists on your machine and will break CI and every other developer's install.

### Risks and how to avoid them

| Risk                                                                               | Why it happens                                                                                                                                                                                                                                         | Fix                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duplicate React instances** (`Invalid hook call` at runtime)                     | `link:` is a symlink to `packages/ui`'s real path on disk. Node resolves its peer deps (`react`/`react-dom`) from _that_ real path upward, landing on `cube-ui`'s own installed React (already present for Storybook/tests) instead of the consumer's. | Add `resolve.dedupe: ['react', 'react-dom']` to the consumer's bundler config (step 3).                                                                                                                                                                                                                               |
| **Stale component in the consumer despite rebuilding**                             | Vite pre-bundles/caches dependencies under `node_modules` and doesn't watch inside them by default, so a freshly rebuilt `dist/` may not be picked up.                                                                                                 | `optimizeDeps.exclude: ['@bigstack-oss/cube-ui']` (step 3); if it's still stale, delete the consumer's `node_modules/.vite` cache and restart its dev server.                                                                                                                                                             |
| **Silently testing against - or shipping - the wrong `@bigstack-oss/cube-ui` version** | Leaving the `link:` entry in place after you're done, or switching back to a registry version by only editing the version string in `package.json`, isn't guaranteed to fully clear pnpm's previously-resolved/symlinked state for that package.       | To fully revert: remove the `@bigstack-oss/cube-ui` line from the consumer's `package.json` entirely (don't just edit the version string in place), delete `node_modules/@bigstack-oss/cube-ui` in the consumer if it still exists, then re-add the real version (`pnpm add @bigstack-oss/cube-ui@<version>`) and `pnpm install`. |
| **Accidentally committing the local link**                                         | The `link:` entry - and the `pnpm-lock.yaml` diff it produces - points at a path that only exists on your machine. Committed as-is, it breaks CI and every other developer's install.                                                                  | Before committing anything in the consumer repo, check `git status`/`git diff` on its `package.json` and `pnpm-lock.yaml` and revert the `@bigstack-oss/cube-ui` entry if it's still pointing at `link:...`.                                                                                                              |
| **Testing against a broken/half-built `dist/`**                                    | If the watcher isn't running (or crashed), the consumer keeps reading whatever was last successfully built, silently going stale.                                                                                                                      | Keep `pnpm ui:watch` running for the whole session; if in doubt, run `pnpm build` once to get a known-good baseline.                                                                                                                                                                                                  |

## Release Process

This monorepo uses [Changesets](https://github.com/changesets/changesets) to manage package versioning and changelogs.

### For contributors - recording a change

Whenever you make a change that should be reflected in the next release, create a changeset before opening your PR:

```bash
pnpm changeset
```

Follow the interactive prompt to select the affected packages and the bump type (`patch` / `minor` / `major`). This generates a small `.md` file inside `.changeset/` - commit it along with your code changes.

> **Bump type guide**
>
> - `patch` - bug fixes, dependency updates, minor tweaks
> - `minor` - new backwards-compatible features
> - `major` - breaking changes

### Automated (CI) - `.github/workflows/release.yml`

Every push to `main` runs the [`changesets/action`](https://github.com/changesets/action) workflow, which:

1. If there are pending changesets on `main`, opens/updates a **"Version Packages"** PR that runs `changeset version` for you (bumping `package.json`s and `CHANGELOG.md`s).
2. When that PR is merged, the workflow runs again, finds no pending changesets, and instead runs `changeset publish` to publish to npm and push the version tags.

This requires an `NPM_TOKEN` repository secret (Settings → Secrets and variables → Actions) holding an npm **Automation** token with publish access to the `@bigstack-oss/cube-ui` package - ask whoever administers the org's npm account for one. Until that secret is added, the "Version Packages" PR step still works; only the final publish step needs it.

### Manual (fallback) - publishing a release by hand

```bash
# 1. Pull the latest main branch
git pull origin main

# 2. Build and apply pending changesets
#    This bumps package.json versions and generates CHANGELOG.md in each package,
#    then deletes the consumed .changeset/*.md files.
pnpm version

# 3. Commit the version bumps and changelogs
git add .
git commit -m "chore: release packages"

# 4. Publish to npm and push the commit + git tags
pnpm release
```

`pnpm release` runs `changeset publish` (which auto-tags the commit with the new version) and then `git push --follow-tags` to push everything upstream.

### Scripts reference

| Script           | What it does                                                      |
| ---------------- | ----------------------------------------------------------------- |
| `pnpm changeset` | Interactively create a new changeset                              |
| `pnpm version`   | Build, then consume changesets → bump versions + write CHANGELOGs |
| `pnpm release`   | Publish to npm + push commit and tags                             |
