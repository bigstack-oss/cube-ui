import { useState, type ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import dayjs from 'dayjs'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import { CubeDatePicker } from '@components/CubeDatePicker/CubeDatePicker'
import type {
  CubeDatePickerDates,
  CubeDatePickerProps,
} from '@components/CubeDatePicker/cubeDatePickerTypes'
import { useCubeDatePickerDisplayDates } from '@components/CubeDatePicker/useCubeDatePickerDisplayDates'
import { DatePickerRow } from './DatePickerRow'

const CubeDatePickerDocs = () => (
  <>
    <Title />
    <Description />
    <Primary />
    <Controls />
  </>
)

type DatePickerExampleProps = Pick<
  CubeDatePickerProps,
  'disabled' | 'isLoading'
> & {
  defaultDates?: CubeDatePickerDates
}

const noDates: CubeDatePickerDates = { start: undefined, end: undefined }

const selectedDates: CubeDatePickerDates = {
  start: dayjs('2025-04-15'),
  end: dayjs('2025-05-31'),
}

// The usual setup: the applied dates in state, the display dates from
// `useCubeDatePickerDisplayDates`.
const DatePickerExample = (props: DatePickerExampleProps) => {
  const { defaultDates = noDates, disabled, isLoading } = props

  const [dates, setDates] = useState(defaultDates)

  const { displayDates, onChange, onCancel, onReset } =
    useCubeDatePickerDisplayDates({
      initialStartDate: dates.start,
      initialEndDate: dates.end,
    })

  return (
    <CubeDatePicker
      disabled={disabled}
      isLoading={isLoading}
      displayDates={displayDates}
      onChange={onChange}
      onCancel={onCancel}
      onApply={() => setDates(displayDates)}
      onReset={() => {
        onReset()
        setDates(noDates)
      }}
    />
  )
}

const meta: Meta<CubeDatePickerProps> = {
  title: 'Molecules/Date Picker',
  component: CubeDatePicker as ComponentType<CubeDatePickerProps>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'A button that opens a calendar for picking a date range. The first click sets the start, the second the end (an earlier day swaps them); Apply confirms both, Reset clears them, and a click outside cancels. Keep the dates with `useCubeDatePickerDisplayDates`. "Today" follows `CubeTimeZoneContext` (a UTC offset such as `"+08:00"`), or local time without it.',
      },
      page: CubeDatePickerDocs,
    },
  },
  argTypes: {
    disabled: {
      description: 'Disables the trigger.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    isLoading: {
      description: 'Shows a skeleton instead of the trigger.',
      table: { type: { summary: 'boolean' } },
      defaultValue: { summary: 'false' },
      control: 'boolean',
    },
    displayDates: {
      description:
        'The range shown in the trigger and the calendar; from `useCubeDatePickerDisplayDates`.',
      table: {
        type: {
          summary: 'CubeDatePickerDates',
          detail: '{ start: Dayjs | undefined; end: Dayjs | undefined }',
        },
      },
      control: { disable: true },
    },
    onChange: {
      description: 'Called with the clicked day.',
      table: { type: { summary: '(date: Dayjs) => void' } },
      control: { disable: true },
    },
    onCancel: {
      description:
        'Called on a click outside the trigger and calendar; the calendar closes.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    onApply: {
      description:
        'Called by Apply, only when both dates are set; the calendar closes.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
    onReset: {
      description: 'Called by Reset.',
      table: { type: { summary: '() => void' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeDatePickerProps>

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
    disabled: false,
    isLoading: false,
  },
  render: ({ disabled, isLoading }) => (
    <DatePickerExample
      disabled={disabled}
      isLoading={isLoading}
      defaultDates={selectedDates}
    />
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
  render: () => (
    <StoryLayout title="Date Picker">
      <StoryLayout.Section title="States">
        <div className="flex flex-col gap-y-8">
          <DatePickerRow title="Default">
            <DatePickerExample />
          </DatePickerRow>
          <DatePickerRow title="Selected">
            <DatePickerExample defaultDates={selectedDates} />
          </DatePickerRow>
          <DatePickerRow title="Disabled">
            <DatePickerExample disabled />
          </DatePickerRow>
          <DatePickerRow title="Disabled and selected">
            <DatePickerExample disabled defaultDates={selectedDates} />
          </DatePickerRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <DatePickerRow title="Default">
          <DatePickerExample isLoading />
        </DatePickerRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
