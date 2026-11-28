---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support to the tables:

- `CubeBasicTable`: on the `<table>`; rows get `<test-id>-row` with `data-key` (the row `id`, or what the new `getRowTestKey` prop returns), sub rows `-sub-row`, cells `-cell` and headers `-header` with `data-column`, sort arrows `-sort`, and the empty row `-empty`.
- `CubeBatchActionTable`: the same, plus `-select` on each row checkbox and `-all` on the header checkbox.

`CubeBasicTable.Column` accepts `data-column` for a column without a `property`.
