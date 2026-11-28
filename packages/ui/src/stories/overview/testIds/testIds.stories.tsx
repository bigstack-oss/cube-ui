import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { CaptionText } from '@internals/components/CaptionText'
import { CubeButton } from '@components/CubeButton'
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
        <PartsTable />
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
