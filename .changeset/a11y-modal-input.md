---
'@bigstack-oss/cube-ui': patch
---

Improve accessibility of `CubeModal` and `CubeInput`. `CubeModal` is now a modal dialog named by its title (`role="dialog"`, `aria-modal`, `aria-labelledby`), so assistive technology announces it and `getByRole('dialog', { name })` finds it. `CubeInput` marks the input invalid when it shows an error, and uses its help or error message as the input's accessible description, keeping any `aria-describedby` the consumer passes.
