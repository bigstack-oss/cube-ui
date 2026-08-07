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
import { CubeInput } from '@components/CubeInput/CubeInput'
import { MonochromeSearch } from '@icons'
import type { SvgElement } from '@components/CubeIcon'
import { InputRow } from './InputRow'

const CubeInputDocs = () => {
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
type CubeInputStoryArgs = {
  label?: string
  placeholder?: string
  helpMessage?: string
  errorMessage?: string | boolean
  required?: boolean
  disabled?: boolean
  isLoading?: boolean
  trailingIcon?: SvgElement
  tooltip?: ReactNode
}

const meta: Meta<CubeInputStoryArgs> = {
  title: 'Molecules/Input',
  component: CubeInput as ComponentType<CubeInputStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      page: CubeInputDocs,
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
    trailingIcon: {
      description: 'An icon rendered at the trailing edge of the input.',
      table: { type: { summary: 'SvgElement' } },
      control: { disable: true },
    },
    tooltip: {
      description: 'A tooltip displayed when hovering over the input.',
      table: { type: { summary: 'ReactNode' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeInputStoryArgs>

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
    label: 'Email',
    placeholder: 'you@example.com',
    required: false,
    disabled: false,
    isLoading: false,
    trailingIcon: <MonochromeSearch />,
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
      <StoryLayout
        title="Input"
        desc="Inputs allow users to enter and edit text, numbers, and other data. The min width of text frame is 170px."
      >
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            <InputRow.Header />
            <InputRow title="Default" inputProps={{}} />
            <InputRow title="Required" inputProps={{ required: true }} />
            <InputRow title="Disabled" inputProps={{ disabled: true }} />
            <InputRow
              title="w/Trailing Icon"
              inputProps={{ trailingIcon: <MonochromeSearch /> }}
            />
            {/** TODO: Add tooltip */}
            {/* <InputRow title="w/Tooltip" inputProps={{}} /> */}
            <InputRow
              title="w/Help Message"
              inputProps={{ helpMessage: 'Help message' }}
            />
            <InputRow
              title="w/Error Message"
              inputProps={{ errorMessage: 'Error message' }}
            />
            <InputRow
              title="w/Default Text"
              inputProps={{ defaultValue: 'Input Text' }}
            />
            <InputRow
              title="Truncate Text"
              inputProps={{
                defaultValue:
                  'Display an ellipsis when a long message is entered in the input field.',
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
              <CubeInput isLoading />
              <CubeInput isLoading label="Label" />
              <CubeInput isLoading helpMessage="Help message" />
              <CubeInput isLoading label="Label" helpMessage="Help message" />
            </div>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
