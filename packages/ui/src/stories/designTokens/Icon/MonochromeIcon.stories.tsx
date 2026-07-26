import type { Meta, StoryObj } from '@storybook/react-vite'
import { CubeIconFrame } from '../../../components/CubeIcon/CubeIconFrame'
import { IconGallery } from './IconGallery'
import { IconGalleryItem } from './IconGalleryItem'
import { monochromeIcons } from './utils'

const meta = {
  title: 'Design Tokens/Icons',
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    className: {
      description:
        'Use className to apply color and size to the icons. For example, `text-functional-text` will apply the functional text color to the icons. As for size, use `icon-xs`, `icon-sm`, `icon-md-sm`,  `icon-md`, `icon-lg`, `icon-xl` to apply the corresponding size to the icons.',
      table: { type: { summary: 'string' } },
      control: { disable: true },
    },
  },
} satisfies Meta<typeof IconGalleryItem>

export default meta

type Story = StoryObj<React.ComponentProps<typeof CubeIconFrame>>

export const Monochrome: Story = {
  render: (props) => {
    const { size, className, onClick } = props
    return (
      <IconGallery
        title="Monochrome Icon"
        desc="A collection of all available monochrome icons"
        size={size}
        className={className}
        icons={monochromeIcons}
        onIconClick={onClick}
      />
    )
  },
}
