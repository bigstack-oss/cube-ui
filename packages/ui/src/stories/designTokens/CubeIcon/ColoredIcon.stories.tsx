import type { Meta, StoryObj } from '@storybook/react-vite'
import { CubeIconFrame } from '../../../components/CubeIcon/CubeIconFrame'
import { IconGallery } from './IconGallery'
import { IconGalleryItem } from './IconGalleryItem'
import { coloredIcons } from './utils'

const meta: Meta<typeof IconGalleryItem> = {
  title: 'Design Tokens/Icons/Colored',
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      description:
        'Use className to apply size to the icons. For example, use `icon-xs`, `icon-sm`, `icon-md-sm`,  `icon-md`, `icon-lg`, `icon-xl` to apply the corresponding size to the icons.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
}

export default meta

type Story = StoryObj<React.ComponentProps<typeof CubeIconFrame>>

export const Gallery: Story = {
  render: (props) => {
    const { size, onClick } = props
    return (
      <IconGallery
        title="Colored Icon"
        desc="A collection of all available colored icons"
        size={size}
        icons={coloredIcons}
        onIconClick={onClick}
      />
    )
  },
}
