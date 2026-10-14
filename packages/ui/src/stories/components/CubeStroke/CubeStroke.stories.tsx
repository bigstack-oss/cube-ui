import type { ComponentType } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import type { BorderColorClass } from '@theme/tokens/cubeTheme'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'
import {
  cubeStrokeTypes,
  type CubeStrokeType,
} from '@components/CubeStroke/cubeStrokeTypes'
import { CubeStroke } from '@components/CubeStroke'
import { StrokeRow } from './StrokeRow'

const CubeStrokeDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

// `color` accepts any `BorderColorClass` token, but that type is a huge
// template-literal union that isn't practical to enumerate in a `select`
// control. These are representative tokens this component is actually used
// with (mirrors the old repo's Gallery).
const colorOptions = [
  'border-primary-500',
  'border-secondary-500',
] as const satisfies readonly BorderColorClass[]

type CubeStrokeStoryArgs = {
  type?: CubeStrokeType
  color?: BorderColorClass
  className?: string
}

const meta: Meta<CubeStrokeStoryArgs> = {
  title: 'Atoms/Stroke',
  component: CubeStroke as ComponentType<CubeStrokeStoryArgs>,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: 'A horizontal divider used to separate sections of content.',
      },
      page: CubeStrokeDocs,
    },
  },
  argTypes: {
    type: {
      description: 'The visual style of the divider.',
      table: { type: { summary: formatUnionType(cubeStrokeTypes) } },
      defaultValue: { summary: 'regular' },
      control: 'select',
      options: cubeStrokeTypes,
    },
    color: {
      description:
        'A border-color utility class token used to override the default divider color.',
      table: { type: { summary: 'BorderColorClass' } },
      control: 'select',
      options: colorOptions,
    },
    className: {
      description: 'Additional classes merged onto the divider.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<CubeStrokeStoryArgs>

export const Playground: Story = {
  tags: ['!dev'],
  decorators: [
    (Story) => (
      <PlaygroundLayout>
        <div className="w-[320px]">
          <Story />
        </div>
      </PlaygroundLayout>
    ),
  ],
  args: {
    type: 'regular',
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
      <StoryLayout title="Stroke">
        <StoryLayout.Section title="Types">
          <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-x-12 gap-y-6">
            {cubeStrokeTypes.map((type) => (
              <StrokeRow key={type} title={type}>
                <CubeStroke type={type} />
              </StrokeRow>
            ))}
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Colors">
          <div className="grid grid-cols-[180px_minmax(0,1fr)] items-center gap-x-12 gap-y-6">
            <StrokeRow title="Default">
              <CubeStroke />
            </StrokeRow>
            {colorOptions.map((color) => (
              <StrokeRow key={color} title={color}>
                <CubeStroke color={color} />
              </StrokeRow>
            ))}
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
