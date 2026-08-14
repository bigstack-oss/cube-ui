---
name: migrate-component
description: Migrate one or more components from cube-cos-ui's old Cos*-prefixed internal UI library (cube-frontend-ui-library) into this repo's public Cube*-prefixed design system package, following this repo's exact file/story/test conventions. Use when the user asks to migrate, port, or "bring over" a component from the old library — e.g. "migrate Checkbox", "port CosDropdown to cube-ui", "do the next component on the migration list".
---

# Migrate a component into cube-ui

> Temporary: remove this skill when the Cos* → Cube* migration is complete. After that, `cube-cos-ui` is a consumer of `@bigstack-oss/cube-ui`, not the source of these components.

You're porting a component from the old internal library (`Cos<Name>`) into this repo's public design system package (`Cube<Name>`). This is a **structural port, not a redesign** — see the "Migration principles" section of this repo's `CLAUDE.md` before you start; everything below assumes you've read it.

The component name to migrate is given as an argument (e.g. `Checkbox`, `Dropdown`). If no name was given, do Phase 0 and ask which one before doing anything else.

## Phase 0 — Resolve paths and pick the target

1. Find the old repo checkout. Default guess: a sibling of this repo, `../cube-cos-ui` (i.e. if this repo is at `~/work/cube-ui`, try `~/work/cube-cos-ui`). If that doesn't exist, search nearby directories or ask the user for the path. The old component library is at `<old-repo>/packages/cube-frontend-ui-library`.
2. Confirm the source component exists: `<old-repo>/packages/cube-frontend-ui-library/src/components/Cos<Name>/`. If the user didn't give an exact name, list that `components/` directory, diff it against `packages/ui/src/components/` here (strip the `Cos`/`Cube` prefix to compare), and show the user what's left to migrate — let them pick, don't guess.
3. Also locate the old story, if one exists: `<old-repo>/packages/cube-frontend-ui-library/src/stories/components/Cos<Name>/`. Some old components have no story and/or no test file — that's fine, note it, you'll still write fresh ones on the destination side (see Phase 5 and 6).

## Phase 1 — Read the source completely

Read every file in the old component's folder (component, skeleton, sub-components, styles) and its story folder if one exists. Look specifically for:

- **Public API**: exported prop types, default values, which props are enumerable unions (candidates for `as const` arrays + Storybook `select` controls) vs. free-form.
- **Sub-components** exported alongside the main one (e.g. a `Grid`/`Skeleton` sibling) — these need their own destination files too, not just the main component. On the public API they become **compound members** of the root (`CubeCheckbox.Skeleton`, `CubeCheckbox.Grid`), even if the old library exported them as flat siblings (`CosCheckboxSkeleton`, `CosCheckboxGrid`).
- **Styling**: is it `cva`-based already? Note every Tailwind class used — you'll carry these over close to verbatim (see Phase 2).
- **Icons**: which icon components does it import, and under what names?
- **Ref handling**: `forwardRef`, or `ref` taken as a plain prop (React 19 style)? Preserve whichever the source uses — don't "modernize" or "fix" this during migration.
- **State**: controlled vs. uncontrolled patterns, any tri-state (`boolean | null`) props, anything that only seeds initial state on mount (relevant later for the story's `Playground`).

## Phase 2 — Check token & icon compatibility

This repo's design tokens (`packages/ui/src/theme/tokens/themes/*.css`, `--cube-color-*` vars) mirror the old repo's `@cube-frontend/ui-theme` preset. Spot-check a handful of the Tailwind color classes the source component uses (e.g. `grep` for `text-`, `bg-`, `border-` classes in its styles file) against `cubeCOS.css` here to confirm the tokens exist under the same names. In practice they always do — but confirm, don't assume, especially for less common tokens.

For icons: check `packages/ui/src/icons/src/index.ts` here for each icon the source component imports (search by the icon's semantic name, e.g. "checkbox", "search" — export names follow `<Category><PascalCaseName>`, e.g. `MonochromeCheckboxCheckedFilled`).

- **If found**: use it directly via `@icons`.
- **If missing**: copy the raw `.svg` from the old repo's `CosIcon` assets folder into `packages/ui/src/icons/assets/<category>/`, then run `pnpm --filter @bigstack-oss/cube-ui icons:generate`. Never hand-write an icon `.tsx` file.

## Phase 3 — Scaffold the destination component

Create `packages/ui/src/components/Cube<Name>/`. Use `CubeButton/` (has enumerable variants + a types file) and `CubeInput/` (simple, no types file needed) as your two reference shapes — pick whichever fits. Typical file set (see `CLAUDE.md` → "Component file structure" for the full convention):

1. `cube<name>Types.ts` — `as const` arrays for each enumerable variant, derived union types, and the `Cube<Name>Props` type (only add this file if there's at least one enumerable variant or the props are non-trivial; trivial components can inline the Props type in the main file like `CubeInput` does).
2. `cube<name>Styles.ts` (or `.tsx` if it needs to import a type for a `Record<..., ClassValue>` placeholder, see `cubeButtonStyles.tsx`) — one **named** `cva` export per style target. Do not group them into a single object.
3. `Cube<Name>.tsx` — the component itself. Rename every `Cos*` identifier to `Cube*`. Swap relative/`.svg?react` icon imports for `@icons` named imports. Swap any relative `CosSkeleton`/`CosX` sibling import for the equivalent `Cube*` sibling (relative import within `src/components/`, e.g. `'../CubeSkeleton'`).
4. `Cube<Name>Skeleton.tsx` and any other same-family sub-components (grid, item wrapper, etc.) the source exported — port each one as its own file, following the same renaming rules. Then attach them on the root as compound members (prefer this even when the source used flat sibling exports):
   ```ts
   // e.g. at the bottom of CubeCheckbox.tsx, or in index.ts before re-exporting
   CubeCheckbox.Skeleton = CubeCheckboxSkeleton
   CubeCheckbox.Grid = CubeCheckboxGrid
   ```
   Consumers should write `<CubeCheckbox.Skeleton />` / `<CubeCheckbox.Grid />`, not import `CubeCheckboxSkeleton` as a top-level name.
5. `index.ts` — barrel export the root (with compounds attached) and related **types**. Do **not** also re-export flat sibling component names (`CubeCheckboxSkeleton`, `CubeCheckboxGrid`, …) — the compound form is the public API. Pattern:
   ```ts
   export type { CubeNameColor, CubeNameProps /* ... */ } from './cubeNameTypes'
   export type { CubeNameSkeletonProps } from './CubeNameSkeleton'
   export type { CubeNameGridProps } from './CubeNameGrid'
   export { CubeName } from './CubeName' // CubeName.Skeleton / CubeName.Grid already attached
   ```
   Do **not** re-export the `as const` variant arrays from `index.ts` — leave them reachable only via the direct `cube<name>Types.ts` path, matching every existing component.
6. Register it in `packages/ui/src/index.ts`: add `export * from './components/Cube<Name>'` in alphabetical order among the existing `export * from './components/Cube...'` lines.

## Phase 4 — Write tests

The source component very likely has **no** test file — that's a known gap in the old repo, not a signal to skip this. Write `Cube<Name>.test.tsx` from scratch, modeled on `CubeButton.test.tsx` and `CubeInput.test.tsx`:

- render + accessible name
- each meaningful variant (`it.each` over the const array from the types file where that fits naturally)
- controlled vs. uncontrolled behavior, if applicable
- disabled behavior — no callback fires, element `toBeDisabled()`
- the `isLoading` → skeleton swap, if applicable
- exactly one `jest-axe` accessibility test: `expect(await axe(container)).toHaveNoViolations()`

## Phase 5 — Write the Storybook story

Create `packages/ui/src/stories/components/Cube<Name>/Cube<Name>.stories.tsx`. Follow `CLAUDE.md` → "Storybook story structure" precisely — docs page block order, `Playground` + `Gallery` pair, disabled controls for non-primitive props with a translation `render` function, row/`.Header` helper pattern for repeated Gallery layouts.

Decide the `meta.title` tier (`Atoms/*` vs `Molecules/*`) by looking at the component's structure, not by copying the old repo's Storybook category verbatim (the old repo may not have used the same tiers). If it's genuinely ambiguous, ask the user rather than guessing — this is one of the few real judgment calls in an otherwise mechanical process.

Port the old Gallery's coverage (every variant × state combination it demonstrated) rather than inventing a new set from scratch — the old story is usually a good checklist of what actually matters to show. In stories and tests, render same-family pieces via the compound API (`<CubeCheckbox.Skeleton />`, not a flat `CubeCheckboxSkeleton` import).

## Phase 6 — Verify

Run all of these before considering the migration done (Node ≥24.15 required — `source ~/.nvm/nvm.sh && nvm use 24.15.0` first if needed):

```bash
pnpm --filter @bigstack-oss/cube-ui exec tsc --noEmit
pnpm eslint <every path you touched>          # from repo root — see note below
pnpm --filter @bigstack-oss/cube-ui exec prettier --check <every path you touched>   # --write to fix, then re-check
pnpm --filter @bigstack-oss/cube-ui test
pnpm --filter @bigstack-oss/cube-ui exec storybook build -o /tmp/cube-ui-sb-verify   # then rm -rf that dir
```

Run `eslint` via the root `pnpm eslint` script, **not** `pnpm --filter @bigstack-oss/cube-ui exec eslint <path>` — the filtered form breaks `eslint-plugin-tailwindcss`'s config resolution and produces false "not a Tailwind CSS class" errors on every custom design-token class, even in already-shipped code. See `CLAUDE.md` for details.

A clean `tsc` does not prove the story renders — the Storybook build step is not optional; it's what actually exercises the new story's JSX and `render` functions.

## Phase 7 — Report, don't commit

Summarize what was ported, any deliberate deviations from the source (missing icon that had to be added, a prop that couldn't map to a Storybook control and how you worked around it, flat sibling exports converted to compounds like `CubeCheckbox.Skeleton`, a bug you noticed in the source but did _not_ silently fix), and what's left unverified (e.g. no visual review in a running dev server). Do not `git add`/`git commit`/push unless the user explicitly asks — this typically runs directly in the user's own checkout.
