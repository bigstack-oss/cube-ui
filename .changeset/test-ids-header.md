---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to `CubeHeader`: on the header, with `-quick-access` (each link, with `data-key`), `-action` (each function button, with `data-key`) and `-language` (the language dropdown, with its `-trigger`, `-menu` and `-option` parts; options are keyed by their `value`). A `data-key` defaults to the item's `hoverMessage`; `CubeHeaderQuickAccess` and `CubeHeaderFunctionBarItem` accept `data-key` to override it.
