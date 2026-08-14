import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeToggle } from '@components/CubeToggle/CubeToggle'
import { ToggleRow } from './ToggleRow'
import { CenteredCubeToggle } from './CenteredToggle'

const CubeToggleDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// Flattened args for Storybook: only the props relevant to demoing the
// component are exposed as controls.
type CubeToggleStoryArgs = {
  label?: string
  checked: boolean
  disabled?: boolean
}

const meta: Meta<CubeToggleStoryArgs> = {
  title: 'Atoms/Toggle',
  component: CubeToggle as ComponentType<CubeToggleStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Toggles let users switch a single option on or off immediately.',
      },
      page: CubeToggleDocs,
    },
  },
  argTypes: {
    label: {
      description: 'The label displayed next to the toggle.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    checked: {
      description:
        'Controlled on/off state. Always owned by the caller via onCheckedChange.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the toggle is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<CubeToggleStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <Story />
      </PlaygroundLayout>
    ),
  ],
  args: {
    label: 'Enable notifications',
    checked: false,
    disabled: false,
  },
  // Keep Storybook args as the source of truth so the Controls panel and the
  // toggle stay in sync in both directions.
  render: function Render(args) {
    const [, updateArgs] = useArgs()

    return (
      <CubeToggle
        {...args}
        onCheckedChange={(checked) => updateArgs({ checked })}
      />
    )
  },
}

export const Gallery: Story = {
  tags: ['!autodocs'],
  parameters: {
    actions: { disable: true },
    controls: { disable: true },
    interactions: { disable: true },
    options: {
      rightPanelWidth: 0,
      bottomPanelHeight: 0,
    },
  },
  render: () => {
    return (
      <StoryLayout title="Toggle">
        <StoryLayout.Section title="Variants">
          <ToggleRow title="Master">
            <CenteredCubeToggle showLabel initialChecked />
          </ToggleRow>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <ToggleRow.Header />
            <ToggleRow title="Default">
              <CenteredCubeToggle />
              <CenteredCubeToggle initialChecked />
              <CenteredCubeToggle showLabel />
              <CenteredCubeToggle showLabel initialChecked />
            </ToggleRow>
            <ToggleRow title="Disabled">
              <CenteredCubeToggle disabled />
              <CenteredCubeToggle disabled initialChecked />
              <CenteredCubeToggle disabled showLabel />
              <CenteredCubeToggle disabled showLabel initialChecked />
            </ToggleRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
