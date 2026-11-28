---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the table input, the file upload and the date picker:

- `CubeTableInput`: on the `<input>`; the error icon gets `<test-id>-error` and its tooltip `<test-id>-tooltip`.
- `CubeUpload`: on the wrapper, with `-button`, `-input` (the hidden file input, which Playwright's `setInputFiles` can fill), `-file`, `-progress` and `-error`, and `-file-cancel`, `-progress-abort` and `-error-close` for their buttons.
- `CubeDatePicker`: on the trigger button; the calendar, rendered in a portal, gets `-menu`, `-start`, `-end`, `-prev`, `-next`, `-month`, `-reset`, `-apply`, and `-day` for each day with `data-key` set to its date (`YYYY-MM-DD`).
