import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArgTypes, Description, Title } from '@storybook/addon-docs/blocks'
import { CubeIconFrame } from '../../components/CubeIcon/CubeIconFrame'
import { ColoredCeph } from '../../icons'
import { formatUnionType } from '../../internals/utils/formatType'
import { allCubeIconSizes } from '../../components/CubeIcon/cubeIconTypes'

const documentedProps = ['className', 'size', 'onClick', 'children'] as const

const CubeIconDocsPage = () => (
  <>
    <Title />
    <Description />
    <ArgTypes include={[...documentedProps]} sort="alpha" />
  </>
)

const meta: Meta<typeof CubeIconFrame> = {
  title: 'Design Tokens/Icon',
  component: CubeIconFrame,
  tags: ['autodocs'],
  parameters: {
    controls: { disable: true },
    docs: {
      page: CubeIconDocsPage,
      description: {
        component: 'A collection of Cube Icons.',
      },
    },
  },
  argTypes: {
    className: {
      description:
        'Only `bg-.*` and `text-.*` classes are allowed in storybook, but you can use any class in your project.',
      table: { type: { summary: 'string' } },
    },
    size: {
      description: 'The size of the icon.',
      table: { type: { summary: formatUnionType(allCubeIconSizes) } },
      defaultValue: { summary: 'md' },
    },
    onClick: {
      description: 'The click handler of the icon frame.',
      table: { type: { summary: '() => void' } },
    },
    children: {
      description: 'The children of the icon frame.',
      table: { type: { summary: 'SvgElement' } },
    },
  },
}

export default meta

type Story = StoryObj<typeof CubeIconFrame>

export const Gallery: Story = {
  args: {
    children: <ColoredCeph className="icon-xl" />,
  },
}
