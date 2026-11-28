---
'@bigstack-oss/cube-ui': minor
---

Add `data-testid` support for UI test automation. `CubeButton`, `CubeInput` and `CubeModal` accept `data-testid` and put it on the element a test acts on; `CubeInput` and `CubeModal` also tag their parts (`<test-id>-help`, `-error`, `-title`, `-body`, `-close`, `-cancel`, `-action`), including the modal content rendered in a portal. Components render no test IDs unless one is set. A new Overview / Test IDs page in Storybook documents the rule.

A closed `CubeModal` is now also hidden with `visibility: hidden` once it has faded out, so UI tests can tell an open modal from a closed one and its buttons can no longer be reached by the keyboard. `CubeInput` now shows its help message when `errorMessage` is `true` or an empty string, instead of an empty footer. An empty `data-testid` renders no attribute. The `CubeTestIdProps` type is exported for wrapper components.
