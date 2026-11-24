import { MonochromeInformationCircle } from '@icons'
import { CubeButton } from '@components/CubeButton'
import { CubeDropdown } from '@components/CubeDropdown'
import { CubeTooltip } from '@components/CubeTooltip'

export const PanelButton = () => (
  <CubeButton size="sm" type="primary">
    Call to Action
  </CubeButton>
)

const option = { label: 'Option', value: 'option' }

export const PanelDropdown = () => (
  <CubeDropdown type="radio" selectedItems={[option]}>
    <CubeDropdown.Trigger placeholder="Select a Country">
      {option.label}
    </CubeDropdown.Trigger>
    <CubeDropdown.Menu>
      <CubeDropdown.Item item={option} onClick={() => {}}>
        {option.label}
      </CubeDropdown.Item>
    </CubeDropdown.Menu>
  </CubeDropdown>
)

export const PanelIcon = () => (
  <CubeTooltip hoverContent={{ message: 'Message' }}>
    <MonochromeInformationCircle className="icon-lg cursor-pointer" />
  </CubeTooltip>
)
