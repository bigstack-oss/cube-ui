---
'@bigstack-oss/cube-ui': minor
---

An icon-only `CubeButton` now requires an accessible name in its type: `aria-label`, or `aria-labelledby` pointing at visible text. Without one it has no name for screen readers, or for `getByRole('button', { name })` in tests.

**Breaking for apps that render an icon-only button without one:** add an `aria-label`. For the same reason, `CubeHeaderFunctionBarItem.hoverMessage` is now required: it names the item's icon-only button, and an item without it had no name.
