# @bigstack-oss/cube-ui

## 0.4.0

### Minor Changes

- 435191c: An icon-only `CubeButton` now requires an accessible name in its type: `aria-label`, or `aria-labelledby` pointing at visible text. Without one it has no name for screen readers, or for `getByRole('button', { name })` in tests.

  **Breaking for apps that render an icon-only button without one:** add an `aria-label`. For the same reason, `CubeHeaderFunctionBarItem.hoverMessage` is now required: it names the item's icon-only button, and an item without it had no name.

- 94d18f0: Add `data-testid` support for UI test automation. `CubeButton`, `CubeInput` and `CubeModal` accept `data-testid` and put it on the element a test acts on; `CubeInput` and `CubeModal` also tag their parts (`<test-id>-help`, `-error`, `-title`, `-body`, `-close`, `-cancel`, `-action`), including the modal content rendered in a portal. Components render no test IDs unless one is set. A new Overview / Test IDs page in Storybook documents the rule.

  A closed `CubeModal` is now also hidden with `visibility: hidden` once it has faded out, so UI tests can tell an open modal from a closed one and its buttons can no longer be reached by the keyboard. `CubeInput` now shows its help message when `errorMessage` is `true` or an empty string, instead of an empty footer. An empty `data-testid` renders no attribute. The `CubeTestIdProps` type is exported for wrapper components.

- c783803: Add `data-testid` support to the feedback and status components:
  - `CubeInlineNotification`: on the notification, with `-title` and `-close`.
  - `CubeToastProvider`: on the list of toasts; each toast gets `<test-id>-item` with `data-key` (its `id`) and `<test-id>-item-close`.
  - `CubeTag`: on the tag, with `-close`; it also accepts `data-key`.
  - `CubeStatus`: on the status, which then carries `data-status`, its untranslated value.
  - `CubeTooltip`: on the visible tooltip only, while it is shown.

- 42e824a: Add `data-testid` support to more components for UI test automation:
  - `CubeTextarea`: on the `<textarea>`; its error message gets `<test-id>-error`.
  - `CubePasswordInput`: the show / hide icon gets `<test-id>-toggle`.
  - `CubeCheckbox` and `CubeRadioButton`: on the visible label, because the `<input>` inside it is hidden (the test ID used to reach the hidden input, which a test cannot click). **Behavior change:** a test that selected the input through its `data-testid` now gets the label; click or `check()` the label, and read the state from the input inside it (`label.locator('input')`).
  - `CubeToggle`: on the switch button.

- 7f40793: Add `data-testid` support to the menu components, including the parts they render in a portal:
  - `CubeDropdown`: a wrapper, `-trigger`, `-menu`, `-option`, `-all`, `-search`, `-clear` and `-empty`.
  - `CubeOverflowMenu`: `-trigger` (unless the trigger has its own test ID), `-menu` and `-item`.
  - `CubeSearchBarFilter` and `CubeSearchBarGlobal`: on the `<input>`, with `-clear`, `-menu`, `-option`, and for the global search `-option-clear` and the category picker's `-category-*` parts.

  Repeated items (options, menu items, suggestions, categories) also carry `data-key`, their text unless the consumer passes one (`CubeDropdown.Item`, `CubeOverflowMenu.Item`, `CubeSearchBarFilter.Item`, `CubeSearchBarGlobal.Item` and `CubeCheckbox` accept `data-key`). The new `CubeTestKeyProps` type is exported.

- c46884c: Add `data-testid` support to the navigation components:
  - `CubeTabs`: on the tab bar; each tab gets `<test-id>-tab` with `data-key`.
  - `CubeContentSwitcher`: on the switcher; each item gets `<test-id>-item` with `data-key`.
  - `CubePagination`: on the pager, with `-first`, `-prev`, `-page` (keyed by page number), `-next`, `-last`, `-go-to`, `-view` (the items-per-page dropdown and its parts) and `-total`.

  `CubeTabs.Tab` and `CubeContentSwitcher.Item` accept `data-key`.

- 7bee9f3: Add `data-testid` support to the tables:
  - `CubeBasicTable`: on the `<table>`; rows get `<test-id>-row` with `data-key` (the row `id`, or what the new `getRowTestKey` prop returns), sub rows `-sub-row`, cells `-cell` and headers `-header` with `data-column`, sort arrows `-sort`, and the empty row `-empty`.
  - `CubeBatchActionTable`: the same, plus `-select` on each row checkbox and `-all` on the header checkbox.

  `CubeBasicTable.Column` accepts `data-column` for a column without a `property`.

### Patch Changes

- 28ad28f: Improve accessibility of `CubeModal` and `CubeInput`. `CubeModal` is now a dialog named by its title (`role="dialog"`, `aria-labelledby`), so assistive technology announces it and `getByRole('dialog', { name })` finds it. `CubeInput` marks the input invalid when it shows an error, and uses its help or error message as the input's accessible description, keeping any `aria-describedby` the consumer passes.

## 0.3.0

### Minor Changes

- f1e672a: Add CubeIconText
- 72fd419: Add CubeInlineNotification
- 193c741: Add the CubeAIR theme, replace the placeholder CubeEMP palette with the real one, and let each theme set its whole scene gradient
- 1d327ce: Add CubeProgressBarChart
- 8970f21: Add CubeDashboardPanel
- c934366: Add CubeBreadcrumb
- ff32238: Add CubeDatePicker (migrated from CosDatePicker) with `useCubeDatePickerDisplayDates` and `CubeTimeZoneContext`
- a52e161: Add CubeModal
- 58b5f9f: Add CubeStackCard
- 59c7a74: Add CubeDetailsTable
- 4d3de25: Add CubeInformation
- 696d911: Add CubeHeader (migrated from CosHeader) with the quick access bar, language dropdown and function bar
- cc5414d: Add CubeCountSegmentedChart (migrated from CosCountSegmentedChart)
- 4c2ec14: Add CubeUpload (migrated from CosUpload) with `.File`, `.ProgressBar` and `.Error`
- 6ded4bd: Add CubeNagging
- 3fe25c4: Add CubeCollapsiblePanelLayout
- 0546ef9: Add CubeSegmentedBar
- 6ec32e2: Add CubeViewDetailsTable
- cf601e7: Add CubeGeneralPanel
- 6f29230: Add CubeBatchActionTable
- b50fa4e: Add CubePagination
- 47ef56f: Add CubeSearchBarFilter (migrated from CosSearchBarFilter) with `.Item`
- 78f34e2: Add CubeLogConsole
- 814d8ab: Add CubeMessage
- 5e17d30: Add CubePercentagePieChart (migrated from CosPercentagePieChart)
- 15d8ef0: Add CubeBackButton (migrated from CosBackButton) with `.BarChart`, `.Details`, `.Divider` and `.Link`
- 0fc4c8b: Add CubeProgressBar and CubeResourceUsageBar
- 86afab5: Add CubeSideBar (migrated from CosSideBar) and the `ColoredCubeCosFullLogo` icon
- 6e064be: Add CubeContentSwitcher
- 15e7feb: Add CubeToastProvider and useCubeToast
- b6445d5: Add CubeColumnChart (migrated from CosColumnChart); its canvas colors follow the active theme
- cddf92d: Add CubeTableInput
- 972475e: Add CubeBasicTable
- ee7e015: Add CubeSearchBarGlobal (migrated from CosSearchBarGlobal) with `.Item`, in a regular and a category variant

## 0.2.0

### Minor Changes

- 7d28ab2: Add CubeTooltip
- ce98c2d: Add CubeStatus and CubeStatusReaction
- 9c450f4: Add CubeDropdown
- 0639a1e: Add CubeOverflowMenu

## 0.1.0

### Minor Changes

- f49817c: Add CubeToggle
- 1609833: Add CubeHyperlink
- a087da0: Add CubeRadioButton
- 12162ab: Add CubeTextarea
- e0326e1: Add CubeTag

## 0.0.2

### Patch Changes

- 237e959: Init
