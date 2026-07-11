# cube-ui

## File Structure

```
packages/
├── theme/
│   ├── package.json
│   └── src/
│       └── index.css        ← raw CSS custom properties
└── ui/
    └── src/
        ├── styles.css        ← new; replaces tailwind.css (v3 syntax)
        └── components/
            └── Button/
                └── Button.tsx  ← refactored to use theme tokens
```

## Release Process

This monorepo uses [Changesets](https://github.com/changesets/changesets) to manage package versioning and changelogs. Both `@cube/theme` and `@cube/ui` are versioned together (they always share the same version number).

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

This requires an `NPM_TOKEN` repository secret (Settings → Secrets and variables → Actions) holding an npm **Automation** token with publish access to the `@cube` packages - ask whoever administers the org's npm account for one. Until that secret is added, the "Version Packages" PR step still works; only the final publish step needs it.

### Manual (fallback) - publishing a release by hand

```bash
# 1. Pull the latest main branch
git pull origin main

# 2.Build and apply pending changesets
# This bumps package.json versions and generates CHANGELOG.md in each package,
# then deletes the consumed .changeset/*.md files.
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
