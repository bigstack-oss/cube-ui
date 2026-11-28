import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { CaptionText } from '@internals/components/CaptionText'
import { CubeButton } from '@components/CubeButton'
import { CubeDropdown } from '@components/CubeDropdown'
import { CubeInput } from '@components/CubeInput'
import { CubeModal } from '@components/CubeModal'
import { InlineCode } from '../i18n/InlineCode'
import { CodeBlock } from '../i18n/CodeBlock'
import { DemoFrame } from '../i18n/DemoFrame'

const meta: Meta = {
  title: 'Overview/Test IDs',
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
    options: {
      rightPanelWidth: 0,
      bottomPanelHeight: 0,
    },
  },
}

export default meta

type Story = StoryObj

type ComponentTestIds = {
  component: string
  target: string
  parts: { suffix: string; element: string }[]
}

// One row per component that supports test IDs. Add a row when a component
// gains support, in the same pull request.
const COMPONENT_TEST_IDS: ComponentTestIds[] = [
  { component: 'CubeButton', target: 'the <button>', parts: [] },
  {
    component: 'CubeInput',
    target: 'the <input>',
    parts: [
      { suffix: 'help', element: 'the help message' },
      { suffix: 'error', element: 'the error message' },
    ],
  },
  {
    component: 'CubePasswordInput',
    target: 'the <input>',
    parts: [
      { suffix: 'help', element: 'the help message' },
      { suffix: 'error', element: 'the error message' },
      { suffix: 'toggle', element: 'the show / hide icon' },
    ],
  },
  {
    component: 'CubeTextarea',
    target: 'the <textarea>',
    parts: [{ suffix: 'error', element: 'the error message' }],
  },
  {
    component: 'CubeCheckbox',
    target: 'the visible <label> (the <input> inside it is hidden)',
    parts: [],
  },
  {
    component: 'CubeRadioButton',
    target: 'the visible <label> (the <input> inside it is hidden)',
    parts: [],
  },
  {
    component: 'CubeToggle',
    target: 'the switch <button>',
    parts: [],
  },
  {
    component: 'CubeModal',
    target: 'the dialog panel',
    parts: [
      { suffix: 'title', element: 'the title' },
      { suffix: 'body', element: 'the body' },
      { suffix: 'close', element: 'the close icon button' },
      { suffix: 'cancel', element: 'the Cancel button' },
      { suffix: 'action', element: 'the action button' },
    ],
  },
  {
    component: 'CubeDropdown',
    target: 'a wrapper around its label and trigger',
    parts: [
      { suffix: 'trigger', element: 'the button that opens the menu' },
      { suffix: 'menu', element: 'the menu, rendered in a portal' },
      { suffix: 'option', element: 'each option, with data-key' },
      { suffix: 'all', element: 'the select-all checkbox' },
      { suffix: 'search', element: 'the filter field' },
      { suffix: 'clear', element: 'the clear-selection icon' },
      { suffix: 'empty', element: 'the "no data" row' },
    ],
  },
  {
    component: 'CubeOverflowMenu',
    target: 'nothing: it renders no element around its trigger',
    parts: [
      {
        suffix: 'trigger',
        element: 'your trigger element, unless it has a test ID of its own',
      },
      { suffix: 'menu', element: 'the menu, rendered in a portal' },
      { suffix: 'item', element: 'each item, with data-key' },
    ],
  },
  {
    component: 'CubeSearchBarFilter',
    target: 'the <input>',
    parts: [
      { suffix: 'clear', element: 'the clear icon' },
      { suffix: 'menu', element: 'the menu, rendered in a portal' },
      { suffix: 'option', element: 'each item, with data-key' },
    ],
  },
  {
    component: 'CubeSearchBarGlobal',
    target: 'the <input>',
    parts: [
      { suffix: 'clear', element: 'the clear icon' },
      { suffix: 'menu', element: 'the suggestions, rendered in a portal' },
      { suffix: 'option', element: 'each suggestion, with data-key' },
      { suffix: 'option-clear', element: "a recent suggestion's remove icon" },
      { suffix: 'category-trigger', element: 'the category picker' },
      { suffix: 'category-menu', element: 'its menu' },
      { suffix: 'category-option', element: 'each category, with data-key' },
      { suffix: 'category-empty', element: 'the "no category" row' },
    ],
  },
]

const PLAYWRIGHT_SAMPLE = `
await page.getByTestId('demo-email').fill('hello@cube.dev')
await page.getByTestId('demo-open-modal').click()
await expect(page.getByTestId('demo-modal-title')).toHaveText('Delete network')
await page.getByTestId('demo-modal-action').click()
`

const SELENIUM_SAMPLE = `
from selenium.webdriver.common.by import By

def by_test_id(test_id):
    return (By.CSS_SELECTOR, f'[data-testid="{test_id}"]')

driver.find_element(*by_test_id('demo-email')).send_keys('hello@cube.dev')
driver.find_element(*by_test_id('demo-open-modal')).click()
driver.find_element(*by_test_id('demo-modal-action')).click()
`

const MODAL_STATE_SAMPLE = `
await page.getByTestId('demo-open-modal').click()
await expect(page.getByTestId('demo-modal')).toBeVisible()
await page.getByTestId('demo-modal-action').click()
await expect(page.getByTestId('demo-modal')).toBeHidden()
`

const KEY_SAMPLE = `
await page.getByTestId('demo-dropdown-trigger').click()
await page
  .getByTestId('demo-dropdown-option')
  .and(page.locator('[data-key="db-net"]'))
  .click()
`

const KEY_SAMPLE_SELENIUM = `
driver.find_element(
    By.CSS_SELECTOR,
    '[data-testid="demo-dropdown-option"][data-key="db-net"]',
).click()
`

const USAGE_SAMPLE = `
<CubeInput label="Email" data-testid="demo-email" />
<CubeButton data-testid="demo-open-modal">Open modal</CubeButton>
<CubeModal data-testid="demo-modal" title="Delete network" ...>
`

const PartsTable = () => (
  <div className="w-full overflow-x-auto">
    <table className="primary-body2 w-full border-collapse text-left">
      <thead>
        <tr className="border-b border-dark-100 text-functional-title">
          <th className="py-2 pr-6 font-semibold">Component</th>
          <th className="py-2 pr-6 font-semibold">data-testid goes on</th>
          <th className="py-2 font-semibold">Parts</th>
        </tr>
      </thead>
      <tbody>
        {COMPONENT_TEST_IDS.map(({ component, target, parts }) => (
          <tr
            key={component}
            className="border-b border-dark-100 align-top text-functional-text"
          >
            <td className="py-2 pr-6">
              <InlineCode>{component}</InlineCode>
            </td>
            <td className="py-2 pr-6">{target}</td>
            <td className="py-2">
              {parts.length === 0
                ? 'None'
                : parts.map(({ suffix, element }) => (
                    <div key={suffix}>
                      <InlineCode>{`<test-id>-${suffix}`}</InlineCode> {element}
                    </div>
                  ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const DEMO_NETWORKS = ['web-net', 'db-net', 'app-net']

const DemoDropdown = () => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <CubeDropdown
      type="radio"
      label="Network"
      selectedItems={selected}
      data-testid="demo-dropdown"
    >
      <CubeDropdown.Trigger>{selected[0]}</CubeDropdown.Trigger>
      <CubeDropdown.Menu>
        {DEMO_NETWORKS.map((network) => (
          <CubeDropdown.Item
            key={network}
            item={network}
            onClick={() => setSelected([network])}
          >
            {network}
          </CubeDropdown.Item>
        ))}
      </CubeDropdown.Menu>
    </CubeDropdown>
  )
}

const LiveDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <DemoFrame>
      <CubeInput
        label="Email"
        helpMessage="Inspect this field: the input is demo-email and this message is demo-email-help."
        data-testid="demo-email"
      />
      <CubeButton data-testid="demo-open-modal" onClick={() => setIsOpen(true)}>
        Open modal
      </CubeButton>
      <CubeModal
        data-testid="demo-modal"
        size="sm"
        isOpen={isOpen}
        title="Delete network"
        actionText="Delete"
        onActionClick={() => setIsOpen(false)}
        onCloseClick={() => setIsOpen(false)}
      >
        Every part of this dialog has a test ID: demo-modal-title,
        demo-modal-body, demo-modal-close, demo-modal-cancel and
        demo-modal-action.
      </CubeModal>
      <DemoDropdown />
    </DemoFrame>
  )
}

export const Guide: Story = {
  render: () => (
    <StoryLayout
      title="Test IDs"
      desc="How @bigstack-oss/cube-ui components carry data-testid, so UI test automation in Playwright or Selenium keeps working when labels, styles or the display language change."
    >
      <StoryLayout.Section title="The rule">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Set <InlineCode>data-testid</InlineCode> on a component. It goes on
            the element a test acts on: the button, the input or the dialog,
            even when that element is not the component&apos;s outermost one.
          </CaptionText>
          <CaptionText>
            Each part of the component gets an ID derived from yours:{' '}
            <InlineCode>{'<test-id>-<part>'}</InlineCode>, such as{' '}
            <InlineCode>delete-modal-close</InlineCode>. Parts rendered in a
            portal, such as a modal&apos;s buttons, are tagged too.
          </CaptionText>
          <CaptionText>
            Without <InlineCode>data-testid</InlineCode>, a component renders no
            test IDs at all.
          </CaptionText>
          <CaptionText>
            The app names its own test IDs. Use kebab-case, named after the
            screen and the element, such as{' '}
            <InlineCode>networks-create-button</InlineCode>.
          </CaptionText>
          <CodeBlock>{USAGE_SAMPLE}</CodeBlock>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Parts by component">
        <div className="flex flex-col gap-y-4">
          <PartsTable />
          <CaptionText>
            CubeCheckbox and CubeRadioButton hide their real{' '}
            <InlineCode>{'<input>'}</InlineCode>, so their test ID is on the
            label a person clicks. In Playwright,{' '}
            <InlineCode>check()</InlineCode> and{' '}
            <InlineCode>toBeChecked()</InlineCode> work on that label directly.
            In Selenium, click the label, and read the state from the input
            inside it:{' '}
            <InlineCode>
              {'label.find_element(By.TAG_NAME, "input").is_selected()'}
            </InlineCode>
            .
          </CaptionText>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Open, closed and repeated modals">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            A CubeModal stays in the page while it is closed. Once it has faded
            out it is hidden with <InlineCode>visibility: hidden</InlineCode>,
            so check whether it is open with Playwright&apos;s{' '}
            <InlineCode>toBeVisible()</InlineCode> and{' '}
            <InlineCode>toBeHidden()</InlineCode>, or Selenium&apos;s{' '}
            <InlineCode>is_displayed()</InlineCode>.
          </CaptionText>
          <CaptionText>
            Because a closed modal is still in the page, every CubeModal that
            can be mounted at the same time needs its own test ID. A modal
            rendered once per table row, for example, should include the
            row&apos;s name:{' '}
            <InlineCode>networks-delete-modal-web-net</InlineCode>. Otherwise{' '}
            <InlineCode>getByTestId</InlineCode> matches several elements, and
            Playwright refuses to pick one. A modal renders in a portal at the
            end of the page, so narrowing the search to the table does not find
            it.
          </CaptionText>
          <CodeBlock language="typescript">{MODAL_STATE_SAMPLE}</CodeBlock>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Picking one of several items">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Options, menu items and suggestions share one test ID, such as{' '}
            <InlineCode>demo-dropdown-option</InlineCode>, and each carries a{' '}
            <InlineCode>data-key</InlineCode> that tells them apart. The key is
            the item&apos;s text unless the app passes its own, as{' '}
            <InlineCode>
              {'<CubeDropdown.Item data-key={network.id}>'}
            </InlineCode>
            . Pass one when two items can have the same text, or when the text
            is translated.
          </CaptionText>
          <CodeBlock language="typescript">{KEY_SAMPLE}</CodeBlock>
          <CodeBlock language="python">{KEY_SAMPLE_SELENIUM}</CodeBlock>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Selecting them in tests">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Playwright reads <InlineCode>data-testid</InlineCode> by default
            through <InlineCode>getByTestId</InlineCode>:
          </CaptionText>
          <CodeBlock language="typescript">{PLAYWRIGHT_SAMPLE}</CodeBlock>
          <CaptionText>Selenium selects them with a CSS selector:</CaptionText>
          <CodeBlock language="python">{SELENIUM_SAMPLE}</CodeBlock>
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="Live example">
        <div className="flex flex-col gap-y-4">
          <CaptionText>
            Open the browser&apos;s element inspector to see the test IDs these
            components render.
          </CaptionText>
          <LiveDemo />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
