---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to more components for UI test automation:

- `CubeTextarea`: on the `<textarea>`; its error message gets `<test-id>-error`.
- `CubePasswordInput`: the show / hide icon gets `<test-id>-toggle`.
- `CubeCheckbox` and `CubeRadioButton`: on the visible label, because the `<input>` inside it is hidden (the test ID used to reach the hidden input, which a test cannot click).
- `CubeToggle`: on the switch button.
