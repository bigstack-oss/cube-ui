import type { ComponentType, ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { SubHeading } from '@internals/components/SubHeading'
import { CubePasswordInput } from '@components/CubePasswordInput/CubePasswordInput'
import { PasswordInputRow } from './PasswordInputRow'

const CubePasswordInputDocs = () => {
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
type CubePasswordInputStoryArgs = {
  label?: string
  placeholder?: string
  helpMessage?: string
  errorMessage?: string | boolean
  required?: boolean
  disabled?: boolean
  isLoading?: boolean
  initialShowPassword?: boolean
  tooltip?: ReactNode
}

const meta: Meta<CubePasswordInputStoryArgs> = {
  title: 'Molecules/Password Input',
  component: CubePasswordInput as ComponentType<CubePasswordInputStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Password inputs allow users to enter sensitive text with a show/hide toggle. The min width of text frame is 170px.',
      },
      page: CubePasswordInputDocs,
    },
  },
  argTypes: {
    label: {
      description: 'The label displayed above the input.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    placeholder: {
      description: 'The placeholder text shown when the input is empty.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    helpMessage: {
      description:
        'A help message shown below the input when there is no error.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    errorMessage: {
      description:
        'An error message shown below the input, replacing the help message.',
      table: { type: { summary: 'string | boolean' } },
      control: 'text',
    },
    required: {
      description: 'Whether the input is required.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    disabled: {
      description: 'Whether the input is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isLoading: {
      description: 'Whether the input renders its loading skeleton.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    initialShowPassword: {
      description:
        'Whether the password is shown in plain text on first render.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    tooltip: {
      description: 'A tooltip displayed when hovering over the input.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubePasswordInputStoryArgs>

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
    label: 'Password',
    placeholder: 'Enter your password',
    required: false,
    disabled: false,
    isLoading: false,
    initialShowPassword: false,
  },
  // `initialShowPassword` only seeds state on mount. Remount when the control
  // changes so the playground reflects the new initial value immediately.
  render: (args) => (
    <CubePasswordInput key={String(args.initialShowPassword)} {...args} />
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
  render: () => {
    return (
      <StoryLayout title="Password Input">
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <PasswordInputRow.Header />
            <PasswordInputRow title="Default" inputProps={{}} />
            <PasswordInputRow
              title="Required"
              inputProps={{ required: true }}
            />
            <PasswordInputRow
              title="Disabled"
              inputProps={{ disabled: true }}
            />
            <PasswordInputRow
              title="Show Password"
              inputProps={{
                defaultValue: 'super-secret',
                initialShowPassword: true,
              }}
            />
            {/** TODO: Add tooltip */}
            {/* <PasswordInputRow title="w/Tooltip" inputProps={{ tooltip: 'Tooltip' }} /> */}
            <PasswordInputRow
              title="w/Help Message"
              inputProps={{ helpMessage: 'Help message' }}
            />
            <PasswordInputRow
              title="w/Error Message"
              inputProps={{ errorMessage: 'Error message' }}
            />
            <PasswordInputRow
              title="w/Default Password"
              inputProps={{ defaultValue: 'super-secret' }}
            />
            <PasswordInputRow
              title="w/Truncated Password"
              inputProps={{
                defaultValue: 'super-long-password-that-should-be-truncated',
              }}
            />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-5 items-center gap-x-12">
              <SubHeading>Regular</SubHeading>
              <SubHeading>w/Label</SubHeading>
              <SubHeading>w/Message</SubHeading>
              <SubHeading>w/Label & Message</SubHeading>
            </div>
            <div className="grid grid-cols-5 items-start gap-x-12">
              <CubePasswordInput isLoading />
              <CubePasswordInput isLoading label="Label" />
              <CubePasswordInput isLoading helpMessage="Help message" />
              <CubePasswordInput
                isLoading
                label="Label"
                helpMessage="Help message"
              />
            </div>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
