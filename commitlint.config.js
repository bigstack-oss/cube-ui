export default {
  extends: ['@commitlint/config-conventional'],
  // `changesets/action` hardcodes this exact commit message for its
  // "Version Packages" release PR - it isn't conventional-commit-shaped and
  // isn't something we control, so exempt it rather than block every release.
  ignores: [(message) => message.startsWith('Version Packages')],
}
