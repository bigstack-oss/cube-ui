---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the feedback and status components:

- `CubeInlineNotification`: on the notification, with `-title` and `-close`.
- `CubeToastProvider`: on the list of toasts; each toast gets `<test-id>-item` with `data-key` (its `id`) and `<test-id>-item-close`.
- `CubeTag`: on the tag, with `-close`; it also accepts `data-key`.
- `CubeStatus`: on the status, which then carries `data-status`, its untranslated value.
- `CubeTooltip`: on the visible tooltip only, while it is shown.
