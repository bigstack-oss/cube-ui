---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support for UI test automation. `CubeButton`, `CubeInput` and `CubeModal` accept `data-testid` and put it on the element a test acts on; `CubeInput` and `CubeModal` also tag their parts (`<test-id>-help`, `-error`, `-title`, `-body`, `-close`, `-cancel`, `-action`), including the modal content rendered in a portal. Components render no test IDs unless one is set. A new Overview / Test IDs page in Storybook documents the rule.
