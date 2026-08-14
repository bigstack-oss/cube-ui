import { type ComponentType, type RefObject } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeRadioButton } from '@components/CubeRadioButton/CubeRadioButton'
import { RadioButtonRow } from './RadioButtonRow'
import { RadioButtonStateRow } from './RadioButtonStateRow'
import { RadioButtonLayoutRow } from './RadioButtonLayoutRow'
import { radioButtonText } from './utils'

const CubeRadioButtonDocs = () => {
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
// component are exposed as controls; native input attributes are omitted.
type CubeRadioButtonStoryArgs = {
  label: string
  disabled?: boolean
  isLoading?: boolean
  defaultChecked?: boolean
  ref?: RefObject<HTMLInputElement | null>
}

const meta: Meta<CubeRadioButtonStoryArgs> = {
  title: 'Molecules/Radio Button',
  component: CubeRadioButton as ComponentType<CubeRadioButtonStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Radio buttons let users select exactly one option from a set.',
      },
      page: CubeRadioButtonDocs,
    },
  },
  argTypes: {
    label: {
      description: 'The label displayed next to the radio button.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    disabled: {
      description: 'Whether the radio button is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isLoading: {
      description: 'Whether the radio button renders its loading skeleton.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    defaultChecked: {
      description: 'The initial checked state (uncontrolled).',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    ref: {
      description: 'The ref to the radio button element.',
      table: { type: { summary: 'RefObject<HTMLInputElement>' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeRadioButtonStoryArgs>

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
    label: 'Option A',
    disabled: false,
    isLoading: false,
    defaultChecked: false,
  },
  // `defaultChecked` only seeds state on mount. Remount when the control
  // changes so the playground reflects the new initial value immediately.
  render: (args) => (
    <CubeRadioButton key={String(args.defaultChecked)} {...args} />
  ),
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
  render: function Render() {
    return (
      <StoryLayout title="Radio Button">
        <StoryLayout.Section title="Variants">
          <RadioButtonRow title="Master">
            <CubeRadioButton label={radioButtonText} />
          </RadioButtonRow>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <RadioButtonStateRow.Header />
            <RadioButtonStateRow title="Default" />
            <RadioButtonStateRow
              title="Disabled"
              radioButtonProps={{ disabled: true }}
            />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <RadioButtonLayoutRow title="Vertical" direction="vertical" />
            <hr />
            <RadioButtonLayoutRow title="Wrap" direction="wrap" />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <RadioButtonRow title="Default">
            <CubeRadioButton label={radioButtonText} isLoading />
          </RadioButtonRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
