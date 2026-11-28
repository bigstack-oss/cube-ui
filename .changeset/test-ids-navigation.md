---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the navigation components:

- `CubeTabs`: on the tab bar; each tab gets `<test-id>-tab` with `data-key`.
- `CubeContentSwitcher`: on the switcher; each item gets `<test-id>-item` with `data-key`.
- `CubePagination`: on the pager, with `-first`, `-prev`, `-page` (keyed by page number), `-next`, `-last`, `-go-to`, `-view` (the items-per-page dropdown and its parts) and `-total`.

`CubeTabs.Tab` and `CubeContentSwitcher.Item` accept `data-key`.
