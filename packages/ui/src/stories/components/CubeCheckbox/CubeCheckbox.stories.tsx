import { type ComponentType, type RefObject } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { SubHeading } from '@internals/components/SubHeading'
import { CaptionText } from '@internals/components/CaptionText'
import { CubeCheckbox } from '@components/CubeCheckbox/CubeCheckbox'
import {
  cubeCheckboxColors,
  cubeCheckboxLabelSizes,
  type CubeCheckboxColor,
  type CubeCheckboxLabelSize,
} from '@components/CubeCheckbox/cubeCheckboxTypes'
import { CheckboxRow } from './CheckboxRow'
import { CheckboxStateRow } from './CheckboxStateRow'
import { CheckboxLayoutRow } from './CheckboxLayoutRow'
import { checkboxText } from './utils'
import { CheckboxLabelSizeRow } from './CheckboxLabelSizeRow'

const CubeCheckboxDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const defaultCheckedOptions = ['unchecked', 'checked', 'indeterminate'] as const

// The real `defaultChecked` prop is `boolean | null`, which Storybook controls
// can't represent. Here it's a select of labels instead; the Playground
// `render` below maps the selected label to the actual initial value.
type DefaultCheckedOption = (typeof defaultCheckedOptions)[number]

// Flattened args for Storybook: only the props relevant to demoing the
// component are exposed as controls; native input attributes are omitted.
type CubeCheckboxStoryArgs = {
  containerClassName?: string
  color?: CubeCheckboxColor
  label?: string
  labelSize?: CubeCheckboxLabelSize
  labelClassName?: string
  checked?: boolean
  defaultChecked?: DefaultCheckedOption
  disabled?: boolean
  isLoading?: boolean
  ref?: RefObject<HTMLInputElement | null>
}

const meta: Meta<CubeCheckboxStoryArgs> = {
  title: 'Molecules/Checkbox',
  component: CubeCheckbox as ComponentType<CubeCheckboxStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Checkboxes let users select one or more items from a set, or toggle a single option on or off.',
      },
      page: CubeCheckboxDocs,
    },
  },
  argTypes: {
    containerClassName: {
      description:
        'The class name applied to the container element, which is a label element.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    color: {
      description: 'The color theme of the checkbox.',
      table: { type: { summary: formatUnionType(cubeCheckboxColors) } },
      defaultValue: { summary: 'primary' },
      control: 'select',
      options: cubeCheckboxColors,
    },
    label: {
      description: 'The label text displayed next to the checkbox.',
      table: { type: { summary: 'string' } },
      control: 'text',
    },
    labelSize: {
      description: 'The size of the label text.',
      table: { type: { summary: formatUnionType(cubeCheckboxLabelSizes) } },
      defaultValue: { summary: 'md' },
      control: 'select',
      options: cubeCheckboxLabelSizes,
    },
    labelClassName: {
      description: 'The class name applied to the label element.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
    checked: {
      description: 'The checked state of the checkbox.',
      table: { type: { summary: 'boolean' } },
      control: { disable: true },
    },
    defaultChecked: {
      description:
        'The initial checked state. Use "indeterminate" for a tri-state checkbox.',
      table: { type: { summary: 'boolean | null' } },
      defaultValue: { summary: 'unchecked' },
      control: 'select',
      options: defaultCheckedOptions,
    },
    disabled: {
      description: 'Whether the checkbox is disabled.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isLoading: {
      description: 'Whether the checkbox renders its loading skeleton.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    ref: {
      description: 'The ref to the checkbox element.',
      table: { type: { summary: 'RefObject<HTMLInputElement>' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeCheckboxStoryArgs>

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
    label: 'Select all',
    color: 'primary',
    labelSize: 'md',
    disabled: false,
    isLoading: false,
    defaultChecked: 'unchecked',
  },
  render: ({ defaultChecked, ...args }) => {
    const initialChecked = (() => {
      if (defaultChecked === 'checked') return true
      if (defaultChecked === 'indeterminate') return null
      return false
    })()

    return (
      <CubeCheckbox
        key={defaultChecked}
        {...args}
        defaultChecked={initialChecked}
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
      <StoryLayout title="Checkbox">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-6">
            <CheckboxRow title="">
              <SubHeading>Default</SubHeading>
              <SubHeading>Dark</SubHeading>
            </CheckboxRow>
            <CheckboxRow title="Primary">
              <CubeCheckbox
                label={checkboxText}
                color="primary"
                defaultChecked
              />
              <CubeCheckbox
                label={checkboxText}
                color="primary-dark"
                defaultChecked
              />
            </CheckboxRow>
            <CheckboxRow title="Secondary">
              <CubeCheckbox
                label={checkboxText}
                color="secondary"
                defaultChecked
              />
              <CubeCheckbox
                label={checkboxText}
                color="secondary-dark"
                defaultChecked
              />
            </CheckboxRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Label Sizes">
          <div className="flex flex-col gap-y-6">
            <CheckboxLabelSizeRow labelSize="md" />
            <CheckboxLabelSizeRow labelSize="sm" />
            <CheckboxLabelSizeRow labelSize="xs" />
            <CaptionText>
              The `sm` and `xs` sizes are intended for compact contexts, like a
              dropdown menu.
            </CaptionText>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="States">
          <div className="flex flex-col gap-y-6">
            <CheckboxStateRow.Header />
            <CheckboxStateRow
              title="Primary"
              checkboxProps={{ color: 'primary' }}
            />
            <CheckboxStateRow
              title="Primary (Disabled)"
              checkboxProps={{ color: 'primary', disabled: true }}
            />
            <CheckboxStateRow
              title="Primary Dark"
              checkboxProps={{ color: 'primary-dark' }}
            />
            <CheckboxStateRow
              title="Primary Dark (Disabled)"
              checkboxProps={{ color: 'primary-dark', disabled: true }}
            />
            <CheckboxStateRow
              title="Secondary"
              checkboxProps={{ color: 'secondary' }}
            />
            <CheckboxStateRow
              title="Secondary (Disabled)"
              checkboxProps={{ color: 'secondary', disabled: true }}
            />
            <CheckboxStateRow
              title="Secondary Dark"
              checkboxProps={{ color: 'secondary-dark' }}
            />
            <CheckboxStateRow
              title="Secondary Dark (Disabled)"
              checkboxProps={{ color: 'secondary-dark', disabled: true }}
            />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layouts">
          <div className="flex flex-col gap-y-6">
            <CheckboxLayoutRow title="Vertical" direction="vertical" />
            <hr />
            <CheckboxLayoutRow title="Wrap" direction="wrap" />
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <CheckboxRow title="Default">
            <CubeCheckbox.Skeleton />
          </CheckboxRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
