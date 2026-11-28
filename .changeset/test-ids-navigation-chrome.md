---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the components that frame a page, so a UI test can move around an app:

- `CubeSideBar`: on the bar, with `-logo`, `-username`, `-data-center`, `-version`, `-option` and `-link`. Options and links carry `data-key` (their label or text, unless they pass one: `CubeSideBarComboboxOptionProps` and `CubeSideBarBottomLinkProps` accept `data-key`).
- `CubeBreadcrumb`: on the trail, with `-item` and `data-key` on each item (`CubeBreadcrumb.Item` accepts `data-key`).
- `CubeBackButton`: on the header, with `-back`, `-title`, `-details` and `-link`.
- `CubeHyperlink`: `data-testid` and `data-key` on the link it renders.
