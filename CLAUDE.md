# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## Overview

`cube-ui` is a pnpm monorepo (Node ≥24.15, pnpm ≥10.33) that publishes the **Cube Design System** — the public, versioned successor to the internal `Cos*`-prefixed component library in `cube-frontend-ui-library` (part of the `cube-cos-ui` monorepo). It currently has a single package, `packages/ui` (npm name `@bigstack-oss/cube-ui`), developed in Storybook and built with `tsup`.

**This repo is an active migration target.** Components are being ported one at a time from `cube-cos-ui/packages/cube-frontend-ui-library` (naming convention `Cos<Name>`) into `packages/ui` here (naming convention `Cube<Name>`). If you're asked to migrate, port, or "bring over" a component, see the `migrate-component` skill (`.claude/skills/migrate-component/SKILL.md`) — it encodes the full step-by-step procedure. This document just describes the conventions that procedure relies on. Once every component is migrated, that skill should be removed, and `cube-cos-ui` will stop being the source of these components and become a consumer of `@bigstack-oss/cube-ui` instead.

## Commands

Run everything with Node ≥24.15 (`source ~/.nvm/nvm.sh && nvm use 24.15.0` if your default `node` is older — `pnpm` hard-fails on an old Node via `engines.node`).

```bash
# Install deps
pnpm install

# Storybook dev server (regenerates icons first)
pnpm ui:dev                        # or: pnpm --filter @bigstack-oss/cube-ui storybook

# Build the storybook static site (also a good migration smoke test)
pnpm --filter @bigstack-oss/cube-ui exec storybook build -o <tmp-dir>

# Typecheck / lint / format (root scripts run across all packages)
pnpm tsc
pnpm eslint            # pnpm eslint:fix to auto-fix
pnpm prettier          # pnpm prettier:fix to auto-fix
pnpm lint              # tsc + eslint + prettier, no fixes

# Package-scoped equivalents (useful when iterating on one component)
pnpm --filter @bigstack-oss/cube-ui exec tsc --noEmit
pnpm --filter @bigstack-oss/cube-ui exec prettier --check <path>   # --write to fix

# Tests (vitest)
pnpm --filter @bigstack-oss/cube-ui test
pnpm --filter @bigstack-oss/cube-ui test:watch

# Regenerate icon components from raw SVGs (also runs automatically before storybook/build)
pnpm --filter @bigstack-oss/cube-ui icons:generate
```

**Always lint with the root `pnpm eslint` script (optionally `pnpm eslint <path>`), never `pnpm --filter @bigstack-oss/cube-ui exec eslint <path>`.** The filtered form changes the resolved `cwd` in a way that breaks `eslint-plugin-tailwindcss`'s config resolution — every custom design-token class (`text-functional-title`, `icon-md`, `primary-body2`, ...) then falsely reports as "not a Tailwind CSS class," even on already-shipped, passing code. `pnpm eslint` from the repo root is what CI actually runs and is the only invocation that reflects real signal.

Versioning uses [Changesets](https://github.com/changesets/changesets) (`.changeset/`); `pnpm version` / `pnpm release` are for maintainers cutting a release, not part of day-to-day component work.

## Path aliases (`packages/ui/tsconfig.json`)

| Alias             | Resolves to                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| `@components/*`   | `src/components/*`                                                             |
| `@theme/*`        | `src/theme/*`                                                                  |
| `@icons`          | `src/icons/index.ts` (generated icon barrel — see Icons below)                 |
| `@i18n/*`         | `src/i18n/*`                                                                   |
| `@internals/*`    | `src/internals/*` (shared Storybook doc primitives, not exported to consumers) |
| `@shared-types/*` | `src/types/*`                                                                  |
| `@utils/*`        | `src/utils/*`                                                                  |

Within a component's own folder, prefer relative imports to siblings (e.g. `CubeButtonSkeleton.tsx` imports `CubeSkeleton` via `'../CubeSkeleton/CubeSkeleton'`); use the `@components/...` alias from _outside_ the component (stories, other components, tests importing a different component).

## Component file structure

Every component lives in its own folder under `src/components/Cube<Name>/`. Look at `CubeButton/` and `CubeInput/` as the canonical examples. Typical layout:

```
src/components/Cube<Name>/
  Cube<Name>.tsx            # the component
  cube<name>Types.ts        # const arrays for enumerable variants + derived union types + the Props type
  cube<name>Styles.ts(x)    # cva() style definitions — one named export per style target
  Cube<Name>Skeleton.tsx    # loading-state placeholder (built from CubeSkeleton), if the component has isLoading
  Cube<Name>Utils.ts        # pure helpers, only if needed (see cubeButtonUtils.ts)
  Cube<Name>.test.tsx       # vitest + Testing Library + jest-axe
  index.ts                  # barrel export
```

Conventions that matter:

- **Types file owns the Props type.** `cube<name>Types.ts` exports `as const` arrays for every enumerable variant (e.g. `cubeButtonSizes = ['sm', 'md', 'lg'] as const`), the derived union types (`CubeButtonSize = (typeof cubeButtonSizes)[number]`), and the component's `Cube<Name>Props` type. The component file imports the Props type from there — it doesn't redeclare it inline unless the component is simple enough to have no enumerable variants at all (see `CubeInput.tsx`, which has no types file).
- **Styles file uses flat named `cva` exports**, not a single grouped object. `export const button = cva(...)`, `export const iconContainer = cva(...)`, etc. — never `export const styles = { button: cva(...), icon: cva(...) }`.
- **Same-family sub-components use the compound API** — `CubeCheckbox.Skeleton`, `CubeCheckbox.Grid`, `CubeDropdown.Item`, etc. Keep them as separate source files, but attach them on the root (`CubeCheckbox.Skeleton = CubeCheckboxSkeleton`) and export only the root from `index.ts` (plus related prop types). Do **not** also export flat sibling names like `CubeCheckboxSkeleton` from the package barrel. Prefer this even when the old `Cos*` source used flat exports; some early ports here still use flat siblings (e.g. `CubeButtonSkeleton`) — new migrations should standardize on compounds.
- **`index.ts` re-exports types (not the const arrays) and the root component** (with compounds already attached). The `as const` variant arrays are intentionally _not_ re-exported from `index.ts` — Storybook stories import them directly from the types file (`@components/CubeButton/cubeButtonTypes`) to drive `argTypes` options. Mirror this even though it looks asymmetric; it's deliberate.
- **Register every new component in `packages/ui/src/index.ts`**, alphabetically: `export * from './components/Cube<Name>'`.
- Use `class-variance-authority` (`cva`) for variant styling and `tailwind-merge`'s `twMerge` to merge a caller-supplied `className` with computed classes.
- React 19 is in use — `forwardRef` is optional (some components, e.g. `CubeInput`, still use it; others take `ref` as a plain prop). Preserve whichever pattern the source `Cos*` component already used rather than converting during migration.

## Styling & design tokens

Colors, spacing, and typography come from CSS variables in `src/theme/tokens/themes/*.css` (prefixed `--cube-color-*`). **These are the same tokens the old `cube-cos-ui` repo's `@cube-frontend/ui-theme` Tailwind preset exposes** — `text-functional-title`, `bg-primary`, `text-status-negative`, `peer-hover:text-blue-700`, etc. all resolve identically in both repos. This means Tailwind class strings from a `Cos*` component's styles almost always copy over verbatim; don't invent new colors or remap tokens during a migration unless you've confirmed the token is actually missing here.

Icon sizing uses utility classes from a Tailwind plugin (`.icon-md`, `.icon-md-sm`, etc. — see `src/theme/tokens/plugins/iconPlugin.ts`), applied directly on the icon element: `<MonochromeSearch className="icon-md" />`. Don't wrap an icon in an extra sizing wrapper unless the original component did so for another reason (e.g. `CubeCheckbox`'s `iconWrap` adds hover/color-transition styling, not sizing).

## Icons

Icons are generated, not hand-written. Raw SVGs live in `src/icons/assets/{monochrome,colored}/*.svg`; `pnpm --filter @bigstack-oss/cube-ui icons:generate` (also runs automatically before `storybook`/`build`) runs them through `svgr` into `src/icons/src/**/*.tsx`, which `@icons` (`src/icons/index.ts`) barrels.

Export naming is `<Category><PascalCaseFileName>` — `monochrome/checkbox_checked_filled.svg` → `MonochromeCheckboxCheckedFilled`. If a component you're migrating needs an icon that doesn't exist here yet, copy the raw `.svg` from the old repo's `CosIcon` assets folder into `src/icons/assets/<category>/`, then run `icons:generate`. Check first — many icons (search, user, checkbox states, warning, view/view-off, etc.) are already migrated.

## Storybook story structure

Stories live in `src/stories/components/Cube<Name>/Cube<Name>.stories.tsx`, mirroring the component's folder name. Canonical examples: `CubeButton.stories.tsx`, `CubeInput.stories.tsx`.

- **Docs page**: every `meta.parameters.docs.page` renders the same four blocks in order — `<Title /> <Description /> <Primary /> <Controls />` — from `@storybook/addon-docs/blocks`. Put the component blurb in `meta.parameters.docs.description.component` so `<Description />` renders it — do **not** put that text on Gallery's `<StoryLayout desc=...>`.
- **`meta.title`** follows an atomic-design tier prefix — `'Atoms/Button'`, `'Molecules/Input'`, `'Molecules/Password Input'`, `'Molecules/Checkbox'`. Simple, non-composite primitives (Button, Loading Spinner, Skeleton) are `Atoms/*`; anything with internal structure like a label/help-text/icon slot (Input, Password Input, Checkbox) is `Molecules/*`. When unsure, ask rather than guessing — it's a judgment call each time.
- **Two stories per component**: `Playground` and `Gallery`.
  - `Playground` — interactive, args-driven, wrapped in `<PlaygroundLayout>`, `tags: ['!dev']`. Give every arg a sensible non-empty default so the canvas shows something meaningful on first load, not a blank/invisible component.
  - `Gallery` — exhaustive static visual reference, `tags: ['!autodocs']`, controls/actions/interactions all disabled via `parameters`, built with `<StoryLayout>` / `<StoryLayout.Section>` (title only — no component `desc`; that lives on the Docs page).
- **The story's args type is hand-curated, not the component's real Props type.** Only list props worth demoing in the Controls panel. When a real prop's type can't be represented by a Storybook control — `ReactNode`, an `SvgElement`, a tri-state `boolean | null` — invent a control-friendly stand-in (a string enum via a `select`, a plain `boolean`, etc.) and translate it back to the real prop inside a story-level `render` function. Precedent:
  - `CubeInput`'s `trailingIcon` is a `select` with options `'with icon' | 'without icon'`, mapped to a real `<MonochromeSearch />` element in `Playground.render`.
  - `CubePasswordInput`'s `initialShowPassword` only seeds state on mount, so `Playground.render` keys the component on that arg (`key={String(args.initialShowPassword)}`) to force a remount when the control changes.
- **Row/table helper components** live alongside the story file, named `<Name>Row.tsx` (`InputRow.tsx`, `PasswordInputRow.tsx`, `SkeletonRow.tsx`, `SpinnerRow.tsx`, `CheckboxRow.tsx`). Pattern: a small component taking `title` plus content, used to lay out one line of a Gallery table. If the Gallery renders many rows sharing one column header, attach a static `.Header` (`InputRow.Header = InputRowHeader`, same pattern as `StoryLayout.Section`) instead of hand-duplicating the header's grid classes at each call site — they will silently drift out of alignment otherwise.
- Reuse the shared doc primitives from `@internals/components`: `StoryLayout`, `StoryLayout.Section`, `SubHeading`, `CaptionText`, `Heading`, `PlaygroundLayout`. Don't write ad-hoc `<div className="primary-body2">` headers when `SubHeading`/`CaptionText` already exist for that.

## Testing

Every component needs a `Cube<Name>.test.tsx` using `@testing-library/react`, `@testing-library/user-event`, and `jest-axe`. Note: several `Cos*` source components in the old repo have **no** existing tests at all — that's a gap in the source, not a signal that tests aren't needed here. Write them fresh during migration. Minimum coverage, modeled on `CubeButton.test.tsx` / `CubeInput.test.tsx`:

- default render / accessible name
- each meaningful prop or variant (`it.each` over the const array from the types file where it fits)
- controlled vs. uncontrolled behavior, if the component has both
- disabled behavior (no callback firing, `toBeDisabled()`)
- the loading-skeleton swap, if the component has `isLoading`
- one `jest-axe` "has no accessibility violations" test

## Migration principles

This is a **structural port, not a redesign**. Preserve the old component's behavior, prop shapes, and Tailwind classes as-is. What _does_ change is packaging: file layout, import paths/aliases, icon imports, and wrapping the whole thing in this repo's Storybook doc conventions. If you notice an actual bug in the source component while porting it, flag it to the user explicitly — don't silently fix it and don't silently carry it over without mentioning it.

Do not commit or push without being asked — component migrations typically happen directly in the developer's own checkout of this repo.
