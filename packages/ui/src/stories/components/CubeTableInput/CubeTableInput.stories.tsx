import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { fn } from 'storybook/test'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import {
  CubeTableInput,
  type CubeTableInputProps,
} from '@components/CubeTableInput/CubeTableInput'
import { StatefulTableInput, TableInputRow } from './TableInputRow'

const CubeTableInputDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// The native input attributes are passed through; only the ones worth
// demoing are listed as controls.
type CubeTableInputStoryArgs = Pick<
  CubeTableInputProps,
  | 'isLoading'
  | 'errorMessage'
  | 'hideErrorIcon'
  | 'placeholder'
  | 'disabled'
  | 'onChange'
  | 'className'
>

const meta: Meta<CubeTableInputStoryArgs> = {
  title: 'Molecules/Table Input',
  component: CubeTableInput as ComponentType<CubeTableInputStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A compact text input for use inside a table cell. The text area is at least 35px and at most 320px wide. Errors show as a tooltip on an icon beside the input, because a table cell has no room for a message below it. Accepts every native input attribute and forwards its ref to the input.',
      },
      page: CubeTableInputDocs,
    },
  },
  argTypes: {
    isLoading: {
      description: 'Renders a skeleton instead of the input.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    errorMessage: {
      description:
        'Shows the error border and an icon with this message as a tooltip. `true` shows the error state with the text "true".',
      table: { type: { summary: 'string | boolean' } },
      control: 'text',
    },
    hideErrorIcon: {
      description: 'Removes the icon slot beside the input.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    placeholder: {
      description: 'Native input placeholder.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    disabled: {
      description: 'Native input `disabled`.',
      table: { type: { summary: 'boolean' } },
      control: 'boolean',
    },
    onChange: {
      description: 'Native input change handler.',
      table: { type: { summary: 'ChangeEventHandler<HTMLInputElement>' } },
      control: { disable: true },
    },
    className: {
      description: 'Additional classes merged onto the input.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeTableInputStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[160px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    isLoading: false,
    errorMessage: '',
    hideErrorIcon: false,
    placeholder: 'Input',
    disabled: false,
    onChange: fn(),
  },
  render: (args) => <CubeTableInput aria-label="Table input" {...args} />,
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
      <StoryLayout title="Table Input">
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <TableInputRow title="Default">
              <StatefulTableInput aria-label="Default" placeholder="Input" />
            </TableInputRow>
            <TableInputRow title="Filled">
              <StatefulTableInput
                aria-label="Filled"
                placeholder="Input"
                initialValue="Text"
              />
            </TableInputRow>
            <TableInputRow title="Error">
              <StatefulTableInput
                aria-label="Error"
                placeholder="Input"
                initialValue="Text"
                errorMessage="Error messages"
              />
            </TableInputRow>
            <TableInputRow title="Disabled">
              <CubeTableInput
                aria-label="Disabled"
                placeholder="Input"
                defaultValue="Text"
                disabled
              />
            </TableInputRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <TableInputRow title="Truncated text">
            <StatefulTableInput
              aria-label="Truncated text"
              placeholder="Input"
              initialValue="Long Text"
            />
          </TableInputRow>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <TableInputRow title="Default">
            <CubeTableInput.Skeleton />
          </TableInputRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
