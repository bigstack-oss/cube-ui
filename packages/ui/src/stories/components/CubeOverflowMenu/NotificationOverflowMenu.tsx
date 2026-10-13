import {
  MonochromeCheckmarkCircleFill,
  MonochromeChevronRight,
  MonochromeWarningAltFilled,
} from '@icons'
import { CubeOverflowMenu } from '@components/CubeOverflowMenu/CubeOverflowMenu'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

// Clicking an item only closes the menu in the Gallery.
const onItemClick = () => {}

export const NotificationOverflowMenu = () => {
  return (
    <CubeOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CubeOverflowMenu.Item
        type="custom-leading-element"
        title="Option Title 1"
        element={
          <MonochromeWarningAltFilled className="icon-md text-status-warning" />
        }
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="custom-leading-element"
        title="Option Title 2"
        element={
          <MonochromeCheckmarkCircleFill className="icon-md text-cosmos-primary" />
        }
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Item
        type="custom-leading-element"
        title="Option Title 3"
        subText="Subtext"
        element={
          <MonochromeCheckmarkCircleFill className="icon-md text-functional-disable-text" />
        }
        disabled={true}
        onClick={onItemClick}
      />
      <CubeOverflowMenu.Divider />
      <CubeOverflowMenu.Item
        type="trailing-icon"
        title="View All"
        TrailingIcon={MonochromeChevronRight}
        onClick={onItemClick}
      />
    </CubeOverflowMenu>
  )
}
