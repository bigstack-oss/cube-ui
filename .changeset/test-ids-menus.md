---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the menu components, including the parts they render in a portal:

- `CubeDropdown`: a wrapper, `-trigger`, `-menu`, `-option`, `-all`, `-search`, `-clear` and `-empty`.
- `CubeOverflowMenu`: `-trigger` (unless the trigger has its own test ID), `-menu` and `-item`.
- `CubeSearchBarFilter` and `CubeSearchBarGlobal`: on the `<input>`, with `-clear`, `-menu`, `-option`, and for the global search `-option-clear` and the category picker's `-category-*` parts.

Repeated items (options, menu items, suggestions, categories) also carry `data-key`, their text unless the consumer passes one (`CubeDropdown.Item`, `CubeOverflowMenu.Item`, `CubeSearchBarFilter.Item`, `CubeSearchBarGlobal.Item` and `CubeCheckbox` accept `data-key`). The new `CubeTestKeyProps` type is exported.
