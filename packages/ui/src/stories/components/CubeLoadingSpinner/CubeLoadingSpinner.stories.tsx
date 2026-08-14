import { type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Controls,
  Description,
  Primary,
  Title,
} from '@storybook/addon-docs/blocks'
import type { PropsWithClassName } from '@shared-types/react-types'
import { formatUnionType } from '@internals/utils/formatType'
import { StoryLayout } from '@internals/components/StoryLayout/StoryLayout'
import { cubeLoadingSpinnerVariants } from '@components/CubeLoadingSpinner/cubeLoadingSpinnerTypes'
import { CubeLoadingSpinner } from '@components/CubeLoadingSpinner'
import { SpinnerRow } from './SpinnerRow'
import { PlaygroundLayout } from '@internals/components/StoryLayout/PlaygroundLayout'

const CubeLoadingSpinnerDocs = () => {
  return (
    <>
      <Title />
      <Description />
      <Primary />
      <Controls />
    </>
  )
}

const meta: Meta<typeof CubeLoadingSpinner> = {
  title: 'Atoms/Loading Spinner',
  component: CubeLoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Loading spinners indicate that content or a process is in progress.',
      },
      page: CubeLoadingSpinnerDocs,
    },
  },
  argTypes: {
    variant: {
      description: 'The variant of the loading spinner.',
      table: {
        type: { summary: formatUnionType(cubeLoadingSpinnerVariants) },
      },
      control: 'select',
      options: cubeLoadingSpinnerVariants,
    },
    className: {
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type LoadingSpinnerStoryArgs = ComponentProps<typeof CubeLoadingSpinner> &
  PropsWithClassName

type Story = StoryObj<LoadingSpinnerStoryArgs>

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
    variant: 'dot45',
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
  render: (props) => {
    return (
      <StoryLayout title="Loading Spinner">
        <StoryLayout.Section title="Variants">
          <div className="flex flex-col gap-y-10">
            <SpinnerRow title="Dot 45˚">
              <CubeLoadingSpinner {...props} variant="dot45" />
            </SpinnerRow>
            <SpinnerRow title="Dot 120˚">
              <CubeLoadingSpinner {...props} variant="dot120" />
            </SpinnerRow>
            <SpinnerRow title="Cube">
              <CubeLoadingSpinner {...props} variant="cube" />
            </SpinnerRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
