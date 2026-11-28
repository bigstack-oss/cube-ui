---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the details tables, the step process and the log console:

- `CubeDetailsTable`: on the `<table>`, with `-header`, `-row` (with `data-key`, the title unless `CubeDetailsTable.Row` passes one) and `-value`.
- `CubeViewDetailsTable`: everything `CubeBasicTable` tags, plus `-expand` on each row's expand button and `-detail` on each detail item (with `data-key`, its title).
- `CubeStepProcess`: on the process, with `-item` and `data-key` set to the step number unless `CubeStepProcess.Item` passes one.
- `CubeLogConsole`: on the console, with `-title`, `-copy` and `-log`.
