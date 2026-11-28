/**
 * Lets a consumer set the `data-testid` that UI test automation (Playwright,
 * Selenium) selects by. A component puts it on the element a test acts on,
 * such as the button, the input or the dialog, and gives each of its parts an
 * ID derived from it with `testIdOf`.
 */
export type CubeTestIdProps = {
  'data-testid'?: string
}
