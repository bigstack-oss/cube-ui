import { type ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { PropsWithClassName } from '../../../utils/react-types'
import { formatUnionType } from '../../../internals/utils/formatType'
import { StoryLayout } from '../../../internals/components/StoryLayout/StoryLayout'
import { cubeLoadingSpinnerVariants } from '../../../components/CubeLoadingSpinner/cubeLoadingSpinnerTypes'
import { CubeLoadingSpinner } from '../../../components/CubeLoadingSpinner'
import { SpinnerRow } from './SpinnerRow'

const meta: Meta<typeof CubeLoadingSpinner> = {
  title: 'Atoms/Loading Spinner',
  component: CubeLoadingSpinner,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    variant: {
      description: 'The variant of the loading spinner.',
      table: {
        type: { summary: formatUnionType(cubeLoadingSpinnerVariants) },
      },
      control: { disable: true },
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

export const Gallery: Story = {
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
