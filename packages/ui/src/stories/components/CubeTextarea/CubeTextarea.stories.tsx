import { useState, type ChangeEvent, type ComponentType } from 'react'
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
import { CubeTextarea } from '@components/CubeTextarea/CubeTextarea'
import { ControlledTextarea } from './ControlledTextarea'

const CubeTextareaDocs = () => {
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
// component are exposed as controls; native textarea attributes are omitted.
type CubeTextareaStoryArgs = {
  label: string
  placeholder?: string
  maxLength: number
  errorMessage?: string
  disabled?: boolean
  isLoading?: boolean
}

const meta: Meta<CubeTextareaStoryArgs> = {
  title: 'Molecules/Textarea',
  component: CubeTextarea as ComponentType<CubeTextareaStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Textareas let users enter and edit multi-line text, with a live character counter against a maximum length.',
      },
      page: CubeTextareaDocs,
    },
  },
  argTypes: {
    label: {
      description: 'The label displayed above the textarea.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    placeholder: {
      description: 'The placeholder text shown when the textarea is empty.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    maxLength: {
      description:
        'The maximum number of characters allowed, shown as a counter.',
      table: { type: { summary: 'number' } },
      control: 'number',
    },
    errorMessage: {
      description: 'An error message shown below the textarea.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    disabled: {
      description: 'Whether the textarea is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isLoading: {
      description: 'Whether the textarea renders its loading skeleton.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
  },
}

export default meta

type Story = StoryObj<CubeTextareaStoryArgs>

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
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    maxLength: 1000,
    errorMessage: '',
    disabled: false,
    isLoading: false,
  },
  // `CubeTextarea` is fully controlled (no internal value state), so the
  // playground keeps its own local state to demo typing.
  render: function Render(args) {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value)
    }

    return (
      <CubeTextarea
        id="cube-textarea-playground"
        {...args}
        value={value}
        onChange={handleChange}
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
  render: function Render() {
    return (
      <StoryLayout title="Textarea">
        <StoryLayout.Section title="Variants">
          <ControlledTextarea title="Master" textareaProps={{}} />
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <ControlledTextarea title="Default" textareaProps={{}} />
            <ControlledTextarea
              title="Disabled"
              textareaProps={{ disabled: true }}
            />
            <ControlledTextarea
              title="w/Error Message"
              textareaProps={{ errorMessage: 'Error message' }}
            />
            <ControlledTextarea
              title="w/Default Text"
              defaultValue="short"
              textareaProps={{}}
            />
            <ControlledTextarea
              title="Truncate Text"
              defaultValue="long"
              textareaProps={{}}
            />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="grid grid-cols-4 items-start gap-x-12">
            <SubHeading className="col-span-1">Default</SubHeading>
            <CubeTextarea.Skeleton />
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
