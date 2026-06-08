import type { ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArgTypes, Description, Title } from '@storybook/addon-docs/blocks'
import { CubeLoadingSpinner } from '../../components/CubeLoadingSpinner'
import type { PropsWithClassName } from '../../utils/react-types'
import { formatUnionType } from '../../internals/utils/formatType'
import { allCubeLoadingSpinnerVariants } from '../../components/CubeLoadingSpinner/cubeLoadingSpinnerTypes'
import { SpinnerRow } from './SpinnerRow'

const documentedProps = ['variant', 'className'] as const

const CubeLoadingSpinnerDocsPage = () => (
  <>
    <Title />
    <Description />
    <ArgTypes include={[...documentedProps]} sort="alpha" />
  </>
)

const meta: Meta<typeof CubeLoadingSpinner> = {
  title: 'Atoms/Loading Spinner',
  component: CubeLoadingSpinner,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      page: CubeLoadingSpinnerDocsPage,
      description: {
        component:
          'Loading spinners are used to indicate that a process is in progress.',
      },
    },
  },
  argTypes: {
    variant: {
      description: 'The variant of the loading spinner.',
      table: {
        type: { summary: formatUnionType(allCubeLoadingSpinnerVariants) },
      },
    },
    className: {
      table: { type: { summary: 'string' } },
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
      <>
        <div className="gap-y-8 flex flex-col">
          <SpinnerRow title="45˚">
            <CubeLoadingSpinner {...props} variant="dot45" />
          </SpinnerRow>
          <SpinnerRow title="120˚">
            <CubeLoadingSpinner {...props} variant="dot120" />
          </SpinnerRow>
          <SpinnerRow title="Default">
            <CubeLoadingSpinner {...props} variant="cube" />
          </SpinnerRow>
        </div>
      </>
    )
  },
}
